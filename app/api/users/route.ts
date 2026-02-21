import { adminDb } from "@/firebase/admin.firebase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
    const snapshot = await adminDb.collection('shops')
      .orderBy('createdAt', 'desc') // Latest first
      .get();

    const transactions = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to readable JS Date string
        createdAt: data.createdAt?.toDate?.().toLocaleString() || ''
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