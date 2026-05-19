import { NextResponse } from "next/server";
import { z } from "zod";
import admin from "firebase-admin";
import { adminDb } from "@/firebase/admin.firebase";


// 1. Validation Schema for Verify Request
const verifySchema = z.object({
  identity: z.string().min(1, "Identity is required"),
  channel: z.enum(["phone", "email"], {
    error: () => ({ message: "Channel must be 'phone' or 'email'" }),
  }),
  otp: z.string().regex(/^\d{4}$/, "OTP must be a 4-digit code"),
  deviceId: z.string().optional(), // Optional: for audit/logging
});

// 2. Constants for Security Policies
const CONFIG = {
  OTP_EXPIRY_MINUTES: 5,
  MAX_VERIFY_ATTEMPTS: 5,
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes lockout after max attempts
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // --- Validate Input ---
    const validationResult = verifySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { identity, channel, otp, deviceId } = validationResult.data;
    const docId = `${channel}:${identity}`;
    const otpRef = adminDb.collection("otps").doc(docId);

    // --- Fetch OTP Record ---
    const doc = await otpRef.get();

    // Fail fast: No record found (don't reveal if identity exists or not)
    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    const data = doc.data();
    if (!data) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // --- Security Check 1: Already Used? ---
    if (data.isUsed) {
      return NextResponse.json(
        { success: false, error: "OTP has already been used" },
        { status: 400 }
      );
    }

    // --- Security Check 2: Expired? ---
    const now = new Date();
    const expiresAt = data.expiresAt?.toDate();
    if (!expiresAt || now > expiresAt) {
      // Optional: Clean up expired OTPs asynchronously
      // otpRef.delete(); 
      return NextResponse.json(
        { success: false, error: "OTP has expired" },
        { status: 400 }
      );
    }

    // --- Security Check 3: Brute Force Protection ---
    const attemptCount = data.attemptCount || 0;
    const lastAttempt = data.lastAttemptAt?.toDate();

    // Check if locked out due to too many failed attempts
    if (attemptCount >= CONFIG.MAX_VERIFY_ATTEMPTS) {
      if (lastAttempt) {
        const timeSinceLastAttempt = now.getTime() - lastAttempt.getTime();
        if (timeSinceLastAttempt < CONFIG.RATE_LIMIT_WINDOW_MS) {
          const remainingLockout = Math.ceil(
            (CONFIG.RATE_LIMIT_WINDOW_MS - timeSinceLastAttempt) / 1000
          );
          return NextResponse.json(
            {
              success: false,
              error: "Too many failed attempts. Please try again later.",
              retryAfter: remainingLockout, // seconds
            },
            { status: 429 }
          );
        }
      }
      // Lockout period expired, reset attempts
      await otpRef.update({ attemptCount: 0 });
    }

    // --- Verify OTP Code ---
    if (data.otp !== otp) {
      // Increment attempt count and update timestamp
      await otpRef.update({
        attemptCount: admin.firestore.FieldValue.increment(1),
        lastAttemptAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      const remainingAttempts = CONFIG.MAX_VERIFY_ATTEMPTS - (attemptCount + 1);

      return NextResponse.json(
        {
          success: false,
          error: "Invalid OTP",
          ...(remainingAttempts > 0 && {
            message: `${remainingAttempts} attempt${remainingAttempts === 1 ? "" : "s"} remaining`,
          }),
        },
        { status: 400 }
      );
    }

    // --- SUCCESS: OTP Matches ---
    // 1. Mark as used
    // 2. Reset attempt counter for future use
    // 3. Record verification time
    await otpRef.update({
      isUsed: true,
      verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
      attemptCount: 0,
    });

    // Optional: Log successful verification for audit
    await adminDb.collection("otp_logs").add({
      identity,
      channel,
      deviceId: deviceId || null,
      action: "verify_success",
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "OTP verified successfully",
        verified: true,
        // In production, you would typically issue a JWT or session token here
        // token: generateAuthToken(identity),
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Error in OTP verification:", error);

    // Don't leak internal error details to client
    return NextResponse.json(
      { success: false, error: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}