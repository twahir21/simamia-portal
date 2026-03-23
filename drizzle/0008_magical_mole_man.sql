ALTER TABLE "order_counter" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "order_counter" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "synced_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "synced_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "debts" ADD COLUMN "synced_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "synced_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "expenses_items" ADD COLUMN "synced_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "order_counter" ADD COLUMN "synced_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "synced_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "synced_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "requests" ADD COLUMN "synced_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "sale_items" ADD COLUMN "synced_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "sales" ADD COLUMN "synced_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "stock" ADD COLUMN "synced_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "supplier_products" ADD COLUMN "synced_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "suppliers" ADD COLUMN "synced_at" timestamp DEFAULT now();