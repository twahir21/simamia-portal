import { NextResponse } from "next/server";
import { z } from "zod";
import admin from "firebase-admin";
import crypto from "crypto";
import { adminDb } from "@/firebase/admin.firebase";
import { SendEmailOTP } from "@/logic/email.otp";


// 1. Define Validation Schema with Zod
const otpRequestSchema = z.object({
    identity: z.string().min(1, "Identity is required"), // phone or email value
    channel: z.enum(["phone", "email"], {
        error: () => ({ message: "Channel must be 'phone' or 'email'" }),
    }),
    deviceId: z.string(),
    appVersion: z.string(),
});

// Helper: Generate secure 4-digit OTP
function generateOTP(): string {
    // cryptographically secure 4 digit OTP
    return crypto.randomInt(1000, 10000).toString();
}

// Helper: Simple rate limit check (Optional but recommended)
const checkRateLimit = async (identity: string, channel: string) => {
    const key = `otp_limits:${channel}:${identity}`;
    const docRef = adminDb.collection("rate_limits").doc(key);
    const doc = await docRef.get();

    if (doc.exists) {
        const data = doc.data();
        const lastSent = data?.lastSent?.toDate();
        const now = new Date();

        // Block if sent within last 60 seconds
        if (lastSent && (now.getTime() - lastSent.getTime()) < 60000) {
            return false;
        }
    }

    // Update rate limit timestamp
    await docRef.set({
        lastSent: admin.firestore.FieldValue.serverTimestamp(),
        count: admin.firestore.FieldValue.increment(1),
    }, { merge: true });

    return true;
};

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 2. Validate Data
        const validationResult = otpRequestSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid input",
                    details: validationResult.error.flatten().fieldErrors
                },
                { status: 400 }
            );
        }

        const { identity, channel, deviceId, appVersion } = validationResult.data;

        // 3. Rate Limiting Check
        const isAllowed = await checkRateLimit(identity, channel);
        if (!isAllowed) {
            return NextResponse.json(
                { success: false, error: "Too many requests. Please wait a minute." },
                { status: 429 }
            );
        }

        // 4. Generate OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiry

        // 5. Save to Firebase Firestore
        // We use the identity as part of the document ID or query field for easy lookup
        // Collection: 'otps'
        // Document ID: A unique ID or composite key like 'phone:+1234567890'
        const docId = `${channel}:${identity}`;

        await adminDb.collection("otps").doc(docId).set({
            identity: identity,
            channel: channel,
            otpHash: crypto
                .createHash("sha256")
                .update(otp)
                .digest("hex"),
            deviceId: deviceId || null,
            appVersion: appVersion || null,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            expiresAt: expiresAt,
            isUsed: false,
        });

        // 6. Send OTP (Mocked)
        console.log(`[${channel.toUpperCase()}] Sending OTP ${otp} to ${identity}`);

        // TODO: Integrate Twilio/SendGrid here
        // if (channel === 'phone') await sendPhone(identity, otp);
        if (channel === 'email') await SendEmailOTP(identity, otp);

        return NextResponse.json(
            {
                success: true,
                message: `OTP sent to your ${channel}`,
                expiresIn: 300, // 5 minutes
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("❌ Error in OTP handler:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}