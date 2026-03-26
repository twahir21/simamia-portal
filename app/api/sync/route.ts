import { db } from '@/configs/db.config';
import { stock, requests, categories, customers, debts, payments,
         expenses, expensesItems, orders, orderCounter,
         sales, saleItems, suppliers, supplierProducts } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

const tableMap = {
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
} as const;


type TableMap = {
  stock: typeof stock.$inferInsert;
  requests: typeof requests.$inferInsert;
  categories: typeof categories.$inferInsert;
  customers: typeof customers.$inferInsert;
  debts: typeof debts.$inferInsert;
  payments: typeof payments.$inferInsert;
  expenses: typeof expenses.$inferInsert;
  expenses_items: typeof expensesItems.$inferInsert;
  orders: typeof orders.$inferInsert;
  order_counter: typeof orderCounter.$inferInsert;
  sales: typeof sales.$inferInsert;
  sale_items: typeof saleItems.$inferInsert;
  suppliers: typeof suppliers.$inferInsert;
  supplier_products: typeof supplierProducts.$inferInsert;
};

type Payload = {
  [K in keyof TableMap]?: TableMap[K][];
};


export async function POST(request: Request) {
  try {
    const payload: Payload = await request.json();

    const encodedShopId = request.headers.get("x-shop-id");

    if (!encodedShopId) {
      return NextResponse.json(
        { success: false, message: "Shop ID is missing" },
        { status: 400 }
      );
    }

    const shopId = encodedShopId.replace(/[a-zA-Z]/g, (char) => {
      const base = char <= "Z" ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - base + 13) % 26) + base
      );
    });

    for (const tableName of Object.keys(payload) as (keyof Payload)[]) {
      const rows = payload[tableName];
      const table = tableMap[tableName];

      if (!table || !rows || rows.length === 0) continue;

      const enrichedRows = rows.map((row) => ({
        ...row,
        shopId,
      }));

      // ✅ Typed updateSet
      // const updateSet = Object.fromEntries(
      //   Object.keys(enrichedRows[0]).map((key) => [
      //     key,
      //     sql.raw(`excluded."${key}"`),
      //   ])
      // ) as Partial<typeof enrichedRows[number]>;

      try {
        await db
          .insert(table)
          .values(enrichedRows)
          .onConflictDoUpdate({
            target: [table.id, table.shopId],
           set: Object.keys(enrichedRows).reduce((acc, key) => {

          if (table[key]) {

            acc[key] = sql.raw(`excluded.${table[key].name}`); 
          }
          return acc;
        }, {}),
          });
      } catch (err) {
        console.error(`Error syncing ${String(tableName)}:`, err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Data synced successfully",
    });

  } catch (error) {
    console.error("Sync API Error:", error);

    return NextResponse.json(
      { success: false, error: "Invalid payload" },
      { status: 400 }
    );
  }
}