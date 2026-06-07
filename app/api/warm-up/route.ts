import { redis } from "@/configs/redis.config";
import { adminDb } from "@/firebase/admin.firebase";
import { NextResponse } from "next/server";

export async function GET() {
    const start = Date.now();
    console.log("🔥 1. Warmup request received");

    try {
        // 1. Warmup Redis (Fast ping check)
        const redisStart = Date.now();
        const pingResponse = await redis.ping();
        if (pingResponse !== "PONG") {
            throw new Error("Redis did not respond with PONG");
        }
        console.log(`🔥 2. Redis warmed up successfully in ${Date.now() - redisStart}ms`);

        // 2. Warmup Firebase Admin SDK
        // Instead of writing/reading logs, we just fetch a non-existent document 
        const firebaseStart = Date.now();

        const snap = await adminDb
            .collection("otp_logs")
            .doc("warmup_probe")
            .get();

        console.log(
            `🔥 3. Firebase warmed up in ${Date.now() - firebaseStart
            }ms (exists: ${snap.exists})`
        ); 
        
        const totalDuration = Date.now() - start;
        console.log(`🏁 4. Warmup complete! Total runtime: ${totalDuration}ms`);

        // 3. Return lightweight payload
        return NextResponse.json(
            {
                success: true,
                message: "Authentication systems warmed and ready.",
                durationMs: totalDuration,
            },
            {
                status: 200,
                headers: {
                    // Instruct CDNs/Browsers never to cache this response
                    "Cache-Control": "no-store, max-age=0, must-revalidate",
                },
            }
        );

    } catch (error) {
        console.error("❌ Warmup failed:", error instanceof Error ? error.message : String(error));

        // Return a 503 Service Unavailable so monitoring tools can alert you
        return NextResponse.json(
            {
                success: false,
                error: "Infrastructure warmup failed",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 503 }
        );
    }
}