import { NextResponse } from "next/server";
import { adminDb } from "@/firebase/admin.firebase";
import z from "zod";
import crypto from "crypto";

// ============================================================================
// Types & Config (Ideally import these from a shared utils file)
// ============================================================================

interface ActivationData {
    id: string;
    type: "account" | "guest";
    createdAt: number;
    expiresAt: number;
    gracePeriodEnd: number;
    fingerprint: string;
    v: number;
}

const TOKEN_VERSION = 1;

const PACKAGES = {
    guest: { grace: 3 * 24 * 60 * 60 * 1000 }, // 3 days
    account: { grace: 7 * 24 * 60 * 60 * 1000 }, // 7 days
};

// ============================================================================
// Helpers (Ideally import these from a shared utils file)
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

// ============================================================================
// API Route: Renew Grace Period
// ============================================================================

export async function POST(request: Request) {
    console.log("[RenewGrace] Incoming request...");
    try {
        const body = await request.json();

        // 1. Validation
        const schema = z.object({
            deviceId: z.string().min(4),
            currentPayload: z.string(), // Required to prove device ownership
        });

        const validation = schema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ success: false, error: validation.error.message }, { status: 400 });
        }

        const { deviceId, currentPayload } = validation.data;
        const now = Date.now();
        const secret = process.env.ACTIVATION_SECRET!;

        // 2. Security: Verify Ownership via Current Token
        const [encodedPart, signaturePart] = currentPayload.split(".");
        if (!encodedPart || !signaturePart) {
            return NextResponse.json({ success: false, error: "Malformed token" }, { status: 400 });
        }

        const expectedSignature = createSignature(encodedPart, secret);
        if (signaturePart !== expectedSignature) {
            console.warn("[RenewGrace] Invalid token signature provided");
            return NextResponse.json({ success: false, error: "Invalid token signature" }, { status: 403 });
        }

        // Decode and ensure the token actually belongs to this deviceId
        let decodedData;
        try {
            decodedData = JSON.parse(Buffer.from(encodedPart, "base64url").toString("utf8"));
        } catch (e) {
            console.error(e);
            return NextResponse.json({ success: false, error: "Invalid token structure" }, { status: 400 });
        }

        if (decodedData.id !== deviceId) {
            console.warn(`[RenewGrace] Token deviceId mismatch: token=${decodedData.id}, requested=${deviceId}`);
            return NextResponse.json({ success: false, error: "Token does not match device" }, { status: 403 });
        }

        // ============================================================================
        // 3. Atomic Transaction: Fetch, Validate, and Update
        // ============================================================================
        const { signedPayload, newGracePeriodEnd, type } = await adminDb.runTransaction(async (transaction) => {
            const regRef = adminDb.collection("registrations").doc(deviceId);
            const docSnap = await transaction.get(regRef);

            // 3a. Verify document exists
            if (!docSnap.exists) {
                throw new Error("NOT_FOUND");
            }

            const existingData = docSnap.data();
            if (!existingData) {
                throw new Error("DATA_EMPTY");
            }

            // 3b. Business Logic Guard: Check if subscription has completely died
            if (now >= existingData.expiresAt) {
                throw new Error("SUBSCRIPTION_EXPIRED");
            }

            const resolvedType = existingData.type as "guest" | "account";

            // 4. Calculate New Grace Period (Reload the offline buffer)
            const graceDuration = resolvedType === "account" ? PACKAGES.account.grace : PACKAGES.guest.grace;
            const computedGracePeriodEnd = now + graceDuration;

            // 5. Generate New Signed Payload
            const activationData: ActivationData = {
                id: deviceId,
                type: resolvedType,
                createdAt: existingData.createdAt,
                expiresAt: existingData.expiresAt, // Keeps the main subscription expiry unchanged
                gracePeriodEnd: computedGracePeriodEnd, // ✅ RENEWS THE OFFLINE BUFFER
                fingerprint: existingData.fingerprint,
                v: TOKEN_VERSION,
            };

            const payload = generateSignedPayload(activationData, secret);

            // 6. Write back atomically using the transaction parameter
            transaction.update(regRef, {
                gracePeriodEnd: computedGracePeriodEnd,
                updatedAt: now,
            });

            // Return values out of the transaction context
            return {
                signedPayload: payload,
                newGracePeriodEnd: computedGracePeriodEnd,
                type: resolvedType
            };
        });

        // ============================================================================
        // 4. Send Success Response
        // ============================================================================
        console.log(`[RenewGrace] Success! Reloaded grace for ${deviceId} until ${new Date(newGracePeriodEnd).toISOString()}`);

        return NextResponse.json({
            success: true,
            message: "Grace period reloaded successfully",
            payload: signedPayload,
            gracePeriodEnd: newGracePeriodEnd,
            type: type,
        });

    } catch (error) {
        console.error("[RenewGrace] CRITICAL ERROR:", error);

        // Catch explicitly thrown transactional errors to return semantic HTTP statuses
        if (error instanceof Error) {
            if (error.message === "NOT_FOUND" || error.message === "DATA_EMPTY") {
                return NextResponse.json({ success: false, error: "Device not registered or Data not found" }, { status: 404 });
            }
            if (error.message === "SUBSCRIPTION_EXPIRED") {
                console.warn(`[RenewGrace] Rejected: Core subscription has completely expired.`);
                return NextResponse.json({
                    success: false,
                    error: "Subscription expired. Cannot extend grace period. Please renew your account.",
                    requiresUpgrade: true
                }, { status: 403 });
            }
        }

        return NextResponse.json({
            success: false,
            error: process.env.NODE_ENV === "production" ? "Renewal failed" : (error instanceof Error ? error.message : "Unknown error")
        }, { status: 500 });
    }
}