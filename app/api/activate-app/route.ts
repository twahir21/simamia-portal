import { NextResponse } from "next/server";
import { adminDb } from "@/firebase/admin.firebase";
import z from "zod";
import crypto from "crypto";

// ============================================================================
// Types
// ============================================================================

interface ActivationData {
    id: string;
    type: "account" | "guest";
    createdAt: number;
    expiresAt: number;
    fingerprint: string;
}

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

function generatePayload(
    data: ActivationData,
    secret: string
): string {
    const encoded = encode(JSON.stringify(data));

    const signature = createSignature(encoded, secret);

    return `${encoded}.${signature}`;
}

function createFingerprint(data: {
    deviceId: string;
    platform?: string;
    appVersion?: string;
}) {
    return crypto
        .createHash("sha256")
        .update(
            `${data.deviceId}:${data.platform ?? "unknown"}:${data.appVersion ?? "unknown"}`
        )
        .digest("hex");
}

// ============================================================================
// Config
// ============================================================================

const PACKAGE_DURATION_MS = {
    guest: 7 * 24 * 60 * 60 * 1000, // 7 days
    account: 14 * 24 * 60 * 60 * 1000, // 14 days
};

const GRACE_PERIOD_MS = {
    guest: 24 * 60 * 60 * 1000, // 24 hours
    account: 72 * 60 * 60 * 1000, // 72 hours
};

// ============================================================================
// ACTIVATE APP ENDPOINT
// ============================================================================

export async function POST(request: Request) {
    try {
        // --------------------------------------------------------------------
        // Parse request body
        // --------------------------------------------------------------------

        const body = await request.json();

        // --------------------------------------------------------------------
        // Validation
        // --------------------------------------------------------------------

        const schema = z.object({
            deviceId: z
                .string()
                .min(1, "Device ID is required"),

            identity: z.string().optional(), // supports guest mode

            channel: z
                .enum(["phone", "email"], {
                    error: () => "A channel should be phone or email"
                }).optional(),

            appVersion: z.string(),

            platform: z
                .enum([
                    "ios",
                    "android",
                    "windows",
                    "macos",
                    "web",
                ]),
        });

        const validation = schema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: validation.error.message,
                },
                { status: 400 }
            );
        }

        const {
            deviceId,
            identity,
            channel,
            appVersion,
            platform,
        } = validation.data;

        // --------------------------------------------------------------------
        // Determine package type
        // --------------------------------------------------------------------

        const isAccount =
            !!identity && !!channel;

        const type: "guest" | "account" =
            isAccount ? "account" : "guest";

        // --------------------------------------------------------------------
        // Environment secret
        // --------------------------------------------------------------------

        const secret =
            process.env.ACTIVATION_SECRET;

        if (!secret) {
            throw new Error(
                "ACTIVATION_SECRET is not configured"
            );
        }

        // --------------------------------------------------------------------
        // Device fingerprint
        // --------------------------------------------------------------------

        const fingerprint = createFingerprint({
            deviceId,
            platform,
            appVersion,
        });

        // --------------------------------------------------------------------
        // Time calculations
        // --------------------------------------------------------------------

        const now = Date.now();

        const expiresAt =
            now + PACKAGE_DURATION_MS[type];

        const gracePeriodEnd =
            now + GRACE_PERIOD_MS[type];

        // --------------------------------------------------------------------
        // Create signed activation payload
        // --------------------------------------------------------------------

        const activationData: ActivationData = {
            id: deviceId,
            type,
            createdAt: now,
            expiresAt,
            fingerprint,
        };

        const signedPayload = generatePayload(
            activationData,
            secret
        );

        // --------------------------------------------------------------------
        // Save registration
        // --------------------------------------------------------------------

        const registrationRef = adminDb
            .collection("registrations")
            .doc(deviceId);

        const existing = await registrationRef.get();

        // --------------------------------------------------------------------
        // Optional guest trial protection
        // --------------------------------------------------------------------

        if (existing.exists) {
            const existingData = existing.data();

            // Prevent unlimited guest resets
            if (
                existingData?.type === "guest" &&
                type === "guest"
            ) {
                return NextResponse.json(
                    {
                        success: false,
                        error:
                            "Guest trial already used on this device",
                    },
                    { status: 403 }
                );
            }
        }

        // --------------------------------------------------------------------
        // Save registration document
        // --------------------------------------------------------------------

        await registrationRef.set(
            {
                deviceId,

                type,

                status: "active",

                identity: identity ?? null,
                channel: channel ?? null,

                fingerprint,

                createdAt: now,
                expiresAt,

                lastVerifiedAt: now,
                gracePeriodEnd,

                appVersion: appVersion ?? null,
                platform: platform ?? null,

                updatedAt: now,
            },
            { merge: true }
        );

        // --------------------------------------------------------------------
        // Response
        // --------------------------------------------------------------------

        return NextResponse.json({
            success: true,

            payload: signedPayload,

            verifiedAt: now,

            gracePeriodEnd,

            package: {
                type,
                createdAt: now,
                expiresAt,
            },
        });
    } catch (error) {
        console.error(
            "Activation endpoint error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Internal Server Error",
            },
            { status: 500 }
        );
    }
}