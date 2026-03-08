import { adminDb } from "@/firebase/admin.firebase";
import { SendOTP } from "@/logic/send.otp";
import { verifyLicenseToken } from "@/logic/token.logic";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { token: string; deviceId: string };

    const { token, deviceId } = body;

    const payload = verifyLicenseToken(token);

    if(!payload) {
      return NextResponse.json({
          success: false,
          message: "Token is invalid, failed to decode"
      })
    }

    // verify device id, if does not match request otp
    const shopRef = adminDb.collection("shops").doc(payload.uid)
    const shopDoc = await shopRef.get()

    if (shopDoc.exists) {

      const shopData = shopDoc.data()

      const serverDeviceID = shopData?.deviceId;


      // device mismatch → require OTP verification
      if (serverDeviceID && serverDeviceID !== deviceId) {

        // generate and send OTP via email 
        const shopName = shopData?.shopName as string | undefined;
        const email = shopData?.email as string | undefined;


        if (!shopName || !email) {
          return Response.json({
            success: false,
            message: "Email or shopName is missing ..."
          })
        }

        await SendOTP(shopName, email)

        return Response.json({
          success: false,
          requireOtp: true,
          message: "Device change detected. Check your email for OTP verification."
        }, { status: 403 })
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payload decoded successfully",
      payload
    }, { status: 201 });

  } catch (error) {
    console.error(error)
    return NextResponse.json({
      success: false,
      message: "An unexpected error occurred during decoding token."
    }, { status: 500 });
  }
}