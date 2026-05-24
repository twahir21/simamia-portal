import { NextResponse } from "next/server";
import { z } from "zod";
import admin from "firebase-admin";
import crypto from "crypto";
import { adminDb } from "@/firebase/admin.firebase";
import { SendEmailOTP } from "@/logic/email.otp";
import { sendSMSOTP } from "@/logic/sms.otp";
import { redis } from "@/configs/redis.config";
import { checkRateLimit } from "@/configs/otp.redis";


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

export async function POST(request: Request) {
    const start = Date.now();

    console.log("1. Request received: ", Date.now() - start)
    try {
        const body = await request.json();

        console.log("2. JSON parsed: ", Date.now() - start)


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

        console.log("3. Validation done: ", Date.now() - start)


        const { identity, channel, deviceId, appVersion } = validationResult.data;

        // 3. Rate Limiting Check
        const isAllowed = await checkRateLimit(identity, channel);
        if (!isAllowed) {
            return NextResponse.json(
                { success: false, error: "Too many requests. Please wait a minute." },
                { status: 429 }
            );
        }

        console.log("4. Rate limit checked: ", Date.now() - start)


        // 4. Generate OTP
        // 4. Generate OTP
        const otp = generateOTP();
        const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

        // 5. Save to Redis instead of Firestore
        const redisOtpKey = `otps:${channel}:${identity}`;
        const otpPayload = {
            identity,
            channel,
            otpHash,
            deviceId: deviceId || null,
            appVersion: appVersion || null,
            createdAt: new Date().toISOString(),
            isUsed: false,
        };

        // Store payload in Redis and auto-expire it in 120 seconds (2 minutes)
        await redis.set(redisOtpKey, JSON.stringify(otpPayload), "EX", 120);
        console.log("5. Firestore write done: ", Date.now() - start)


        // 6. OPTIMIZATION: Fire and Forget / Background Execution
        // Send the SMS/Email in the background without making the user wait for it!
        if (channel === 'phone') {
            sendSMSOTP(identity, otp)
                .then(result => console.log("Background SMS Sent:", result))
                .catch(err => console.error("Background SMS Failed:", err))

        } else if (channel === 'email') {
            SendEmailOTP(identity, otp)
                .then(result => console.log("Background Email Sent:", result))
                .catch(err => console.error("Background Email Failed:", err))
        }

        return NextResponse.json({
            success: true,
            message: "OTP generation initiated successfully",
        }, { status: 200 });

    } catch (error) {
        console.error("❌ Error in OTP handler:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}