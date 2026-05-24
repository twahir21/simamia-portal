// app/api/feedback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/firebase/admin.firebase';
import { FieldValue } from 'firebase-admin/firestore';

// Define expected request shape
interface FeedbackBody {
    itemId: string;
    isHelpful: boolean;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as FeedbackBody;

        // 🔐 1. Validate input
        if (
            typeof body.itemId !== 'string' ||
            body.itemId.trim() === '' ||
            typeof body.isHelpful !== 'boolean'
        ) {
            return NextResponse.json(
                { success: false, message: 'Invalid request payload' },
                { status: 400 }
            );
        }

        // 🌍 2. Safely extract IP (first in chain if proxied)
        const forwardedFor = request.headers.get('x-forwarded-for');
        const realIp = request.headers.get('x-real-ip');
        const rawIp = forwardedFor?.split(',')[0].trim() || realIp || 'unknown';

        // 📦 3. Prepare data for Firestore
        const feedbackData = {
            itemId: body.itemId.trim(),
            isHelpful: body.isHelpful,
            userAgent: request.headers.get('user-agent') || 'unknown',
            ip: rawIp, // Consider hashing or omitting for privacy
            // Use server timestamp for consistency & querying
            createdAt: FieldValue.serverTimestamp(),
        };

        // 💾 4. Save to Firestore with auto-generated ID
        const feedbackRef = adminDb.collection('feedback').doc();
        await feedbackRef.set(feedbackData);

        // 🔙 6. Return minimal, safe response
        return NextResponse.json(
            { success: true, message: 'Feedback received' },
            { status: 200 }
        );

    } catch (error) {
        console.error('❌ Feedback API error:', error instanceof Error ? error.message : error);

        return NextResponse.json(
            { success: false, message: 'Failed to process feedback' },
            { status: 500 }
        );
    }
}