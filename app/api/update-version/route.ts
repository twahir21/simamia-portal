import { NextResponse } from "next/server";
import { redis } from "@/configs/redis.config";


export async function POST(request: Request) {
  try {
    const { version } = await request.json();

    if (!version || typeof version !== "string") {
      return NextResponse.json(
        { success: false, error: "Valid version string is required" },
        { status: 400 }
      );
    }

    const VERSION_KEY = "app:latest_version";
    await redis.set(VERSION_KEY, version);

    console.log(`[AppVersion] Updated to version: ${version}`);

    return NextResponse.json({
      success: true,
      message: "Version updated successfully",
      version: version,
    });

  } catch (error) {
    console.error("[AppVersion] Error updating version:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update version" },
      { status: 500 }
    );
  }
}