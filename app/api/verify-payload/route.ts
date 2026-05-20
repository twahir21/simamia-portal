import { NextResponse } from "next/server";
import { adminDb } from "@/firebase/admin.firebase";
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

function decode(base64url: string): string {
    return Buffer.from(base64url, "base64url").toString("utf8");
}

function createSignature(payload: string, secret: string): string {
    return crypto
        .createHmac("sha256", secret)
        .update(payload)
        .digest("hex");
}

function verifySignature(
    payload: string,
    signature: string,
    secret: string
): boolean {
    const expected = createSignature(payload, secret);

    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expected)
    );
}

function parsePayload(
    token: string,
    secret: string
): ActivationData | null {
    try {
        const [encoded, signature] = token.split(".");

        if (!encoded || !signature) {
            return null;
        }

        const valid = verifySignature(encoded, signature, secret);

        if (!valid) {
            return null;
        }

        const decoded = decode(encoded);

        return JSON.parse(decoded) as ActivationData;
    } catch {
        return null;
    }
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

function encode(data: string): string {
    return Buffer.from(data, "utf8").toString("base64url");
}

function generatePayload(
    data: ActivationData,
    secret: string
): string {
    const encoded = encode(JSON.stringify(data));

    const signature = createSignature(encoded, secret);

    return `${encoded}.${signature}`;
}

// ============================================================================
// Config
// ============================================================================

const GRACE_PERIOD_MS = {
    guest: 24 * 60 * 60 * 1000, // 24h
    account: 72 * 60 * 60 * 1000, // 72h
};

// ============================================================================
// VERIFY ENDPOINT
// ============================================================================

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            payload,
            deviceId,
            platform,
            appVersion,
        } = body;

        // --------------------------------------------------------------------
        // Validate request
        // --------------------------------------------------------------------

        if (!payload || !deviceId) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Payload and deviceId are required",
                },
                { status: 400 }
            );
        }

        // --------------------------------------------------------------------
        // Validate secret
        // --------------------------------------------------------------------

        const secret = process.env.ACTIVATION_SECRET;

        if (!secret) {
            throw new Error(
                "ACTIVATION_SECRET is not configured"
            );
        }

        // --------------------------------------------------------------------
        // Parse and verify signed payload
        // --------------------------------------------------------------------

        const parsed = parsePayload(payload, secret);

        if (!parsed) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid payload signature",
                },
                { status: 401 }
            );
        }

        // --------------------------------------------------------------------
        // Verify payload belongs to device
        // --------------------------------------------------------------------

        const fingerprint = createFingerprint({
            deviceId,
            platform,
            appVersion,
        });

        if (parsed.fingerprint !== fingerprint) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Device fingerprint mismatch",
                },
                { status: 403 }
            );
        }

        // --------------------------------------------------------------------
        // Verify package expiry
        // --------------------------------------------------------------------

        const now = Date.now();

        if (now > parsed.expiresAt) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Package expired",
                    expired: true,
                },
                { status: 403 }
            );
        }

        // --------------------------------------------------------------------
        // Load registration from Firestore
        // --------------------------------------------------------------------

        const registrationRef = adminDb
            .collection("registrations")
            .doc(deviceId);

        const registrationSnap = await registrationRef.get();

        if (!registrationSnap.exists) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Registration not found",
                },
                { status: 404 }
            );
        }

        const registration = registrationSnap.data();

        // --------------------------------------------------------------------
        // Verify registration status
        // --------------------------------------------------------------------

        if (registration?.status === "revoked") {
            return NextResponse.json(
                {
                    success: false,
                    error: "License revoked",
                },
                { status: 403 }
            );
        }

        if (registration?.status === "banned") {
            return NextResponse.json(
                {
                    success: false,
                    error: "Device banned",
                },
                { status: 403 }
            );
        }

        // --------------------------------------------------------------------
        // Refresh verification timestamps
        // --------------------------------------------------------------------

        const gracePeriodEnd =
            now + GRACE_PERIOD_MS[parsed.type];

        await registrationRef.set(
            {
                lastVerifiedAt: now,
                gracePeriodEnd,
                updatedAt: now,
                platform: platform ?? null,
                appVersion: appVersion ?? null,
            },
            { merge: true }
        );

        // --------------------------------------------------------------------
        // Optionally rotate payload
        // --------------------------------------------------------------------

        const refreshedPayload: ActivationData = {
            ...parsed,
        };

        const signedPayload = generatePayload(
            refreshedPayload,
            secret
        );

        // --------------------------------------------------------------------
        // Success
        // --------------------------------------------------------------------

        return NextResponse.json({
            success: true,

            payload: signedPayload,

            verifiedAt: now,

            gracePeriodEnd,

            package: {
                type: parsed.type,
                expiresAt: parsed.expiresAt,
                createdAt: parsed.createdAt,
            },
        });
    } catch (error) {
        console.error("Verification error:", error);

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