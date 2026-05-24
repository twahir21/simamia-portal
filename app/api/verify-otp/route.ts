import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { adminDb } from "@/firebase/admin.firebase";
import admin from "firebase-admin";
import { redis } from "@/configs/redis.config";

// 1. Validation Schema
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
  MAX_VERIFY_ATTEMPTS: 5,
  // Progressive lockout delays in seconds
  LOCKOUT_TIERS: [
    60,         // 1st lock: 1 minute
    120,        // 2nd lock: 2 minutes
    300,        // 3rd lock: 5 minutes
    86400       // 4th lock+: 24 hours
  ]
};

export async function POST(request: Request) {
  const start = Date.now();
  console.log("⏱️ 1. Verification request received: 0ms");

  try {
    const body = await request.json();
    console.log(`⏱️ 2. JSON parsed: ${Date.now() - start}ms`);

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
    console.log(`⏱️ 3. Validation done: ${Date.now() - start}ms`);

    const { identity, channel, otp, deviceId } = validationResult.data;
    const otpKey = `otps:${channel}:${identity}`;
    const lockKey = `device_locks:${deviceId}`;

    // --- SECURITY CHECK 1: PROGRESSIVE DEVICE LOCKOUT (REDIS) ---
    const failedAttemptsStr = await redis.get(lockKey);
    let failedAttempts = failedAttemptsStr ? parseInt(failedAttemptsStr, 10) : 0;

    if (failedAttempts >= CONFIG.MAX_VERIFY_ATTEMPTS) {
      const ttl = await redis.ttl(lockKey);
      if (ttl > 0) {
        return NextResponse.json(
          {
            success: false,
            error: "Too many failed attempts. Device temporarily locked.",
            retryAfter: ttl,
          },
          { status: 429 }
        );
      }
    }
    console.log(`⏱️ 4. Device lock evaluated: ${Date.now() - start}ms`);

    // --- FETCH & VALIDATE OTP FROM REDIS ---
    const otpDataStr = await redis.get(otpKey);
    console.log(`⏱️ 5. OTP record fetched from Redis: ${Date.now() - start}ms`);

    if (!otpDataStr) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    const otpData = JSON.parse(otpDataStr);

    // Guard rails: Device binding check & code-level maximum attempts
    if (otpData.deviceId && otpData.deviceId !== deviceId) {
      return NextResponse.json({ success: false, error: "Invalid verification request" }, { status: 400 });
    }

    if ((otpData.attemptCount || 0) >= CONFIG.MAX_VERIFY_ATTEMPTS) {
      await redis.del(otpKey); // Nuclear burn code on max entry exhaustion
      return NextResponse.json({ success: false, error: "OTP invalidated" }, { status: 400 });
    }

    // --- VERIFY CRYPTO HASH ---
    const incomingHash = crypto.createHash("sha256").update(otp).digest("hex");

    if (otpData.otpHash !== incomingHash) {
      // ❌ WRONG OTP PROCESSING BRANCH
      otpData.attemptCount = (otpData.attemptCount || 0) + 1;

      // Increment total device failures and extract the new total
      failedAttempts = await redis.incr(lockKey);

      // Apply progressive lockout penalty if they crossed a threshold tier
      if (failedAttempts >= CONFIG.MAX_VERIFY_ATTEMPTS) {
        const tierIndex = Math.min(
          Math.floor(failedAttempts / CONFIG.MAX_VERIFY_ATTEMPTS) - 1,
          CONFIG.LOCKOUT_TIERS.length - 1
        );
        const lockWindowSeconds = CONFIG.LOCKOUT_TIERS[tierIndex];
        await redis.expire(lockKey, lockWindowSeconds);
      } else {
        // Keeps the rolling counter alive for at least 15 minutes if not locked out yet
        await redis.expire(lockKey, 900);
      }

      // Update the incremental attempt count back to the OTP key payload
      const remainingTTL = await redis.ttl(otpKey);
      if (remainingTTL > 0) {
        await redis.set(otpKey, JSON.stringify(otpData), "EX", remainingTTL);
      }

      const remainder = failedAttempts % CONFIG.MAX_VERIFY_ATTEMPTS;
      const remainingAttempts = remainder === 0 ? 0 : CONFIG.MAX_VERIFY_ATTEMPTS - remainder;

      console.log(`⏱️ 6. Invalid OTP processing completed: ${Date.now() - start}ms`);
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

    // ---  SUCCESS BRANCH ---
    // Atomic cleanups: wipe OTP and clear device lock penalties instantly
    await redis.pipeline()
      .del(otpKey)
      .del(lockKey)
      .exec();

    console.log(`⏱️ 6. Redis success cleanup done: ${Date.now() - start}ms`);

    // --- OFFLOAD FOREBASE LONG-TERM AUDIT PIPELINE ---
   (async () => {
      try {
        await adminDb.collection("otp_logs").add({
          identity,
          channel,
          deviceId,
          action: "verify_success",
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log("💾 [Background] Long-term audit trail updated.");
      } catch (fsError) {
        console.error("❌ [Background] Audit log creation failed:", fsError);
      }
    })();

    console.log(`🏁 7. Returning success response! Execution duration: ${Date.now() - start}ms`);
    return NextResponse.json(
      { success: true, message: "OTP verified successfully", verified: true },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Error in OTP verification engine:", error);
    return NextResponse.json(
      { success: false, error: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}