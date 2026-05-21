import { NextResponse } from "next/server";
import { adminDb } from "@/firebase/admin.firebase";
import z from "zod";
import crypto from "crypto";

// ============================================================================
// Types & Config
// ============================================================================

interface ActivationData {
    id: string; // deviceId
    type: "account" | "guest";
    createdAt: number;
    expiresAt: number;
    gracePeriodEnd: number;
    fingerprint: string;
    v: number;
}

const TOKEN_VERSION = 1;

const PACKAGES = {
    guest: {
        duration: 7 * 24 * 60 * 60 * 1000,   // 7 days
        grace: 3 * 24 * 60 * 60 * 1000,       // 3 days offline buffer
    },
    account: {
        duration: 14 * 24 * 60 * 60 * 1000,  // 14 days
        grace: 7 * 24 * 60 * 60 * 1000,       // 7 days offline buffer
    },
    guestToAccount: {
        duration: 7 * 24 * 60 * 60 * 1000,   // 7 days
        grace: 3 * 24 * 60 * 60 * 1000,       // 3 days offline buffer
    },
};

// ============================================================================
// Helpers
// ============================================================================

function encode(data: string): string {
    return Buffer.from(data, "utf8").toString("base64url");
}

function createSignature(payload: string, secret: string): string {
    return crypto.createHmac("sha256", secret).update(payload).digest("hex");
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
            isGuest: z.boolean()
        });

        const validation = schema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ success: false, error: validation.error.message }, { status: 400 });
        }

        const { deviceId, identity, channel, appVersion, platform, isGuest } = validation.data;
        const now = Date.now();
        const incomingType: "guest" | "account" = isGuest ? "guest" : "account";

        // 2. Fetch Existing Registration First to Make Security Decisions
        const regRef = adminDb.collection("registrations").doc(deviceId);
        const existingSnap = await regRef.get();
        const existingData = existingSnap.exists ? existingSnap.data() : null;

        // CRITICAL SECURITY FIX: Strict one-way upgrade path
        // If they are already an account, they cannot downgrade/request a guest token.
        if (existingData?.type === "account" && incomingType === "guest") {
            return NextResponse.json({
                success: false,
                error: "This device is already linked to an account. Guest mode is disabled."
            }, { status: 403 });
        }

        // 3. OTP Verification for Account Types
        if (incomingType === "account") {
            if (!identity || !channel) {
                return NextResponse.json({
                    success: false,
                    error: "Identity and channel are required for account activation"
                }, { status: 400 });
            }

            // SECURITY: Prevent account hijacking - device already linked to DIFFERENT account
            if (existingData?.type === "account" && existingData.identity && existingData.identity !== identity) {
                return NextResponse.json({
                    success: false,
                    error: "This device is already linked to a different account"
                }, { status: 403 });
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

            const otpData = doc.data();

            if (otpData?.isUsed && otpData?.verifiedAt) {
                const verifiedAt = otpData.verifiedAt.toDate();
                const verificationExpiry = 24 * 60 * 60 * 1000;
                
                if (now - verifiedAt.getTime() > verificationExpiry) {
                    return NextResponse.json({
                        success: false,
                        error: "Verification expired. Please request a new OTP."
                    }, { status: 403 });
                }
                await otpRef.delete(); // Single-use token enforcement
            } else {
                return NextResponse.json({
                    success: false,
                    verified: false,
                    message: "OTP not yet verified. Please complete verification first."
                }, { status: 403 });
            }
        }

        // 4. Guest-to-Guest Reset Abuse Guard
        if (existingData?.type === "guest" && incomingType === "guest") {
            if (existingData.expiresAt > now) {
                // Return existing valid guest token payload
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

        // 5. Advanced Expiry Calculation Logic
        let expiresAt: number;
        let gracePeriodEnd: number;
        let createdAt: number = now;

        if (existingData) {
            // CASE A: Upgrading from Guest to Account
            if (existingData.type === "guest" && incomingType === "account") {
                // Calculate remaining time left on the guest trial
                const remainingGuestTime = Math.max(0, existingData.expiresAt - now);
                
                // New expiry is: right now + full account allowance + whatever they had left on guest
                expiresAt = now + PACKAGES.guestToAccount.duration + remainingGuestTime;
                gracePeriodEnd = now + PACKAGES.guestToAccount.grace;
                createdAt = existingData.createdAt; 
            }
            // CASE B: Existing Account Renewal / Re-sync
            else {
                expiresAt = existingData.expiresAt; // Retain current expiry (controlled via payment routes, not login)
                gracePeriodEnd = now + PACKAGES.account.grace; // Re-extend the offline buffer
                createdAt = existingData.createdAt;
            }
        } else {
            // CASE C: Brand New Device (First time hitting your ecosystem)
            expiresAt = now + PACKAGES[incomingType].duration;
            gracePeriodEnd = now + PACKAGES[incomingType].grace;
        }

        // 6. Token Generation
        const fingerprint = createFingerprint(deviceId, platform);
        const activationData: ActivationData = {
            id: deviceId,
            type: incomingType,
            createdAt,
            expiresAt,
            gracePeriodEnd,
            fingerprint,
            v: TOKEN_VERSION,
        };

        const secret = process.env.ACTIVATION_SECRET;
        if (!secret) throw new Error("Missing ACTIVATION_SECRET");

        const signedPayload = generateSignedPayload(activationData, secret);

        // 7. Sync State back to Database
        await regRef.set({
            deviceId,
            type: incomingType,
            status: "active",
            identity: identity ?? (existingData?.identity || null),
            channel: channel ?? (existingData?.channel || null),
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

        return NextResponse.json({
            success: true,
            payload: signedPayload,
            gracePeriodEnd,
            expiresAt,
            type: incomingType,
        });

    } catch (error) {
        console.error("Activation Error:", error);
        return NextResponse.json({
            success: false,
            error: process.env.NODE_ENV === "production" ? "Activation failed" : (error instanceof Error ? error.message : "Unknown error")
        }, { status: 500 });
    }
}