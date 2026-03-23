import { db } from '@/configs/db.config';
import { stock, requests, categories, customers, debts, payments,
         expenses, expensesItems, orders, orderCounter,
         sales, saleItems, suppliers, supplierProducts } from '@/db/schema';
import { PgTable } from 'drizzle-orm/pg-core';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Parse the incoming payload from your Expo app
    const payload: Payload = await request.json();

    const encodedShopId = request.headers.get('x-shop-id');

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


    // extract table name and map throw them 
    const tableMap: Record<tableName, PgTable> = {
      stock,
      requests,
      categories,
      customers,
      debts,
      payments,
      expenses,
      expenses_items: expensesItems,
      orders,
      order_counter: orderCounter,
      sales,
      sale_items: saleItems,
      suppliers,
      supplier_products: supplierProducts,
    };

    for (const [tableName, rows] of Object.entries(payload)) {
      const table = tableMap[tableName as keyof typeof tableMap];
      if (!table || !Array.isArray(rows)) continue;

      // 1. Prepare data by adding shopId to every row
      const enrichedRows = rows.map((row) => ({
        ...row,
        shopId: shopId, // Inject the decoded shopId here
      }));

      // 2. Perform a Bulk Upsert (Insert or Update on Conflict)
      try {
        await db
          .insert(table)
          .values(enrichedRows)
      } catch (err) {
        console.error(`Error syncing table ${tableName}:`, err);
      }
    }


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