import { verifyOTP } from "@/configs/otp.config"
import { adminDb } from "@/firebase/admin.firebase"
import { verifyLicenseToken } from "@/logic/token.logic"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { deviceId, otp, token, shopId } = body as {
      deviceId: string
      otp: string
      token: string;
      shopId: string | null
    }

    if (!deviceId || !otp || !token || !shopId) {
      return Response.json(
        {
          success: false,
          message: "deviceId and OTP are required"
        },
        { status: 400 }
      )
    }

    const shopRef = adminDb.collection("shops").doc(shopId)
    const shopDoc = await shopRef.get();


    if (!shopDoc.exists) {
      return Response.json({
        success: false,
        message: "Invalid shop ID"
      })
    }

    const shopData = shopDoc.data();

    const email = shopData?.email as string | undefined;
    
    const result = await verifyOTP(email, otp)

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: result.message
        },
        { status: 400 }
      )
    }

    const payload = verifyLicenseToken(token);

    if(!payload) {
      return Response.json({
          success: false,
          message: "Token is invalid, failed to decode"
      })
    }

    return Response.json({
      success: true,
      payload,
      message: "OTP verified successfully"
    })

  } catch (error) {
    console.error(error)

    return Response.json(
      {
        success: false,
        message: "Server error"
      },
      { status: 500 }
    )
  }
}