import { NextResponse } from "next/server";
import { z } from "zod";
import admin from "firebase-admin";
import { adminDb } from "@/firebase/admin.firebase";
import crypto from "crypto";
import { SendEmailOTP } from "@/logic/email.otp";
import { sendSMSOTP } from "@/logic/sms.otp";

// 1. Validation Schema
const resendSchema = z.object({
    identity: z.string().min(1, "Identity is required"),
    channel: z.enum(["phone", "email"], {
        error: () => ({ message: "Channel must be 'phone' or 'email'" }),
    }),
    deviceId: z.string().min(1, "Device ID required"),
    appVersion: z.string(),
});

// 2. Security Configuration
const CONFIG = {
    OTP_EXPIRY_MINUTES: 2,
    MAX_FAILED_ATTEMPTS: 5,
    DEVICE_LOCK_DURATION_MS: 60 * 60 * 1000, // 1 hour
    BACKOFF_TIERS: [0, 60, 120, 300, 86400],
};

// 3. Secure OTP Generation
function generateOTP(): string {
    return crypto.randomInt(1000, 10000).toString();
}

// 4. Rate Limit Check
const checkResendLimits = async (identity: string, channel: string, deviceId: string) => {
    const docId = `${channel}:${identity}`;
    const limitsRef = adminDb.collection("otp_resend_limits").doc(docId);
    const limitsDoc = await limitsRef.get();
    const now = new Date();

    // Check device lock first
    const deviceLockDoc = await adminDb.collection("device_locks").doc(deviceId).get();
    if (deviceLockDoc.exists) {
        const lockData = deviceLockDoc.data();
        if (lockData?.failedAttempts >= CONFIG.MAX_FAILED_ATTEMPTS) {
            const lockTime = lockData?.lastFailedAt?.toDate();
            if (lockTime && Date.now() - lockTime.getTime() < CONFIG.DEVICE_LOCK_DURATION_MS) {
                const unlockTime = Math.ceil((lockTime.getTime() + CONFIG.DEVICE_LOCK_DURATION_MS - Date.now()) / 1000);
                return {
                    allowed: false,
                    reason: `Device locked due to failed attempts. Try again in ${unlockTime}s`,
                    retryAfter: unlockTime,
                    code: "DEVICE_LOCKED"
                };
            }
        }
    }

    // Check resend cooldown
    if (!limitsDoc.exists) return { allowed: true, currentCount: 0 };

    const data = limitsDoc.data();
    if (!data) return { allowed: true, currentCount: 0 };

    const currentCount = data.resendCount || 0;
    const lastResend = data.lastResendAt?.toDate();

    if (lastResend && currentCount >= 1) {
        // Use (currentCount - 1) to map: 1→index0, 2→index1, etc.
        const tierIndex = Math.min(currentCount - 1, CONFIG.BACKOFF_TIERS.length - 1);
        const requiredCooldownMs = CONFIG.BACKOFF_TIERS[tierIndex] * 1000;
        const timeSinceLast = now.getTime() - lastResend.getTime();

        if (timeSinceLast < requiredCooldownMs) {
            const remaining = Math.ceil((requiredCooldownMs - timeSinceLast) / 1000);
            return {
                allowed: false,
                reason: `Please wait ${remaining} seconds before requesting another OTP`,
                retryAfter: remaining,
                code: "RATE_LIMITED"
            };
        }
    }

    return { allowed: true, currentCount };
};

// 5. Atomic Update Function
const updateResendState = async (identity: string, channel: string, newOtpHash: string, expiresAt: Date, deviceId?: string, appVersion?: string) => {
    const docId = `${channel}:${identity}`;
    const otpRef = adminDb.collection("otps").doc(docId);
    const limitsRef = adminDb.collection("otp_resend_limits").doc(docId);
    const now = admin.firestore.FieldValue.serverTimestamp();
    const batch = adminDb.batch();

    // Update OTP record - FULL REPLACE to ensure previous OTP is invalidated
    batch.set(otpRef, {
        identity,
        channel,
        otpHash: newOtpHash,
        deviceId: deviceId || null,
        appVersion: appVersion || null,
        createdAt: now,
        expiresAt,
        isUsed: false,
        attemptCount: 0, // Critical: reset attempts for new OTP
        resentAt: now,
        resendCount: admin.firestore.FieldValue.increment(1),
    }, { merge: false }); // merge: false ensures clean slate

    // Update resend tracking
    batch.set(limitsRef, {
        lastResendAt: now,
        resendCount: admin.firestore.FieldValue.increment(1),
        updatedAt: now,
    }, { merge: true });

    await batch.commit();

    // Fetch updated count for response
    const updatedLimits = await limitsRef.get();
    return updatedLimits.data()?.resendCount || 1;
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validationResult = resendSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid input",
                    details: validationResult.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const { identity, channel, deviceId, appVersion } = validationResult.data;

        // Rate limit check
        const rateCheck = await checkResendLimits(identity, channel, deviceId);
        if (!rateCheck.allowed) {
            return NextResponse.json(
                {
                    success: false,
                    error: rateCheck.reason,
                    code: rateCheck.code,
                    ...(rateCheck.retryAfter && { retryAfter: rateCheck.retryAfter }),
                },
                { status: 429 }
            );
        }

        // Generate & hash new OTP
        const otp = generateOTP();
        const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
        const expiresAt = new Date(Date.now() + CONFIG.OTP_EXPIRY_MINUTES * 60 * 1000);

        // Atomic update: invalidates previous OTP + tracks resend
        const actualResendCount = await updateResendState(
            identity, channel, otpHash, expiresAt, deviceId, appVersion
        );

        // Send OTP (mocked - integrate your provider)
        if (channel === 'phone') {
            try {
                const result = await sendSMSOTP(identity, otp);

                // Safely extract the 200 code from the meta tag, or default to 200
                const httpStatus = result?.meta?.http_code || 200;

                return Response.json(
                    {
                        success: true,
                        message: "OTP sent successfully",
                        data: result
                    },
                    { status: httpStatus }
                );

            } catch (error) {
                // This catches numbers that failed validation OR API errors
                return Response.json(
                    {
                        success: false,
                        message: error instanceof Error ? error.message : "Failed to send OTP verification code."
                    },
                    { status: 400 } // Bad Request
                );
            }
        }
        
        else if (channel === 'email') {
            const result = await SendEmailOTP(identity, otp);
            
            return Response.json(result, {
                status: result.status,
            });
        }

        // Audit log
        await adminDb.collection("otp_logs").add({
            identity,
            channel,
            deviceId: deviceId || null,
            appVersion: appVersion || null,
            action: "otp_resent",
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            ipAddress: request.headers.get("x-forwarded-for") || null,
            userAgent: request.headers.get("user-agent") || null,
        });

        return NextResponse.json(
            {
                success: true,
                message: `New OTP sent to your ${channel}`,
                expiresIn: CONFIG.OTP_EXPIRY_MINUTES * 60,
                resendCount: actualResendCount,
                nextResendAfter: CONFIG.BACKOFF_TIERS[Math.min(actualResendCount - 1, CONFIG.BACKOFF_TIERS.length - 1)],
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("❌ OTP resend error:", error instanceof Error ? error.message : String(error));
        return NextResponse.json(
            {
                success: false,
                error: "Failed to resend OTP. Please try again later.",
                code: "INTERNAL_ERROR"
            },
            { status: 500 }
        );
    }
}