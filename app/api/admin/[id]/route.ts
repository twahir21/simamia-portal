import { adminDb } from '@/firebase/admin.firebase';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import z from 'zod';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Auth Check
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('authToken')?.value;

    if (!adminToken || adminToken !== process.env.KEY) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;

    // 2. Delete from Firestore
    await adminDb.collection('payments').doc(id).delete();

    return NextResponse.json({ 
      success: true, 
      message: `Transaction ${id} deleted successfully` 
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to delete transaction" 
    }, { status: 500 });
  }
}


// Reuse your schema (ideally export this from a common file)
const TransactionSchema = z.object({
  isUsed: z.boolean()
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Auth Check
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('authToken')?.value;
    if (!adminToken || adminToken !== process.env.KEY) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const rawBody = await request.json();
    
    // 2. Validate incoming data
    const validation = TransactionSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json({
        success: false,
        message: validation.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { isUsed } = validation.data;

    // 3. Update Firestore
    await adminDb.collection('payments').doc(id).update({
      isUsed,
    });

    return NextResponse.json({ 
      success: true, 
      message: "Transaction updated successfully" 
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to update" 
    }, { status: 500 });
  }
}