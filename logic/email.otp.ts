import { redis } from '@/configs/redis.config'
import EmailTemplate from '@/ui/email'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API)

const DAILY_LIMIT = 3

export async function SendEmailOTP(identity: string, otp: string) {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const key = `email-limit:${identity}:${today}`;

    const count = await redis.get(key);

    if (count && Number(count) >= DAILY_LIMIT) {
      return {
        success: false,
        status: 429,
        message: "Daily email limit reached (3 per day)",
      };
    }

    const { data, error } = await resend.emails.send({
      from: "Simamia APP <noreply@contact.simamia.co.tz>",
      to: [identity],
      subject: "OTP - Verification",
      react: EmailTemplate({ identity, otp }),
    });

    if (error) {
      console.error(error);

      return {
        success: false,
        status: 500,
        message: "Failed to send email",
      };
    }

    const newCount = await redis.incr(key);

    if (newCount === 1) {
      await redis.expire(key, 86400);
    }

    return {
      success: true,
      status: 200,
      data,
      remaining: DAILY_LIMIT - newCount,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      status: 500,
      message: "Server error",
    };
  }
}