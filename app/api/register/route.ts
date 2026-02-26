import { adminAuth, adminDb } from '@/firebase/admin.firebase';
import { auth } from '@/firebase/config.firebase';
import { UserStatus, UserVerification } from '@/ts/users.types';
import { registerSchema } from '@/validations/registration.valid';
import { FieldValue } from 'firebase-admin/firestore';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({
        success: false,
        message: validation.error.flatten().fieldErrors
      }, { status: 400 });
    }

    const { shopName, phoneNumber, email } = validation.data;

    // 1. Check if email already exists
    try {
      const existingUser = await adminAuth.getUserByEmail(email);
      
      // If code execution reaches here, the user exists
      return NextResponse.json({
        success: true,
        message: "User is already registered. Please log in.",
        uid: existingUser.uid
      }, { status: 200 });

    } catch (authError) {
      // If it IS 'auth/user-not-found', we simply proceed to registration below
      console.error(authError)
    }

    // 2. Create the user in Firebase Auth (Client SDK used here)
    const userCredential = await createUserWithEmailAndPassword(auth, email, process.env.USER_ACCOUNT_PASSWORD!);

    // 3. Save shop details to Firestore (Admin SDK)
    await adminDb.collection('shops').doc(userCredential.user.uid).set({
        shopName,
        phoneNumber,
        email,
        status: "Active" as UserStatus,
        verified: "Pending" as UserVerification,
        endsAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        createdAt: FieldValue.serverTimestamp(), 
    });
    
    // 4. Trigger verification email
    await sendEmailVerification(userCredential.user);

    return NextResponse.json({
      success: true,
      message: `Registration for ${shopName} successful! Please check your email for verification.`,
      uid: userCredential.user.uid
    }, { status: 201 });

  } catch (error) {
    // Handle registration-specific errors (like weak password)
    if (error instanceof FirebaseError) {
       return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: "An unexpected error occurred during registration."
    }, { status: 500 });
  }
}