import { NextResponse } from "next/server";
import { adminDb } from "@/firebase/admin.firebase";
import z from "zod";
import crypto from "crypto";
import { redis } from "@/configs/redis.config";

// ============================================================================
// Types & Config
// ============================================================================

type UserRole = "Admin" | "Manager" | "Cashier";

interface UserRecord {
    userId: string;
    identity: string;
    channel: "phone" | "email";
    role: UserRole;
    shopId: string;
    status: "active" | "suspended";
    createdAt: number;
    updatedAt: number;
    lastLoginAt: number;
    displayName: string | null;
    deviceIds: string[];
}

interface ActivationData {
    id: string; // deviceId
    type: "account" | "guest";
    createdAt: number;
    expiresAt: number;
    gracePeriodEnd: number;
    fingerprint: string;
    v: number;
    // Account-only fields (undefined for guests)
    role?: UserRole;
    shopId?: string;
    userId?: string;
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

function generateShopId(): string {
    return crypto.randomUUID();
}

/**
 * Derives a stable Firestore doc ID from the user's identity.
 * Using a hash keeps the key short and avoids special-char issues with
 * phone numbers or email addresses used directly as doc IDs.
 */
function deriveUserId(identity: string): string {
    return crypto.createHash("sha256").update(identity).digest("hex").slice(0, 32);
}

// ============================================================================
// User Table Logic
// ============================================================================

/**
 * Fetches an existing user or creates a brand-new admin user.
 * Returns the full UserRecord and whether it was just created.
 */
async function getOrCreateUser(
    identity: string,
    channel: "phone" | "email",
    deviceId: string,
    now: number,
    mode: "new" | "existing" = "existing"
): Promise<{ user: UserRecord; isNew: boolean }> {
    const userId = deriveUserId(identity);
    const userRef = adminDb.collection("users").doc(userId);
    const snap = await userRef.get();

    if (snap.exists) {
        const data = snap.data() as UserRecord;

        // Check account isn't suspended
        if (data.status === "suspended") {
            throw Object.assign(new Error("Account suspended"), { code: "SUSPENDED" });
        }

        // Track this device against the user (union so no duplicates)
        if (!data.deviceIds?.includes(deviceId)) {
            await userRef.update({
                deviceIds: [...(data.deviceIds ?? []), deviceId],
                lastLoginAt: now,
                updatedAt: now,
            });
        } else {
            await userRef.update({ lastLoginAt: now, updatedAt: now });
        }

        return { user: { ...data, userId }, isNew: false };
    }

    // ── No existing user found ──

    // If the user explicitly chose "Join Existing Account" but we have no record,
    // don't auto-create — let the caller return a friendly "not found" response.
    if (mode === "existing") {
        throw Object.assign(new Error("Account not found"), { code: "ACCOUNT_NOT_FOUND" });
    }

    // mode === "new" → create it
    const shopId = generateShopId();
    const newUser: UserRecord = {
        userId,
        identity,
        channel,
        role: "Admin",
        shopId,
        status: "active",
        createdAt: now,
        updatedAt: now,
        lastLoginAt: now,
        displayName: null,
        deviceIds: [deviceId],
    };

    await userRef.set(newUser);
    console.log(`[Activation] Created new admin user: ${userId}, shopId: ${shopId}`);

    return { user: newUser, isNew: true };
}
// ============================================================================
// API Route
// ============================================================================

export async function POST(request: Request) {
    console.log("[Activation] Incoming request...");
    try {
        const body = await request.json();
        console.log("[Activation] Request Body:", JSON.stringify(body, null, 2));

        // 1. Validation
        const schema = z.object({
            deviceId: z.string().min(4),
            identity: z.string().optional(),
            channel: z.enum(["phone", "email"]).optional(),
            appVersion: z.string(),
            platform: z.enum(["ios", "android", "windows", "macos", "web"]),
            isGuest: z.boolean(),
            mode: z.enum(["new", "existing"]).optional().default("existing"),
        });

        const validation = schema.safeParse(body);
        if (!validation.success) {
            console.warn("[Activation] Validation Failed:", validation.error.message);
            return NextResponse.json(
                { success: false, error: validation.error.message },
                { status: 400 }
            );
        }

        // <--- NEW: Destructure mode
        const { deviceId, identity, channel, appVersion, platform, isGuest, mode } = validation.data;
        const now = Date.now();
        const incomingType: "guest" | "account" = isGuest ? "guest" : "account";

        console.log(`[Activation] Processing Type: ${incomingType} for Device: ${deviceId}`);

        // 2. Fetch Existing Registration
        const regRef = adminDb.collection("registrations").doc(deviceId);
        const existingSnap = await regRef.get();
        const existingData = existingSnap.exists ? existingSnap.data() : null;

        console.log(
            "[Activation] Existing Registration:",
            !!existingData,
            existingData ? `(Type: ${existingData.type})` : ""
        );

        // 3. Security: block account → guest downgrade
        if (existingData?.type === "account" && incomingType === "guest") {
            console.warn("[Activation] Blocked: Account attempting Guest downgrade");
            return NextResponse.json(
                {
                    success: false,
                    error: "This device is already linked to an account. Guest mode is disabled.",
                },
                { status: 403 }
            );
        }

        // 4. OTP Verification for Account activations
        if (incomingType === "account") {
            if (!identity || !channel) {
                return NextResponse.json(
                    { success: false, error: "Identity and channel are required for account activation" },
                    { status: 400 }
                );
            }

            // Prevent device hijacking
            if (
                existingData?.type === "account" &&
                existingData.identity &&
                existingData.identity !== identity
            ) {
                return NextResponse.json(
                    { success: false, error: "This device is already linked to a different account" },
                    { status: 403 }
                );
            }

            const redisOtpKey = `otps:${channel}:${identity}`;
            const otpData = await redis.get<{
                isUsed?: boolean;
                deviceId?: string | null;
                identity?: string;
                channel?: string;
            }>(redisOtpKey);

            if (!otpData) {
                return NextResponse.json(
                    {
                        success: false,
                        verified: false,
                        message: "No verification record found. Please request and verify an OTP first.",
                    },
                    { status: 400 }
                );
            }

            if (!otpData.isUsed) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "OTP has not been verified yet. Please complete OTP verification first.",
                        verified: false,
                    },
                    { status: 403 }
                );
            }

            if (otpData.identity && otpData.identity !== identity) {
                return NextResponse.json(
                    { success: false, error: "Identity mismatch with verified OTP" },
                    { status: 403 }
                );
            }

            // Consume the OTP receipt
            await redis.del(redisOtpKey);
            console.log("[Activation] Redis: OTP receipt consumed");
        }

        // 5. Guest-to-Guest Reset Guard
        if (existingData?.type === "guest" && incomingType === "guest") {
            if (existingData.expiresAt > now) {
                console.log("[Activation] Returning existing active guest token");
                const activationData: ActivationData = {
                    id: deviceId,
                    type: "guest",
                    createdAt: existingData.createdAt,
                    expiresAt: existingData.expiresAt,
                    gracePeriodEnd: existingData.gracePeriodEnd,
                    fingerprint: existingData.fingerprint,
                    v: TOKEN_VERSION,
                };
                const secret = process.env.ACTIVATION_SECRET!;
                return NextResponse.json({
                    success: true,
                    message: "Trial already active",
                    payload: generateSignedPayload(activationData, secret),
                    gracePeriodEnd: existingData.gracePeriodEnd,
                    expiresAt: existingData.expiresAt,
                    type: "guest",
                });
            }

            return NextResponse.json(
                {
                    success: false,
                    error: "Guest trial expired. Please create an account to continue.",
                    requiresUpgrade: true,
                },
                { status: 403 }
            );
        }

        // 6. Look up / create user in the users table (account only)
        let userRecord: UserRecord | null = null;

        if (incomingType === "account" && identity && channel) {
            try {
                const { user } = await getOrCreateUser(identity, channel, deviceId, now, mode);
                userRecord = user;
                console.log(
                    `[Activation] User: ${user.userId} | role: ${user.role} | shopId: ${user.shopId} | isNew: ${!existingSnap.exists}`
                );
            } catch (err: unknown) {
                if (err instanceof Error && (err as NodeJS.ErrnoException & { code?: string }).code === "SUSPENDED") {
                    return NextResponse.json(
                        { success: false, error: "Account has been suspended. Please contact support." },
                        { status: 403 }
                    );
                }

                if (err instanceof Error && (err as NodeJS.ErrnoException & { code?: string }).code === "ACCOUNT_NOT_FOUND") {
                    return NextResponse.json(
                        {
                            success: false,
                            accountNotFound: true,
                            error: "We couldn't find an account with these details. Would you like to create a new one instead?",
                        },
                        { status: 404 }
                    );
                }

                throw err;
            }
        }

        // 7. Expiry Calculation
        let expiresAt: number;
        let gracePeriodEnd: number;
        let createdAt: number = now;

        if (existingData) {
            if (existingData.type === "guest" && incomingType === "account") {
                // Guest → Account upgrade: keep remaining guest time
                const remainingGuestTime = Math.max(0, existingData.expiresAt - now);
                expiresAt = now + PACKAGES.guestToAccount.duration + remainingGuestTime;
                gracePeriodEnd = now + PACKAGES.guestToAccount.grace;
                createdAt = existingData.createdAt;
                console.log("[Activation] Case A: Guest → Account upgrade");
            } else {
                // Existing account renewal
                expiresAt = existingData.expiresAt;
                gracePeriodEnd = now + PACKAGES.account.grace;
                createdAt = existingData.createdAt;
                console.log("[Activation] Case B: Account renewal");
            }
        } else {
            // Brand-new device
            expiresAt = now + PACKAGES[incomingType].duration;
            gracePeriodEnd = now + PACKAGES[incomingType].grace;
            console.log("[Activation] Case C: New device");
        }

        // 8. Build and sign token
        const fingerprint = createFingerprint(deviceId, platform);
        const activationData: ActivationData = {
            id: deviceId,
            type: incomingType,
            createdAt,
            expiresAt,
            gracePeriodEnd,
            fingerprint,
            v: TOKEN_VERSION,
            // Embed user identity fields only for account tokens
            ...(userRecord && {
                role: userRecord.role,
                shopId: userRecord.shopId,
                userId: userRecord.userId,
            }),
        };

        const secret = process.env.ACTIVATION_SECRET;
        if (!secret) throw new Error("Missing ACTIVATION_SECRET");

        const signedPayload = generateSignedPayload(activationData, secret);
        console.log("[Activation] Payload signed");

        // 9. Persist registration record
        await regRef.set(
            {
                deviceId,
                type: incomingType,
                status: "active",
                identity: identity ?? existingData?.identity ?? null,
                channel: channel ?? existingData?.channel ?? null,
                fingerprint,
                createdAt,
                expiresAt,
                gracePeriodEnd,
                lastVerifiedAt: now,
                appVersion: appVersion ?? null,
                platform,
                updatedAt: now,
                tokenVersion: TOKEN_VERSION,
                // Link to user record if account
                ...(userRecord && {
                    userId: userRecord.userId,
                    role: userRecord.role,
                    shopId: userRecord.shopId,
                }),
            },
            { merge: true }
        );

        console.log("[Activation] Firestore updated. Returning response.");
        return NextResponse.json({
            success: true,
            payload: signedPayload,
            gracePeriodEnd,
            expiresAt,
            type: incomingType,
            ...(userRecord && {
                role: userRecord.role,
                shopId: userRecord.shopId,
                isNewUser: !existingData,
            }),
        });
    } catch (error) {
        console.error("[Activation] CRITICAL ERROR:", error);
        return NextResponse.json(
            {
                success: false,
                error:
                    process.env.NODE_ENV === "production"
                        ? "Activation failed"
                        : error instanceof Error
                            ? error.message
                            : "Unknown error",
            },
            { status: 500 }
        );
    }
}