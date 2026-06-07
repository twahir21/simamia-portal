import { NextResponse } from "next/server";
import { redis } from "@/configs/redis.config";

export async function GET() {
  try {
    // 1. Define the key where you store the version
    const VERSION_KEY = "app:latest_version";

    // 2. Try to get the version from Redis
    let version = await redis.get(VERSION_KEY);

    // 3. Fallback if Redis is empty (First time setup or cache miss)
    if (!version) {
      // Set a default version so the next request is faster
      version = "1.0.0"; 
      await redis.set(VERSION_KEY, version);
      console.log("[AppVersion] Initialized default version:", version);
    }

    return NextResponse.json({
      success: true,
      version: version,
      timestamp: Date.now(),
    });

  } catch (error) {
    console.error("[AppVersion] Error fetching version:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch app version" },
      { status: 500 }
    );
  }
}