import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const suppliersTable = pgTable("suppliers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
  phone: varchar({ length: 255 }),
  syncStatus: integer().default(0),
  updatedAt: timestamp().defaultNow()
});
