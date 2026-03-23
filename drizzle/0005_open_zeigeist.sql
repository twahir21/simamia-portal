ALTER TABLE "debts" DROP CONSTRAINT "debts_customer_id_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "expenses_items" DROP CONSTRAINT "expenses_items_expense_id_expenses_id_fk";
--> statement-breakpoint
ALTER TABLE "payments" DROP CONSTRAINT "payments_debt_id_debts_id_fk";
--> statement-breakpoint
ALTER TABLE "sale_items" DROP CONSTRAINT "sale_items_sale_id_sales_id_fk";
--> statement-breakpoint
ALTER TABLE "supplier_products" DROP CONSTRAINT "supplier_products_supplier_id_suppliers_id_fk";
--> statement-breakpoint
ALTER TABLE "supplier_products" DROP CONSTRAINT "supplier_products_stock_id_stock_id_fk";
--> statement-breakpoint
ALTER TABLE "order_counter" DROP CONSTRAINT "order_counter_shop_id_pk";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'order_counter'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "order_counter" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "order_counter" ALTER COLUMN "date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "order_counter" ADD CONSTRAINT "order_counter_shop_id_date_pk" PRIMARY KEY("shop_id","date");--> statement-breakpoint
ALTER TABLE "debts" ADD CONSTRAINT "fk_debts_customer_shop" FOREIGN KEY ("customer_id","shop_id") REFERENCES "public"."customers"("id","shop_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses_items" ADD CONSTRAINT "fk_expenses_items_expense" FOREIGN KEY ("expense_id","shop_id") REFERENCES "public"."expenses"("id","shop_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses_items" ADD CONSTRAINT "fk_expenses_items_stock" FOREIGN KEY ("stock_id","shop_id") REFERENCES "public"."stock"("id","shop_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "fk_payments_debt" FOREIGN KEY ("debt_id","shop_id") REFERENCES "public"."debts"("id","shop_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sale_items" ADD CONSTRAINT "fk_sale_items_sale" FOREIGN KEY ("sale_id","shop_id") REFERENCES "public"."sales"("id","shop_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sale_items" ADD CONSTRAINT "fk_sale_items_stock" FOREIGN KEY ("stock_id","shop_id") REFERENCES "public"."stock"("id","shop_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplier_products" ADD CONSTRAINT "fk_supplier_products_supplier" FOREIGN KEY ("supplier_id","shop_id") REFERENCES "public"."suppliers"("id","shop_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplier_products" ADD CONSTRAINT "fk_supplier_products_stock" FOREIGN KEY ("stock_id","shop_id") REFERENCES "public"."stock"("id","shop_id") ON DELETE cascade ON UPDATE no action;