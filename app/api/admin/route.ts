import { adminDb } from '@/firebase/admin.firebase';
import { FieldValue } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';

const TransactionSchema = z.object({
  transactionId: z.string().min(1, "ID is required"),
  amount: z.string().min(3, "Invalid Amount"),
  expiredAt: z.string()
});

export async function POST(request: Request) {
  try {
    // 1. Extract the cookie from the request headers
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('authToken')?.value; 
    // 2. Verify the cookie
    if (!adminToken || adminToken !== process.env.KEY) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized: Admins only"
        }, { status: 403 });
    }

    const rawBody = await request.json();
    const validation = TransactionSchema.safeParse(rawBody);

    if (!validation.success) {
      return NextResponse.json({
        success: false,
        message: validation.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { transactionId, amount, expiredAt } = validation.data;

    await adminDb.collection('payments').doc(transactionId).set({
      amount: Number(amount), 
      expiredAt: new Date(expiredAt),
      isUsed: false as boolean, 
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ 
      success: true, 
      message: "Transaction created Successfully" 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : "Server error while saving transaction" 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // 1. Verify Admin Auth (Same logic as your POST)
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('authToken')?.value; 

    if (!adminToken || adminToken !== process.env.KEY) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized"
        }, { status: 403 });
    }

    // 2. Fetch from Firestore
    const snapshot = await adminDb.collection('payments')
      .orderBy('createdAt', 'desc') // Latest first
      .get();

    const transactions = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to readable JS Date string
        createdAt: data.createdAt?.toDate?.().toLocaleString() || '',
        expiredAt: data.expiredAt?.toDate?.().toLocaleString() || '',
      };
    });

    return NextResponse.json({
      success: true,
      data: transactions
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to fetch" 
    }, { status: 500 });
  }
}