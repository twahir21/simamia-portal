import { createOTP } from '@/configs/otp.config'
import { redis } from '@/configs/redis.config'
import { EmailTemplate } from '@/ui/email'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API)

const DAILY_LIMIT = 3

export async function SendOTP(shopName: string, email: string) {
  try {
    
    const today = new Date().toISOString().slice(0,10)
    const key = `email-limit:${email}:${today}`

    const count = await redis.get(key)

    if (count && Number(count) >= DAILY_LIMIT) {
      return Response.json({
        success:false,
        message: "Daily email limit reached (3 per day)"
      }, { status:429 })
    }

    const { data, error } = await resend.emails.send({
      from: 'Simamia APP <noreply@contact.simamia.co.tz>',
      to: [email],
      subject: 'OTP - Verification',
      react: EmailTemplate({ shopName: shopName, otp: await createOTP(email) }),
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    const newCount = await redis.incr(key)

    if (newCount === 1) {
      await redis.expire(key, 86400) // 24 hours
    }

    return Response.json({
      success: true,
      data,
      remaining: DAILY_LIMIT - newCount
    })

  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}