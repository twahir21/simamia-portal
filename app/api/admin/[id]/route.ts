import { adminDb } from '@/firebase/admin.firebase';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

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