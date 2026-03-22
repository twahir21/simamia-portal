import { 
  integer, 
  pgTable, 
  timestamp, 
  varchar, 
  text, 
  real, 
  serial, 
  index,
  pgEnum
} from "drizzle-orm/pg-core";

// --- Enums to match SQLite CHECK constraints ---
export const deliveryStatusEnum = pgEnum("delivery_status", ['not-taken', 'on-way', 'completed']);
export const paymentStatusEnum = pgEnum("payment_status", ['pending', 'paid', 'cancelled']);
export const salePaymentTypeEnum = pgEnum("sale_payment_type", ['cash', 'digital', 'mixed', 'debt']);
export const saleStatusEnum = pgEnum("sale_status", ['paid', 'partial', 'unpaid']);
export const debtStatusEnum = pgEnum("debt_status", ['overdue', 'upcoming', 'settled']);

// --- Tables ---

export const stock = pgTable("stock", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  productName: varchar("product_name", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 255 }),
  unit: varchar("unit", { length: 50 }),
  qrCode: varchar("qr_code", { length: 255 }).unique(),
  location: varchar("location", { length: 255 }).default("Main Store"),
  expiryDate: text("expiry_date"),
  suppliers: text("suppliers"),
  batchNumber: varchar("batch_number", { length: 255 }),
  targetMax: integer("target_max"),
  status: varchar("status", { length: 50 }).notNull().default("in-stock"),
  quantity: integer("quantity").notNull(),
  sellingPrice: real("selling_price").notNull(),
  buyingPrice: real("buying_price").notNull(),
  totalCost: real("total_cost"),
  minStock: real("min_stock").notNull(),
  lastUpdate: timestamp("last_update").defaultNow(),
  syncStatus: integer("sync_status").default(0),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const requests = pgTable("requests", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  requestCount: integer("request_count").default(1),
  firstAskedAt: text("first_asked_at").notNull(),
  syncStatus: integer("sync_status").default(0),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const categories = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  color: varchar("color", { length: 50 }).notNull(),
  syncStatus: integer("sync_status").default(0),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const customers = pgTable("customers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  syncStatus: integer("sync_status").default(0)
});

export const debts = pgTable("debts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  customerId: integer("customer_id").references(() => customers.id, { onDelete: 'cascade' }).notNull(),
  amountDue: real("amount_due").notNull(),
  amountPaid: real("amount_paid").default(0),
  dueDate: text("due_date").notNull(),
  status: debtStatusEnum("status").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  syncStatus: integer("sync_status").default(0)
}, (table) => ({
  customerIdx: index("idx_debts_customer").on(table.customerId),
  statusIdx: index("idx_debts_status").on(table.status),
  dueDateIdx: index("idx_debts_due_date").on(table.dueDate),
}));

export const payments = pgTable("payments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  debtId: integer("debt_id").references(() => debts.id, { onDelete: 'cascade' }).notNull(),
  amount: real("amount").notNull(),
  paymentDate: timestamp("payment_date").defaultNow(),
  paymentMethod: varchar("payment_method", { length: 100 }),
  notes: text("notes"),
  syncStatus: integer("sync_status").default(0),
  updatedAt: timestamp("updated_at").defaultNow()
}, (table) => ({
  debtIdx: index("idx_payments_debt").on(table.debtId),
}));

export const expenses = pgTable("expenses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).default("Daily use"),
  category: varchar("category", { length: 255 }).default("Personal"),
  totalAmount: real("total_amount").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  syncStatus: integer("sync_status").default(0),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const expensesItems = pgTable("expenses_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  expenseId: integer("expense_id").references(() => expenses.id, { onDelete: 'cascade' }).notNull(),
  stockId: integer("stock_id"),
  productName: varchar("product_name", { length: 255 }).notNull(),
  qty: integer("qty").notNull(),
  price: real("price").notNull(),
  isQuickExpense: integer("is_quick_expense").default(0),
  syncStatus: integer("sync_status").default(0),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const orders = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  code: varchar("code", { length: 50 }).notNull(),
  totalAmount: real("total_amount").notNull(),
  orderStr: text("order_str").notNull(),
  time: timestamp("time").defaultNow(),
  syncStatus: integer("sync_status").default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
  delivery: deliveryStatusEnum("delivery").default('not-taken').notNull(),
  payment: paymentStatusEnum("payment").default('pending').notNull()
});


export const orderCounter = pgTable("order_counter", {
  date: text("date").primaryKey(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  counter: integer("counter"),
  syncStatus: integer("sync_status").default(0),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const sales = pgTable("sales", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  saleNumber: varchar("sale_number", { length: 100 }).notNull().unique(),
  totalAmount: real("total_amount").notNull(),
  paidAmount: real("paid_amount").notNull(),
  balance: real("balance").notNull(),
  paymentType: salePaymentTypeEnum("payment_type").notNull(),
  status: saleStatusEnum("status").notNull(),
  customerName: varchar("customer_name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  syncStatus: integer("sync_status").default(0),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const saleItems = pgTable("sale_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  saleId: integer("sale_id").references(() => sales.id).notNull(),
  stockId: integer("stock_id"),
  productName: varchar("product_name", { length: 255 }).notNull(),
  qty: integer("qty").notNull(),
  price: real("price").notNull(),
  isQuickSale: integer("is_quick_sale").default(0),
  syncStatus: integer("sync_status").default(0),
  updatedAt: timestamp("updated_at").defaultNow()
});



export const suppliers = pgTable("suppliers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull().unique(),
  phone: varchar({ length: 255 }),
  syncStatus: integer().default(0),
  updatedAt: timestamp().defaultNow()
});

export const supplierProducts = pgTable("supplier_products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  supplierId: integer("supplier_id").references(() => suppliers.id, { onDelete: 'cascade' }).notNull(),
  stockId: integer("stock_id").references(() => stock.id, { onDelete: 'cascade' }).notNull(),
  qty: integer("qty").default(1),
  syncStatus: integer("sync_status").default(0),
  updatedAt: timestamp("updated_at").defaultNow()
});