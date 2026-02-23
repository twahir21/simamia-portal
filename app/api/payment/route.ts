import { adminDb } from "@/firebase/admin.firebase";
import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import z from "zod";

const verifySchema = z.object({
  shopId: z.string().min(1, "Shop ID is required"),
  transactionId: z.string().min(1, "Transaction ID is required")
});

export async function POST(request: Request) {
  try {
    // 1. Parse and validate the request body
    const body = await request.json();
    const validation = verifySchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json({
        success: false,
        message: validation.error.flatten().fieldErrors
        }, { status: 400 });
    }

    const { shopId, transactionId } = validation.data;

    const result = await adminDb.runTransaction(async (transaction) => {
      const shopRef = adminDb.collection("shops").doc(shopId);
      const paymentRef = adminDb.collection("payments").doc(transactionId);

      const shopDoc = await transaction.get(shopRef);
      const paymentDoc = await transaction.get(paymentRef);

      // 1. Check if shop exists
      if (!shopDoc.exists) {
        throw new Error("SHOP_NOT_FOUND");
      }
      
      // 2. Check if transaction exists
      if (!paymentDoc.exists) {
        throw new Error("PAYMENT_NOT_FOUND");
      }

      const paymentData = paymentDoc.data()!;


      // 3. Check if payment is already used
      if (paymentData.isUsed === true) {
        throw new Error("PAYMENT_ALREADY_USED");
      }

      // 4. Calculate extension time
      // Logic: expirySet - createdAt (assuming these are Firestore Timestamps)
      const expiredSec = paymentData.expiredAt._seconds;
      const createdSec = paymentData.createdAt._seconds;
      const durationMs = (expiredSec - createdSec) * 1000;

      
      const currentExpiryDate = shopDoc.data()?.endsAt 
      ? shopDoc.data()?.endsAt.toDate() 
      : new Date();
      
      // 4. Create the new Date by adding the duration
      const newExpiryDate = new Date(currentExpiryDate.getTime() + durationMs);
      
      // 5. Execute Updates
      // Mark payment as used
      transaction.update(paymentRef, { 
        isUsed: true, 
        usedBy: shopId, 
        usedAt: FieldValue.serverTimestamp() 
      });

      // Update shop expiry and status
      transaction.update(shopRef, {
        endsAt: newExpiryDate,
        status: "Active",
        lastPaymentId: transactionId
      });

      return { newExpiryDate };
    });

    return NextResponse.json({
      success: true,
      message: "Payment processed and shop activated.",
      newExpiry: result.newExpiryDate
    }, { status: 200 });

  } catch (error) {

    // Map internal errors to user-friendly responses
    const errorMap: Record<string, { msg: string; status: number }> = {
      SHOP_NOT_FOUND: { msg: "Shop record not found.", status: 404 },
      PAYMENT_NOT_FOUND: { msg: "Invalid Transaction ID.", status: 404 },
      SHOP_EMAIL_NOT_VERIFIED: { msg: "Shop Email is not verified", status: 400 },
      PAYMENT_ALREADY_USED: { msg: "This Transaction ID has already been claimed.", status: 400 },
    };

    const mappedError = errorMap[error instanceof Error ? error.message : "An unexpected error occurred."];
    return NextResponse.json({
      success: false,
      message: mappedError ? mappedError.msg : "An unexpected error occurred."
    }, { status: mappedError ? mappedError.status : 500 });
  }
}