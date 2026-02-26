import { verifyLicenseToken } from "@/logic/token.logic";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { token: string };

    const { token } = body;

    const payload = verifyLicenseToken(token);

    if(!payload) {
        return NextResponse.json({
            success: false,
            message: "Token is invalid, failed to decode"
        })
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