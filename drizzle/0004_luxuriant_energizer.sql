ALTER TABLE "customers" DROP CONSTRAINT "customers_phone_unique";--> statement-breakpoint
ALTER TABLE "sales" DROP CONSTRAINT "sales_sale_number_unique";--> statement-breakpoint
ALTER TABLE "stock" DROP CONSTRAINT "stock_product_name_unique";--> statement-breakpoint
ALTER TABLE "stock" DROP CONSTRAINT "stock_qr_code_unique";--> statement-breakpoint
ALTER TABLE "suppliers" DROP CONSTRAINT "suppliers_name_unique";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'categories'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "categories" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'customers'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "customers" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'debts'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "debts" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'expenses'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "expenses" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'expenses_items'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "expenses_items" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'orders'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "orders" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'payments'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "payments" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'requests'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "requests" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'sale_items'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "sale_items" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'sales'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "sales" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'stock'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "stock" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'supplier_products'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "supplier_products" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'suppliers'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "suppliers" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_id_shop_id_pk" PRIMARY KEY("id","shop_id");--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_id_shop_id_pk" PRIMARY KEY("id","shop_id");--> statement-breakpoint
ALTER TABLE "debts" ADD CONSTRAINT "debts_id_shop_id_pk" PRIMARY KEY("id","shop_id");--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_id_shop_id_pk" PRIMARY KEY("id","shop_id");--> statement-breakpoint
ALTER TABLE "expenses_items" ADD CONSTRAINT "expenses_items_id_shop_id_pk" PRIMARY KEY("id","shop_id");--> statement-breakpoint
ALTER TABLE "order_counter" ADD CONSTRAINT "order_counter_shop_id_pk" PRIMARY KEY("shop_id");--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_shop_id_pk" PRIMARY KEY("id","shop_id");--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_id_shop_id_pk" PRIMARY KEY("id","shop_id");--> statement-breakpoint
ALTER TABLE "requests" ADD CONSTRAINT "requests_id_shop_id_pk" PRIMARY KEY("id","shop_id");--> statement-breakpoint
ALTER TABLE "sale_items" ADD CONSTRAINT "sale_items_id_shop_id_pk" PRIMARY KEY("id","shop_id");--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_id_shop_id_pk" PRIMARY KEY("id","shop_id");--> statement-breakpoint
ALTER TABLE "stock" ADD CONSTRAINT "stock_id_shop_id_pk" PRIMARY KEY("id","shop_id");--> statement-breakpoint
ALTER TABLE "supplier_products" ADD CONSTRAINT "supplier_products_id_shop_id_pk" PRIMARY KEY("id","shop_id");--> statement-breakpoint
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_id_shop_id_pk" PRIMARY KEY("id","shop_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_shop_phone" ON "customers" USING btree ("shop_id","phone");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_shop_sale_no" ON "sales" USING btree ("shop_id","sale_number");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_shop_product_unique" ON "stock" USING btree ("shop_id","product_name");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_shop_qr" ON "stock" USING btree ("shop_id","qr_code");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_shop_supplier_name" ON "suppliers" USING btree ("shop_id","name");