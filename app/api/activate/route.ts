import { adminAuth, adminDb } from "@/firebase/admin.firebase";
import { generateToken } from "@/logic/token.logic";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { shopId } = await request.json() as { shopId: string };

    if (!shopId) {
      return NextResponse.json({ success: false, message: "Missing shopId" }, { status: 400 });
    }

    // 0. Verify is email is verified
    const user = await adminAuth.getUser(shopId);

    if (!user) {
      throw new Error("SHOP_NOT_FOUND");
    }

    if (!user.emailVerified) {
      throw new Error("EMAIL_NOT_VERIFIED");
    }

    const shopRef = adminDb.collection("shops").doc(shopId);
    const shopDoc = await shopRef.get();

    if (!shopDoc.exists) {
      throw new Error("SHOP_NOT_FOUND");
    }

    const shopData = shopDoc.data();
    
    // Convert Firestore Timestamp to Unix seconds for JWT
    const expiryTimestamp = shopData?.endsAt?.seconds;

    // 2. Perform the update
    await shopRef.update({ status: "Active"});

    // 3. Generate Token
    // Ensure generateToken handles the private key signing internally
    const token = generateToken(shopId, expiryTimestamp, "Active");

    return NextResponse.json({
      success: true,
      token, 
      message: "Payment successful!",
    }, { status: 200 });

  } catch (error) {
    const errorMap: Record<string, { msg: string; status: number }> = {
      SHOP_NOT_FOUND: { msg: "Shop not found.", status: 404 },
      EMAIL_NOT_VERIFIED: { msg: "Email verification required to activate shop.", status: 403 },
      USER_NOT_FOUND: { msg: "Owner account not found.", status: 404 },
      TOKEN_GENERATION_FAILED: { msg: "Token failed to be generated", status: 500 }
    };

    const mapped = errorMap[error instanceof Error ? error.message : "unknown error occurred"];
    return NextResponse.json({
      success: false,
      message: mapped ? mapped.msg : "Internal Server Error"
    }, { status: mapped ? mapped.status : 500 });
  }
}