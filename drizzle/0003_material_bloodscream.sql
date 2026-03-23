ALTER TABLE "categories" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "debts" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "expenses_items" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "requests" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "sale_items" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "stock" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "supplier_products" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "suppliers" ALTER COLUMN "id" DROP IDENTITY;