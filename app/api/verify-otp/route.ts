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
  MAX_VERIFY_ATTEMPTS: 5, // Wrong guesses before 1-hour lockout
  DEVICE_LOCK_DURATION_SECONDS: 3600, // 1 hour lockout
  // LOCKOUT_TIERS removed!
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
    const deviceAbuseKey = `device_abuse_count:${deviceId}`;

    // --- SECURITY CHECK 1: 24-HOUR DEVICE BAN ---
    const deviceAbuseCount = await redis.get(deviceAbuseKey);
    if (Number(deviceAbuseCount) >= 3) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many failed attempts. Device temporarily locked for 24 hours.",
          code: "DEVICE_BANNED"
        },
        { status: 429 }
      );
    }

    // --- SECURITY CHECK 2: 1-HOUR DEVICE LOCKOUT ---
    const isLocked = await redis.get(lockKey);
    if (isLocked) {
      const ttl = await redis.ttl(lockKey);
      return NextResponse.json(
        {
          success: false,
          error: `Device locked due to failed attempts. Try again in ${ttl}s`,
          retryAfter: ttl,
          code: "DEVICE_LOCKED"
        },
        { status: 429 }
      );
    }
    console.log(`⏱️ 4. Device locks evaluated: ${Date.now() - start}ms`);

    // --- FETCH & VALIDATE OTP FROM REDIS ---
    const otpData = await redis.get<{
      identity: string;
      channel: "phone" | "email";
      otpHash: string;
      deviceId: string | null;
      appVersion: string | null;
      createdAt: string;
      attemptCount?: number;
    }>(otpKey);
    console.log(`⏱️ 5. OTP record fetched from Redis: ${Date.now() - start}ms`);

    if (!otpData) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // Guard rails: Device binding check
    if (otpData.deviceId && otpData.deviceId !== deviceId) {
      return NextResponse.json({ success: false, error: "Invalid verification request" }, { status: 400 });
    }

    // --- VERIFY CRYPTO HASH ---
    const incomingHash = crypto.createHash("sha256").update(otp).digest("hex");

    if (otpData.otpHash !== incomingHash) {
      // ❌ WRONG OTP PROCESSING BRANCH
      otpData.attemptCount = (otpData.attemptCount || 0) + 1;

      // Check if they hit the max wrong guesses for THIS specific OTP
      if (otpData.attemptCount >= CONFIG.MAX_VERIFY_ATTEMPTS) {
        // 1. Burn the OTP immediately
        await redis.del(otpKey);

        // 2. Lock the device for 1 hour
        await redis.set(lockKey, "locked", { ex: CONFIG.DEVICE_LOCK_DURATION_SECONDS });

        // 3. Increment the 24h abuse tally
        await redis.incr(deviceAbuseKey);
        await redis.expire(deviceAbuseKey, 86400).catch(() => { });

        console.log(`⏱️ 6. Device locked due to max failed attempts: ${Date.now() - start}ms`);
        return NextResponse.json(
          {
            success: false,
            error: "Too many failed attempts. Device locked for 1 hour.",
            code: "DEVICE_LOCKED"
          },
          { status: 429 }
        );
      }

      // If not maxed out, just update the attempt count on the existing OTP key
      const remainingTTL = await redis.ttl(otpKey);
      if (remainingTTL > 0) {
        await redis.set(otpKey, JSON.stringify(otpData), { ex: remainingTTL });
      }

      const remainingAttempts = CONFIG.MAX_VERIFY_ATTEMPTS - otpData.attemptCount;

      console.log(`⏱️ 6. Invalid OTP processing completed: ${Date.now() - start}ms`);
      return NextResponse.json(
        {
          success: false,
          error: "Invalid OTP",
          message: `${remainingAttempts} attempt${remainingAttempts === 1 ? "" : "s"} remaining before lock.`,
        },
        { status: 400 }
      );
    }

    // ---  SUCCESS BRANCH ---
    // Atomic cleanups: wipe OTP instantly
    await redis.pipeline()
      .del(otpKey)
      .exec();

    console.log(`⏱️ 6. Redis success cleanup done: ${Date.now() - start}ms`);

    // --- OFFLOAD FIREBASE LONG-TERM AUDIT PIPELINE ---
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