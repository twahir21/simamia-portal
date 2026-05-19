import { NextResponse } from "next/server";
import { z } from "zod";
import admin from "firebase-admin";
import { adminDb } from "@/firebase/admin.firebase";
import crypto from "crypto"

// 1. Validation Schema for Verify Request
const verifySchema = z.object({
  identity: z.string().min(1, "Identity is required"),
  channel: z.enum(["phone", "email"], {
    error: () => ({ message: "Channel must be 'phone' or 'email'" }),
  }),
  otp: z.string().regex(/^\d{4}$/, "OTP must be a 4-digit code"),
  deviceId: z.string()
});

// 2. Constants for Security Policies
const CONFIG = {
  OTP_EXPIRY_MINUTES: 2,
  MAX_VERIFY_ATTEMPTS: 5,
  // Progressive lockout delays based on cumulative fails (in milliseconds)
  LOCKOUT_TIERS: [
    60 * 1000,          // 1st tier lockout: 60 seconds
    2 * 60 * 1000,      // 2nd tier lockout: 2 minutes
    5 * 60 * 1000,      // 3rd tier lockout: 5 minutes
    24 * 60 * 60 * 1000 // 4th tier+ lockout: 24 hours
  ]
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

    const deviceLockRef = adminDb.collection("device_locks").doc(deviceId);

    const now = new Date();

    // --- Security Check 1: Progressive Device Lockout ---
    if (deviceLockRef) {
      const deviceLockDoc = await deviceLockRef.get();
      if (deviceLockDoc.exists) {
        const lockData = deviceLockDoc.data();
        const failedAttempts = lockData?.failedAttempts || 0;
        const lastFailedAt = lockData?.lastFailedAt?.toDate();

        // If user has failed attempts, calculate progressive cooldown
        if (failedAttempts >= CONFIG.MAX_VERIFY_ATTEMPTS && lastFailedAt) {
          // Determine tier: index is based on how many intervals of MAX_VERIFY_ATTEMPTS have passed
          const tierIndex = Math.min(
            Math.floor(failedAttempts / CONFIG.MAX_VERIFY_ATTEMPTS) - 1,
            CONFIG.LOCKOUT_TIERS.length - 1
          );
          const lockWindowMs = CONFIG.LOCKOUT_TIERS[tierIndex];
          const unlockAt = lastFailedAt.getTime() + lockWindowMs;

          if (now.getTime() < unlockAt) {
            const retryAfter = Math.ceil((unlockAt - now.getTime()) / 1000);
            return NextResponse.json(
              {
                success: false,
                error: "Too many failed attempts. Device temporarily locked.",
                retryAfter, // Time remaining in seconds
              },
              { status: 429 }
            );
          }
        }
      }
    }

    // --- Fetch OTP Record ---
    const doc = await otpRef.get();

    // ALL validation inside transaction
    // Fail fast: No record found (don't reveal if identity exists or not)
    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    const data = doc.data();
    if (!data || data.isUsed) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // --- Security Check 2: Expired? ---
    const expiresAt = data.expiresAt?.toDate();
    if (!expiresAt || now > expiresAt) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // device
    if (data.deviceId && data.deviceId !== deviceId) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid verification request",
        },
        { status: 400 }
      );
    }

    if ((data.attemptCount || 0) >= 5) {
      return NextResponse.json(
        { success: false, error: "OTP invalidated" },
        { status: 400 }
      );
    }

    // --- Verify OTP Hash ---
    const incomingHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");


            if (data.otpHash !== incomingHash) {
    
                // Track failed attempt on the individual OTP doc
                await otpRef.update({
                    attemptCount: admin.firestore.FieldValue.increment(1),
                    lastAttemptAt: admin.firestore.FieldValue.serverTimestamp(),
                });
    
                // Log failure to device profile
                await deviceLockRef.set({
                    failedAttempts: admin.firestore.FieldValue.increment(1),
                    lastFailedAt: admin.firestore.FieldValue.serverTimestamp(),
                }, { merge: true });
    
                const updatedDeviceDoc = await deviceLockRef.get();
                const currentDeviceFails = updatedDeviceDoc.data()?.failedAttempts || 1;
    
                const remainder = currentDeviceFails % CONFIG.MAX_VERIFY_ATTEMPTS;
                const remainingAttempts = remainder === 0 ? 0 : CONFIG.MAX_VERIFY_ATTEMPTS - remainder;
    
                return NextResponse.json(
                    {
                        success: false,
                        error: "Invalid or expired OTP",
                        message: remainingAttempts > 0
                            ? `${remainingAttempts} attempt${remainingAttempts === 1 ? "" : "s"} remaining before lock.`
                            : "Device locked due to excessive failed entries.",
                    },
                    { status: 400 }
                );
            }
    
            // --- 4. SUCCESS: Use Atomic Batch Operations ---
            const batch = adminDb.batch();
    
            batch.update(otpRef, {
                isUsed: true,
                verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
                attemptCount: 0,
            });
    
            // Clear structural device limit penalties on successful login
            batch.delete(deviceLockRef);
    
            const logRef = adminDb.collection("otp_logs").doc();
            batch.set(logRef, {
                identity,
                channel,
                deviceId,
                action: "verify_success",
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
            });
    
            await batch.commit();
    
            return NextResponse.json({ success: true, message: "OTP verified successfully", verified: true }, { status: 200 });


  } catch (error) {
    console.error("❌ Error in OTP verification:", error);

    // Don't leak internal error details to client
    return NextResponse.json(
      { success: false, error: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}