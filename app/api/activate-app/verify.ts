import { NextResponse } from "next/server";
import { z } from "zod";
import { adminDb } from "@/firebase/admin.firebase";

const checkSchema = z.object({
    identity: z.string().min(1),
    channel: z.enum(["phone", "email"]),
});

export async function GET(request: Request) {
    try {
        // Extract query parameters
        const { searchParams } = new URL(request.url);
        const identity = searchParams.get("identity");
        const channel = searchParams.get("channel");

        // Validate query parameters
        const validationResult = checkSchema.safeParse({ identity, channel });
        if (!validationResult.success) {
            return NextResponse.json(
                { success: false, error: "Missing identity or channel parameters" },
                { status: 400 }
            );
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

        const data = doc.data();

        // Check if the OTP document flags show a successful completion
        if (data?.isUsed && data?.verifiedAt) {
            const verifiedAt = data.verifiedAt.toDate();

            return NextResponse.json(
                {
                    success: true,
                    verified: true,
                    verifiedAt,
                    deviceId: data.deviceId // Useful if you want to make sure it's the same device checking
                },
                { status: 200 }
            );
        }

        // Document exists but hasn't been successfully matched yet
        return NextResponse.json(
            { success: true, verified: false, message: "OTP has been generated but not verified yet." },
            { status: 200 }
        );

    } catch (error) {
        console.error("❌ Error checking OTP status:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}