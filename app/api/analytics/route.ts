import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/firebase/admin.firebase';
import { FieldValue } from 'firebase-admin/firestore';

// 📋 Define the new expected request shape
interface VisitorData {
    visitorId: string;
    visits: number;
    lastSeen: number;
    pages: string[];
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as VisitorData;

        // 🔐 1. Validate input structure
        if (
            typeof body.visitorId !== 'string' || body.visitorId.trim() === '' ||
            typeof body.visits !== 'number' ||
            typeof body.lastSeen !== 'number' ||
            !Array.isArray(body.pages)
        ) {
            return NextResponse.json(
                { success: false, message: 'Invalid analytics payload' },
                { status: 400 }
            );
        }

        // 🌍 2. Safely extract IP
        const forwardedFor = request.headers.get('x-forwarded-for');
        const realIp = request.headers.get('x-real-ip');
        const rawIp = forwardedFor?.split(',') || realIp || 'unknown';

        // 📦 3. Prepare data for Firestore
        const analyticsData = {
            visitorId: body.visitorId.trim(),
            visits: body.visits,
            lastSeen: body.lastSeen, // Client-side timestamp
            pages: body.pages,       // Array of tracked pages
            userAgent: request.headers.get('user-agent') || 'unknown',
            ip: rawIp,
            // Track when the server last touched this document
            updatedAt: FieldValue.serverTimestamp(),
        };

        // 💾 4. Save to Firestore using visitorId as the document identifier
        // This updates the user profile cleanly without creating duplicates
        const visitorRef = adminDb.collection('analytics').doc(analyticsData.visitorId);
        await visitorRef.set(analyticsData, { merge: true });

        // 🔙 5. Return success response
        return NextResponse.json(
            { success: true, message: 'Analytics data synchronized' },
            { status: 200 }
        );

    } catch (error) {
        console.error('❌ Analytics API error:', error instanceof Error ? error.message : error);

        return NextResponse.json(
            { success: false, message: 'Failed to process analytics data' },
            { status: 500 }
        );
    }
}