import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { adminDb } from "@/firebase/admin.firebase";
import admin from "firebase-admin";
import { SendEmailOTP } from "@/logic/email.otp";
import { sendSMSOTP } from "@/logic/sms.otp";
import { redis } from "@/configs/redis.config";

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
    OTP_EXPIRY_SECONDS: 120, // 2 minutes
    MAX_FAILED_ATTEMPTS: 5,
    DEVICE_LOCK_DURATION_SECONDS: 3600, // 1 hour
    BACKOFF_TIERS: [0, 60, 120, 300, 86400],
};

// 3. Secure OTP Generation
function generateOTP(): string {
    return crypto.randomInt(1000, 10000).toString();
}

export async function POST(request: Request) {
    const start = Date.now();
    console.log("⏱️ 1. Request received: 0ms");

    try {
        const body = await request.json();
        console.log(`⏱️ 2. JSON parsed: ${Date.now() - start}ms`);

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
        console.log(`⏱️ 3. Validation done: ${Date.now() - start}ms`);

        const { identity, channel, deviceId, appVersion } = validationResult.data;

        // --- REDIS STEP 4: CHECK DEVICE LOCK ---
        const lockKey = `device_locks:${deviceId}`;
        const failedAttemptsStr: string | null = await redis.get(lockKey);

        if (failedAttemptsStr && parseInt(failedAttemptsStr, 10) >= CONFIG.MAX_FAILED_ATTEMPTS) {
            const ttl = await redis.ttl(lockKey); // Find remaining lock seconds natively
            return NextResponse.json(
                {
                    success: false,
                    error: `Device locked due to failed attempts. Try again in ${ttl}s`,
                    retryAfter: ttl,
                    code: "DEVICE_LOCKED"
                },
                { status: 429 }
            );
        }
        console.log(`⏱️ 4. Device lock checked: ${Date.now() - start}ms`);

        // --- REDIS STEP 5: CHECK COOLDOWN LIMITS ---
        const limitsKey = `otp_resend_limits:${channel}:${identity}`;
        const limitsData: string | null = await redis.get(limitsKey);

        let resendCount = 0;
        let lastResendAt = 0;

        if (limitsData) {
            const parsedLimits = JSON.parse(limitsData);
            resendCount = parsedLimits.resendCount || 0;
            lastResendAt = parsedLimits.lastResendAt || 0;

            if (resendCount >= 1) {
                const tierIndex = Math.min(resendCount - 1, CONFIG.BACKOFF_TIERS.length - 1);
                const requiredCooldownMs = CONFIG.BACKOFF_TIERS[tierIndex] * 1000;
                const timeSinceLast = Date.now() - lastResendAt;

                if (timeSinceLast < requiredCooldownMs) {
                    const remaining = Math.ceil((requiredCooldownMs - timeSinceLast) / 1000);
                    return NextResponse.json(
                        {
                            success: false,
                            error: `Please wait ${remaining} seconds before requesting another OTP`,
                            retryAfter: remaining,
                            code: "RATE_LIMITED"
                        },
                        { status: 429 }
                    );
                }
            }
        }
        console.log(`⏱️ 5. Resend limits evaluated: ${Date.now() - start}ms`);

        // --- GENERATE NEW DATA ---
        const otp = generateOTP();
        const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
        const nextCount = resendCount + 1;

        // --- REDIS STEP 6: ATOMIC WRITE ---
        const otpKey = `otps:${channel}:${identity}`;
        const otpPayload = {
            identity,
            channel,
            otpHash,
            deviceId,
            appVersion,
            createdAt: new Date().toISOString(),
            attemptCount: 0, // Reset verification attempts
        };

        const nextLimitsPayload = {
            lastResendAt: Date.now(),
            resendCount: nextCount
        };

        // Execute fast pipelining in Redis to execute changes together
        // Max TTL for tracking corresponds to highest backoff tier (e.g. 1 day)
        const maxTrackingTTL = CONFIG.BACKOFF_TIERS[CONFIG.BACKOFF_TIERS.length - 1];

        await redis.pipeline()
            .set(otpKey, JSON.stringify(otpPayload), { ex: CONFIG.OTP_EXPIRY_SECONDS })
            .set(limitsKey, JSON.stringify(nextLimitsPayload), { ex: maxTrackingTTL })
            .exec();

        console.log(`⏱️ 6. Redis persistence completed: ${Date.now() - start}ms`);

        // Capture headers safely before jumping out of process scope
        const ipAddress = request.headers.get("x-forwarded-for") || null;
        const userAgent = request.headers.get("user-agent") || null;

        // --- ASYNC STEP 7: NON-BLOCKING DISPATCHES ---
        // Offload execution to a background pipeline so we return a response instantly.
        (async () => {
            // A. Dispatch Notification Payload
            if (channel === 'phone') {
                try {
                    console.log(`🚀 [Background] Triggering SMS to ${identity}`);
                    await sendSMSOTP(identity, otp);
                } catch (smsError) {
                    console.error("❌ [Background] Async SMS Delivery Error:", smsError);
                }
            } else if (channel === 'email') {
                try {
                    console.log(`🚀 [Background] Triggering Email to ${identity}`);
                    await SendEmailOTP(identity, otp);
                } catch (emailError) {
                    console.error("❌ [Background] Async Email Delivery Error:", emailError);
                }
            }

            // B. Push Security Event Log out to Firestore long-term bucket
            try {
                await adminDb.collection("otp_logs").add({
                    identity,
                    channel,
                    deviceId,
                    appVersion,
                    action: "otp_resent",
                    timestamp: admin.firestore.FieldValue.serverTimestamp(),
                    ipAddress,
                    userAgent,
                });
                console.log("💾 [Background] Firestore long-term audit trail updated.");
            } catch (fsError) {
                console.error("❌ [Background] Firestore long-term logging failure:", fsError);
            }
        })();

        // --- STEP 8: RETURN RESPONSE ---
        const nextCooldownSec = CONFIG.BACKOFF_TIERS[Math.min(nextCount - 1, CONFIG.BACKOFF_TIERS.length - 1)];

        console.log(`🏁 7. Returning response instantly to client! Total elapsed execution time: ${Date.now() - start}ms`);
        return NextResponse.json(
            {
                success: true,
                message: `New OTP sent to your ${channel}`,
                expiresIn: CONFIG.OTP_EXPIRY_SECONDS,
                resendCount: nextCount,
                nextResendAfter: nextCooldownSec,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("❌ OTP resend top-level execution error:", error instanceof Error ? error.message : String(error));
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