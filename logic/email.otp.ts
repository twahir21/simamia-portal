import EmailTemplate from '@/ui/email'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API)

export async function SendEmailOTP(identity: string, otp: string) {
  try {


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
        status: 400,
        error: "Failed to send Email, Please contact +255 798 700 900 for further help.",
      };
    }

    return {
      success: true,
      status: 200,
      data,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      status: 500,
      error: "Server error",
    };
  }
}