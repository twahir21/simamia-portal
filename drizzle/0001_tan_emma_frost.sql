CREATE TYPE "public"."debt_status" AS ENUM('overdue', 'upcoming', 'settled');--> statement-breakpoint
CREATE TYPE "public"."delivery_status" AS ENUM('not-taken', 'on-way', 'completed');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'paid', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."sale_payment_type" AS ENUM('cash', 'digital', 'mixed', 'debt');--> statement-breakpoint
CREATE TYPE "public"."sale_status" AS ENUM('paid', 'partial', 'unpaid');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"color" varchar(50) NOT NULL,
	"sync_status" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"email" varchar(255),
	"address" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"sync_status" integer DEFAULT 0,
	CONSTRAINT "customers_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "debts" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"amount_due" real NOT NULL,
	"amount_paid" real DEFAULT 0,
	"due_date" text NOT NULL,
	"status" "debt_status" NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"sync_status" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) DEFAULT 'Daily use',
	"category" varchar(255) DEFAULT 'Personal',
	"total_amount" real NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"sync_status" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "expenses_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"expense_id" integer NOT NULL,
	"stock_id" integer,
	"product_name" varchar(255) NOT NULL,
	"qty" integer NOT NULL,
	"price" real NOT NULL,
	"is_quick_expense" integer DEFAULT 0,
	"sync_status" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"phone" varchar(50) NOT NULL,
	"code" varchar(50) NOT NULL,
	"total_amount" real NOT NULL,
	"order_str" text NOT NULL,
	"time" timestamp DEFAULT now(),
	"sync_status" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now(),
	"delivery" "delivery_status" DEFAULT 'not-taken' NOT NULL,
	"payment" "payment_status" DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"debt_id" integer NOT NULL,
	"amount" real NOT NULL,
	"payment_date" timestamp DEFAULT now(),
	"payment_method" varchar(100),
	"notes" text,
	"sync_status" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"request_count" integer DEFAULT 1,
	"first_asked_at" text NOT NULL,
	"sync_status" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sale_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"sale_id" integer NOT NULL,
	"stock_id" integer,
	"product_name" varchar(255) NOT NULL,
	"qty" integer NOT NULL,
	"price" real NOT NULL,
	"is_quick_sale" integer DEFAULT 0,
	"sync_status" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sales" (
	"id" serial PRIMARY KEY NOT NULL,
	"sale_number" varchar(100) NOT NULL,
	"total_amount" real NOT NULL,
	"paid_amount" real NOT NULL,
	"balance" real NOT NULL,
	"payment_type" "sale_payment_type" NOT NULL,
	"status" "sale_status" NOT NULL,
	"customer_name" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"sync_status" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "sales_sale_number_unique" UNIQUE("sale_number")
);
--> statement-breakpoint
CREATE TABLE "stock" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_name" varchar(255) NOT NULL,
	"category" varchar(255),
	"unit" varchar(50),
	"qr_code" varchar(255),
	"location" varchar(255) DEFAULT 'Main Store',
	"expiry_date" text,
	"suppliers" text,
	"batch_number" varchar(255),
	"target_max" integer,
	"status" varchar(50) DEFAULT 'in-stock' NOT NULL,
	"quantity" integer NOT NULL,
	"selling_price" real NOT NULL,
	"buying_price" real NOT NULL,
	"total_cost" real,
	"min_stock" real NOT NULL,
	"last_update" timestamp DEFAULT now(),
	"sync_status" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "stock_product_name_unique" UNIQUE("product_name"),
	CONSTRAINT "stock_qr_code_unique" UNIQUE("qr_code")
);
--> statement-breakpoint
CREATE TABLE "supplier_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"supplier_id" integer NOT NULL,
	"stock_id" integer NOT NULL,
	"qty" integer DEFAULT 1,
	"sync_status" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "suppliers" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "suppliers" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "debts" ADD CONSTRAINT "debts_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses_items" ADD CONSTRAINT "expenses_items_expense_id_expenses_id_fk" FOREIGN KEY ("expense_id") REFERENCES "public"."expenses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_debt_id_debts_id_fk" FOREIGN KEY ("debt_id") REFERENCES "public"."debts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sale_items" ADD CONSTRAINT "sale_items_sale_id_sales_id_fk" FOREIGN KEY ("sale_id") REFERENCES "public"."sales"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplier_products" ADD CONSTRAINT "supplier_products_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplier_products" ADD CONSTRAINT "supplier_products_stock_id_stock_id_fk" FOREIGN KEY ("stock_id") REFERENCES "public"."stock"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_debts_customer" ON "debts" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "idx_debts_status" ON "debts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_debts_due_date" ON "debts" USING btree ("due_date");--> statement-breakpoint
CREATE INDEX "idx_payments_debt" ON "payments" USING btree ("debt_id");