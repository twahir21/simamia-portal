import { NextResponse } from "next/server";
import { adminDb } from "@/firebase/admin.firebase";
import z from "zod";
import crypto from "crypto";

// ============================================================================
// Types
// ============================================================================

interface ActivationData {
    id: string; // deviceId
    type: "account" | "guest";
    createdAt: number;
    expiresAt: number;
    gracePeriodEnd: number;
    fingerprint: string;
    v: number; // Token version for revocation
}

// ============================================================================
// Config
// ============================================================================

const TOKEN_VERSION = 1; // Increment this to invalidate all existing tokens

const PACKAGES = {
    guest: {
        duration: 7 * 24 * 60 * 60 * 1000, // 7 days
        grace: 3 * 24 * 60 * 60 * 1000,        // 3 days offline buffer
    },
    account: {
        duration: 14 * 24 * 60 * 60 * 1000, // 14 days
        grace: 7 * 24 * 60 * 60 * 1000,         // 7 days offline buffer
    },
};

// ============================================================================
// Helpers
// ============================================================================

function encode(data: string): string {
    return Buffer.from(data, "utf8").toString("base64url");
}

function createSignature(payload: string, secret: string): string {
    return crypto
        .createHmac("sha256", secret)
        .update(payload)
        .digest("hex");
}

function generateSignedPayload(data: ActivationData, secret: string): string {
    const encoded = encode(JSON.stringify(data));
    const signature = createSignature(encoded, secret);
    return `${encoded}.${signature}`;
}

function createFingerprint(deviceId: string, platform: string): string {
    const seed = `${deviceId}:${platform}`;
    return crypto.createHash("sha256").update(seed).digest("hex");
}

// ============================================================================
// API Route
// ============================================================================

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Validation
        const schema = z.object({
            deviceId: z.string().min(4),
            identity: z.string().optional(),
            channel: z.enum(["phone", "email"]).optional(),
            appVersion: z.string(),
            platform: z.enum(["ios", "android", "windows", "macos", "web"]),
            isGuest: z.boolean() // Explicit flag from client
        });

        const validation = schema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ success: false, error: validation.error.message }, { status: 400 });
        }

        const { deviceId, identity, channel, appVersion, platform, isGuest } = validation.data;
        const now = Date.now();

        // 2. Determine Type based on explicit isGuest flag
        // Guest mode: no OTP required. Account mode: requires OTP verification.
        const type: "guest" | "account" = isGuest ? "guest" : "account";

        // Account activation requires OTP verification
        if (type === "account") {
            // Validate required fields for account type
            if (!identity || !channel) {
                return NextResponse.json({
                    success: false,
                    error: "Identity and channel are required for account activation"
                }, { status: 400 });
            }

            const docId = `${channel}:${identity}`;
            const otpRef = adminDb.collection("otps").doc(docId);
            const doc = await otpRef.get();

            if (!doc.exists) {
                return NextResponse.json(
                    { success: false, verified: false, message: "No verification record found." },
                    { status: 200 }
                );
            }

            const data = doc.data();

            // Check if the OTP document flags show a successful completion
            if (data?.isUsed && data?.verifiedAt) {
                const verifiedAt = data.verifiedAt.toDate();

                // Optional: Add expiration check for verification (e.g., must be verified within last 24h)
                const verificationExpiry = 24 * 60 * 60 * 1000;
                if (now - verifiedAt.getTime() > verificationExpiry) {
                    return NextResponse.json({
                        success: false,
                        error: "Verification expired. Please request a new OTP."
                    }, { status: 403 });
                }

                // Optionally delete the OTP record after successful use (one-time token)
                await otpRef.delete();
            } else {
                return NextResponse.json({
                    success: false,
                    verified: false,
                    message: "OTP not yet verified. Please complete verification first."
                }, { status: 403 });
            }
        }

        // 3. Check Existing Registration
        const regRef = adminDb.collection("registrations").doc(deviceId);
        const existingSnap = await regRef.get();
        const existingData = existingSnap.exists ? existingSnap.data() : null;

        // SECURITY: Prevent Guest -> Guest reset abuse
        if (existingData?.type === "guest" && type === "guest") {
            if (existingData.expiresAt > now) {
                const activationData: ActivationData = {
                    id: deviceId,
                    type: existingData.type,
                    createdAt: existingData.createdAt,
                    expiresAt: existingData.expiresAt,
                    gracePeriodEnd: existingData.gracePeriodEnd,
                    fingerprint: existingData.fingerprint,
                    v: TOKEN_VERSION,
                };

                const secret = process.env.ACTIVATION_SECRET!;
                const signedPayload = generateSignedPayload(activationData, secret);

                return NextResponse.json({
                    success: true,
                    message: "Trial already active",
                    payload: signedPayload,
                    gracePeriodEnd: existingData.gracePeriodEnd,
                    expiresAt: existingData.expiresAt,
                    type: existingData.type,
                });
            }

            return NextResponse.json({
                success: false,
                error: "Guest trial expired. Please create an account to continue.",
                requiresUpgrade: true
            }, { status: 403 });
        }

        // SECURITY: Prevent account hijacking - device already linked to different account
        if (existingData?.identity && existingData.type === "account" && type === "account") {
            if (existingData.identity !== identity) {
                return NextResponse.json({
                    success: false,
                    error: "This device is already linked to a different account"
                }, { status: 403 });
            }
        }

        // 4. Calculate Expiry Logic
        let expiresAt: number;
        let gracePeriodEnd: number;
        let createdAt: number = now;

        if (existingData) {
            // CASE A: User exists. Are they upgrading? Or Renewing?

            // If upgrading from Guest to Account
            if (existingData.type === "guest" && type === "account") {
                const remainingGuestTime = Math.max(0, existingData.expiresAt - now);
                expiresAt = now + PACKAGES.account.duration + remainingGuestTime;
                gracePeriodEnd = now + PACKAGES.account.grace;
                createdAt = existingData.createdAt; // Keep original registration date
            }
            // If same type (Renewal)
            else if (existingData.type === type) {
                expiresAt = existingData.expiresAt; // Keep existing expiry (no auto-extension)
                gracePeriodEnd = now + PACKAGES[type].grace; // Refresh grace period
                createdAt = existingData.createdAt;
            }
            // Downgrade (Account to Guest - edge case)
            else {
                expiresAt = now + PACKAGES[type].duration;
                gracePeriodEnd = now + PACKAGES[type].grace;
            }
        } else {
            // CASE B: New Device
            expiresAt = now + PACKAGES[type].duration;
            gracePeriodEnd = now + PACKAGES[type].grace;
        }

        // 5. Generate Fingerprint & Payload
        const fingerprint = createFingerprint(deviceId, platform);

        const activationData: ActivationData = {
            id: deviceId,
            type,
            createdAt,
            expiresAt,
            gracePeriodEnd,
            fingerprint,
            v: TOKEN_VERSION,
        };

        const secret = process.env.ACTIVATION_SECRET;
        if (!secret) throw new Error("Missing ACTIVATION_SECRET");

        const signedPayload = generateSignedPayload(activationData, secret);

        // 6. Update Firestore
        await regRef.set({
            deviceId,
            type,
            status: "active",
            identity: identity ?? null,
            channel: channel ?? null,
            fingerprint,
            createdAt,
            expiresAt,
            gracePeriodEnd,
            lastVerifiedAt: now,
            appVersion: appVersion ?? null,
            platform,
            updatedAt: now,
            tokenVersion: TOKEN_VERSION,
        }, { merge: true });


        // 7. Response
        return NextResponse.json({
            success: true,
            payload: signedPayload,
            gracePeriodEnd,
            expiresAt,
            type,
        });

    } catch (error) {
        console.error("Activation Error:", error);
        return NextResponse.json({
            success: false,
            error: process.env.NODE_ENV === "production" ? "Activation failed" : (error instanceof Error ? error.message : "Unknown error")
        }, { status: 500 });
    }
}