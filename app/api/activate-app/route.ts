import { NextResponse } from "next/server";
import { adminDb } from "@/firebase/admin.firebase";
import z from "zod";
import crypto from "crypto";

// ============================================================================
// Types & Encoding Functions (Server-compatible versions of your interface)
// ============================================================================

interface ActivationData {
    id: string;
    type: "account" | "guest";
    createdAt: number;
    expiresAt: number;
}

function encode(data: string): string {
    return Buffer.from(data, "utf8").toString("base64");
}

// Node.js server-compatible SHA256 signature (replaces Expo's Crypto module)
function createSignature(payload: string, secret: string): string {
    return crypto
        .createHash("sha256")
        .update(payload + secret)
        .digest("hex");
}

export function generatePayload(data: ActivationData, secret: string): string {
    const encoded = encode(JSON.stringify(data));
    const signature = createSignature(encoded, secret);
    return `${encoded}.${signature}`;
}

// ============================================================================
// API Route Handler
// ============================================================================

export async function POST(request: Request) {
    try {
        // 1. Parse incoming request body
        const body = await request.json();

        // 2. Validation schema - identity/channel optional for guest flows
        const activateSchema = z.object({
            identity: z.string().min(1, "Identity is required").optional(),
            channel: z.enum(["phone", "email"], {
                error: () => ({ message: "Channel must be 'phone' or 'email'" }),
            }).optional(),
            deviceId: z.string().min(1, "Device ID required"),
            appVersion: z.string().optional(),
            platform: z.enum(["ios", "android", "windows", "macos", "web"], {
                error: () => ({ message: "Platform must be one of: ios, android, windows, macos, web" }),
            }).optional(),
        });

        const validationResult = activateSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    payload: null,
                    error: validationResult.error.message
                },
                { status: 400 }
            );
        }

        const { identity, channel, appVersion, deviceId, platform } = validationResult.data;

        // 3. Determine user type: account (has identity+channel) or guest
        const isAccount = !!(identity && channel);
        const type: "account" | "guest" = isAccount ? "account" : "guest";

        // 4. Set up timestamps
        const now = Date.now();
        const EXPIRY_MS = {
            guest: 7 * 24 * 60 * 60 * 1000,    // 7 days in milliseconds
            account: 14 * 24 * 60 * 60 * 1000,  // 14 days in milliseconds
        };

        const expiresAt = now + EXPIRY_MS[type];


        // 5. Construct payload matching ActivationData interface
        const payload: ActivationData = {
            id: deviceId,
            type,
            createdAt: now,
            expiresAt,
        };

        // 6. Save/Update to Firebase Firestore
        await adminDb.collection("registrations").doc(deviceId).set({
            ...payload,
            appVersion: appVersion || null,
            platform: platform || null,
            identity: identity || null,
            channel: channel || null,
            updatedAt: now
        }, { merge: true });

        // 7. Generate encoded payload using your exact pattern
        const secret = process.env.ACTIVATION_SECRET;
        if (!secret) {
            throw new Error("ACTIVATION_SECRET environment variable is not configured");
        }

        const encodedPayload = generatePayload(payload, secret);

        // 8. Return response with ENCODED payload (not plain object)
        return NextResponse.json({
            success: true,
            payload: encodedPayload, // 🔐 Now returns: "base64Data.sha256Signature"
        });

    } catch (error) {
        console.error("Error in activation endpoint:", error);

        return NextResponse.json(
            {
                success: false,
                payload: null,
                error: error instanceof Error ? error.message :  "Internal Server Error"
            },
            { status: 500 }
        );
    }
}