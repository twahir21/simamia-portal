import { adminDb } from "@/firebase/admin.firebase";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    const { shopId, transactionId } = await request.json() as { shopId: string; transactionId: string };

    if (!shopId || !transactionId) {
      return NextResponse.json({ success: false, message: "Missing required IDs" }, { status: 400 });
    }

    const result = await adminDb.runTransaction(async (transaction) => {
      const shopRef = adminDb.collection("shops").doc(shopId);
      const payRef = adminDb.collection("payments").doc(transactionId);

      const shopDoc = await transaction.get(shopRef);
      const payDoc = await transaction.get(payRef);

      // 1. Verify existence
      if (!shopDoc.exists) throw new Error("SHOP_NOT_FOUND");
      if (!payDoc.exists) throw new Error("PAYMENT_NOT_FOUND");

      const payData = payDoc.data()!;

      // 2. Check if payment is already used
      if (payData.isUsed === true) throw new Error("PAYMENT_ALREADY_USED");

      // 3. Calculate Extension Duration (using the _seconds fix we discussed)
      const durationMs = (payData.expiredAt._seconds - payData.createdAt._seconds) * 1000;

      // 4. Determine starting point for expiry
      // If shop is already active, add to existing date. If expired/new, add to 'now'.
      const currentEndsAt = shopDoc.data()?.endsAt?.toDate() || new Date();
      const newExpiryDate = new Date(currentEndsAt.getTime() + durationMs);

      // 5. Execute atomic updates
      transaction.update(payRef, { 
        isUsed: true, 
        usedBy: shopId, 
        usedAt: new Date() 
      });

      transaction.update(shopRef, {
        endsAt: newExpiryDate,
        status: "Active",
        lastTransactionId: transactionId
      });

      return { newExpiryDate };
    });

    return NextResponse.json({
      success: true,
      message: "Payment successful! Expiry extended.",
      newExpiry: result.newExpiryDate.toLocaleString('en-GB', { timeZone: 'Africa/Nairobi' })
    }, { status: 200 });

  } catch (error) {
    const errorMap: Record<string, { msg: string; status: number }> = {
      SHOP_NOT_FOUND: { msg: "Shop not found.", status: 404 },
      PAYMENT_NOT_FOUND: { msg: "Invalid Transaction ID.", status: 404 },
      PAYMENT_ALREADY_USED: { msg: "This transaction has already been used.", status: 400 },
    };

    const mapped = errorMap[error instanceof Error? error.message : "unexpected Error"];
    return NextResponse.json({
      success: false,
      message: mapped ? mapped.msg : "Internal Server Error"
    }, { status: mapped ? mapped.status : 500 });
  }
}