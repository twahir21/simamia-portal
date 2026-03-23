ALTER TABLE "categories" ALTER COLUMN "updated_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "created_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "updated_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "debts" ALTER COLUMN "created_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "debts" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "debts" ALTER COLUMN "updated_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "debts" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "created_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "updated_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "expenses_items" ALTER COLUMN "updated_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "expenses_items" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "order_counter" ALTER COLUMN "updated_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "order_counter" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "time" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "time" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "updated_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "payment_date" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "payment_date" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "updated_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "requests" ALTER COLUMN "updated_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "requests" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "sale_items" ALTER COLUMN "updated_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "sale_items" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "created_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "updated_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "stock" ALTER COLUMN "last_update" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "stock" ALTER COLUMN "last_update" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "stock" ALTER COLUMN "updated_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "stock" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "supplier_products" ALTER COLUMN "updated_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "supplier_products" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "suppliers" ALTER COLUMN "updatedAt" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "suppliers" ALTER COLUMN "updatedAt" DROP DEFAULT;