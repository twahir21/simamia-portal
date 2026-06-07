import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
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
        await redis.set(redisOtpKey, JSON.stringify(otpPayload), { ex: 120 });

        // 6. Send OTP 
        if (channel === 'phone') {
            try {
                const result = await sendSMSOTP(identity, otp);

                const httpStatus = result?.meta?.http_code || 200;

                return Response.json(
                    {
                        success: true,
                        message: "OTP sent successfully",
                        data: result,
                    },
                    { status: httpStatus }
                );
            } catch (error) {
                return Response.json(
                    {
                        success: false,
                        error:
                            error instanceof Error
                                ? error.message
                                : "Failed to send OTP verification code.",
                    },
                    { status: 400 }
                );
            }
        } else if (channel === 'email') {
            const result = await SendEmailOTP(identity, otp);

            return Response.json(result, { status: result.status });
        } else {
            // Fallback for unsupported channels
            return Response.json(
                {
                    success: true,
                    message: `OTP sent to your ${channel}`,
                    expiresIn: 300, // 5 minutes
                },
                { status: 200 }
            );
        }


    } catch (error) {
        console.error("❌ Error in OTP handler:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}