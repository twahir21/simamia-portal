import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { identity, channel, deviceId, appVersion } = body;

        // Log the incoming request details
        console.log("=== OTP Request Received ===");
        console.log(`Channel: ${channel}`);
        console.log(`Identity: ${identity}`);
        console.log(`Device ID: ${deviceId}`);
        console.log(`App Version: ${appVersion}`);
        console.log(`Timestamp: ${new Date().toISOString()}`);
        console.log("Full request body:", body);

        // Validate required fields
        if (!identity) {
            console.log("❌ Missing identity field");
            return NextResponse.json(
                { error: "Identity (email/phone) is required" },
                { status: 400 }
            );
        }

        if (!channel || !["phone", "email"].includes(channel)) {
            console.log(`❌ Invalid channel: ${channel}`);
            return NextResponse.json(
                { error: "Valid channel (phone/email) is required" },
                { status: 400 }
            );
        }

        // Here you would typically:
        // 1. Check if the identity exists in your database
        // 2. Generate a 6-digit OTP
        // 3. Store OTP in database/Redis with expiration (e.g., 10 minutes)
        // 4. Send OTP via SMS or email using a service like Twilio, SendGrid, etc.

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`🔐 Generated OTP for ${channel}: ${otp}`);

        // Simulate sending OTP (replace with actual SMS/email service)
        if (channel === "phone") {
            console.log(`📱 Sending SMS to ${identity} with OTP: ${otp}`);
            // await sendSMS(identity, otp);
        } else if (channel === "email") {
            console.log(`📧 Sending email to ${identity} with OTP: ${otp}`);
            // await sendEmail(identity, otp);
        }

        // Store OTP with expiration (example with in-memory store - use Redis in production)
        // await storeOTP(identity, otp, deviceId, 600); // 10 minutes expiry

        console.log(`✅ OTP sent successfully to ${identity}`);
        console.log("=== Request Completed ===\n");

        return NextResponse.json(
            {
                success: true,
                message: `OTP sent to your ${channel}`,
                expiresIn: 600, // 10 minutes in seconds
                // In production, don't send the actual OTP back!
                // Only send it back for development/debugging
                ...(process.env.NODE_ENV === "development" && { otp }),
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("❌ Error in OTP request handler:");
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                error: "Internal server error. Please try again later.",
            },
            { status: 500 }
        );
    }
}