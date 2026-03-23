ALTER TABLE "order_counter" DROP CONSTRAINT "order_counter_shop_id_date_pk";--> statement-breakpoint
ALTER TABLE "order_counter" ADD CONSTRAINT "order_counter_id_shop_id_pk" PRIMARY KEY("id","shop_id");--> statement-breakpoint
CREATE UNIQUE INDEX "order_counter_date_per_shop" ON "order_counter" USING btree ("shop_id","date");