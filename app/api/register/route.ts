import { adminDb } from '@/firebase/admin.firebase';
import { auth } from '@/firebase/config.firebase';
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

    const { shopName, phoneNumber, email, password } = validation.data;

    
    // Create the user in Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // save user info.
    await adminDb.collection('shops').doc(userCredential.user.uid).set({
        shopName,
        phoneNumber,
        email,
        status: "Active" as "Active" | "Inactive",
        verified: "Pending" as "Pending" | "Verified",
        createdAt: FieldValue.serverTimestamp(), 
    });
    
    // Trigger verification email
    await sendEmailVerification(userCredential.user);

    return NextResponse.json({
      success: true,
      message: `Registration for ${shopName} successful! Please check your email for verification.`,
      uid: userCredential.user.uid
    }, { status: 201 });

  } catch (error) {
    // --- Handle Specific Firebase Errors ---
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/email-already-in-use') {
        return NextResponse.json({
          success: false,
          message: "This email is already registered. Please log in instead."
        }, { status: 409 }); // 409 Conflict is standard for existing resources
      }

      if (error.code === 'auth/weak-password') {
        return NextResponse.json({
          success: false,
          message: "The password provided is too weak."
        }, { status: 400 });
      }
    }

    // Generic fallback for unexpected errors
    console.error("Registration Error:", error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred during registration."
    }, { status: 500 });
  }
}