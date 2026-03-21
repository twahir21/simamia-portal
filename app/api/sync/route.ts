import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Parse the incoming payload from your Expo app
    const payload = await request.json();

    const encodedShopId = request.headers.get('x-shop-id');

    console.log(encodedShopId);

    if (!encodedShopId || encodedShopId.length === 0) {
        return NextResponse.json({
            success: false,
            message: "Shop ID is missing"
        }, { status: 400 });
    }

    const shopId = encodedShopId.replace(/[a-zA-Z]/g, function(char) {
        const base = char <= "Z" ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
    });

    // 2. Log it to your terminal (this is where you see your data!)
    console.log('--- 📥 Incoming Sync Payload ---');
    console.log("ShopID: ", shopId)
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