import { randomInt, createHash } from "crypto"
import { redis } from "./redis.config"

const OTP_TTL = 600;
const MAX_ATTEMPTS = 5;
const ATTEMPT_TTL = 600 // 10 minutes

export function generateOTP(length = 6): string {
  const max = 10 ** length
  const min = 10 ** (length - 1)
  return randomInt(min, max).toString()
}

function hashOTP(otp: string) {
  return createHash("sha256").update(otp).digest("hex")
}

export async function createOTP(email: string) {
  const otp = generateOTP()
  const hashed = hashOTP(otp)

  const key = `otp:${email}`

  await redis.set(key, hashed, "EX", OTP_TTL)

  return otp
}


export async function verifyOTP(email: string | undefined, code: string) {

  if (!email) return {
    success: false,
    message: "Email not found!"
  }
  const otpKey = `otp:${email}`
  const attemptKey = `otp-attempt:${email}`

  const attempts = await redis.get(attemptKey)

  if (attempts && Number(attempts) >= MAX_ATTEMPTS) {
    return {
      success: false,
      message: "Too many attempts. Please request a new OTP."
    }
  }

  const stored = await redis.get(otpKey)

  if (!stored) {
    return {
      success: false,
      message: "OTP expired"
    }
  }

  const hashed = hashOTP(code)

  if (stored !== hashed) {

    const newAttempts = await redis.incr(attemptKey)

    if (newAttempts === 1) {
      await redis.expire(attemptKey, ATTEMPT_TTL)
    }

    return {
      success: false,
      message: `Invalid OTP (${newAttempts}/${MAX_ATTEMPTS})`
    }
  }

  // success → clean keys
  await redis.del(otpKey)
  await redis.del(attemptKey)

  return { success: true }
}