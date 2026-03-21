import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Parse the incoming payload from your Expo app
    const payload = await request.json();

    // 2. Log it to your terminal (this is where you see your data!)
    console.log('--- 📥 Incoming Sync Payload ---');
    console.dir(payload, { depth: null }); 
    console.log('--------------------------------');

    // 3. In a real app, you'd save to your server DB here.
    // For now, we just tell Expo "All good!"
    
    return NextResponse.json({ 
      success: true, 
      message: "Data received successfully" 
    }, { status: 200 });

  } catch (error) {
    console.error("Sync API Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Invalid payload" 
    }, { status: 400 });
  }
}