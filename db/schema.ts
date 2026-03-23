import { 
  integer, 
  pgTable, 
  varchar, 
  text, 
  real, 
  index,
  pgEnum,
  primaryKey,
  uniqueIndex,
  foreignKey,
  timestamp
} from "drizzle-orm/pg-core";

// --- Enums to match SQLite CHECK constraints ---
export const deliveryStatusEnum = pgEnum("delivery_status", ['not-taken', 'on-way', 'completed']);
export const paymentStatusEnum = pgEnum("payment_status", ['pending', 'paid', 'cancelled']);
export const salePaymentTypeEnum = pgEnum("sale_payment_type", ['cash', 'digital', 'mixed', 'debt']);
export const saleStatusEnum = pgEnum("sale_status", ['paid', 'partial', 'unpaid']);
export const debtStatusEnum = pgEnum("debt_status", ['overdue', 'upcoming', 'settled']);

// --- Tables ---

export const stock = pgTable("stock", {
  id: integer().notNull(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  productName: varchar("product_name", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }),
  unit: varchar("unit", { length: 50 }),
  qrCode: varchar("qr_code", { length: 255 }),
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
  lastUpdate: text("last_update"),
  syncStatus: integer("sync_status").default(0),
  updatedAt: text("updated_at"),
  syncedAt: timestamp("synced_at").defaultNow()
}, (table) => ({
  pk: primaryKey(table.id, table.shopId), // ✅ composite primary key
  // unique per shop not universal
  shopProductUnique: uniqueIndex("idx_shop_product_unique").on(table.shopId, table.productName),
  shopQrUnique: uniqueIndex("idx_shop_qr").on(table.shopId, table.qrCode)
}));

export const requests = pgTable("requests", {
  id: integer().notNull(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  requestCount: integer("request_count").default(1),
  firstAskedAt: text("first_asked_at").notNull(),
  syncStatus: integer("sync_status").default(0),
  updatedAt: text("updated_at"),
  syncedAt: timestamp("synced_at").defaultNow()
}, (table) => ({
  pk: primaryKey(table.id, table.shopId), // ✅ composite primary key
}));

export const categories = pgTable("categories", {
  id: integer().notNull(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  color: varchar("color", { length: 50 }).notNull(),
  syncStatus: integer("sync_status").default(0),
  updatedAt: text("updated_at"),
  syncedAt: timestamp("synced_at").defaultNow()
}, (table) => ({
  pk: primaryKey(table.id, table.shopId), // ✅ composite primary key
}));

export const customers = pgTable("customers", {
  id: integer().notNull(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  address: text("address"),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
  syncStatus: integer("sync_status").default(0),
  syncedAt: timestamp("synced_at").defaultNow()
}, (table) => ({
  pk: primaryKey(table.id, table.shopId), // ✅ composite primary key
  shopPhoneUnique: uniqueIndex("idx_shop_phone").on(table.shopId, table.phone)
}));

export const debts = pgTable("debts", {
  id: integer().notNull(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  customerId: integer("customer_id").notNull(),
  amountDue: real("amount_due").notNull(),
  amountPaid: real("amount_paid").default(0),
  dueDate: text("due_date").notNull(),
  status: debtStatusEnum("status").notNull(),
  notes: text("notes"),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
  syncStatus: integer("sync_status").default(0),
  syncedAt: timestamp("synced_at").defaultNow()
}, (table) => ({
  customerIdx: index("idx_debts_customer").on(table.customerId),
  statusIdx: index("idx_debts_status").on(table.status),
  dueDateIdx: index("idx_debts_due_date").on(table.dueDate),
  pk: primaryKey(table.id, table.shopId), // ✅ composite primary key

  customerFk: foreignKey({
    columns: [table.customerId, table.shopId],
    foreignColumns: [customers.id, customers.shopId],
    name: "fk_debts_customer_shop"
  }).onDelete("cascade"),
}));

export const payments = pgTable(
  "payments",
  {
    id: integer().notNull(),
    shopId: varchar("shop_id", { length: 255 }).notNull(),

    debtId: integer("debt_id").notNull(),

    amount: real("amount").notNull(),
    paymentDate: text("payment_date"),
    paymentMethod: varchar("payment_method", { length: 100 }),
    notes: text("notes"),
    syncStatus: integer("sync_status").default(0),
    updatedAt: text("updated_at"),
    syncedAt: timestamp("synced_at").defaultNow()
  },
  (table) => ({
    pk: primaryKey(table.id, table.shopId),

    debtFk: foreignKey({
      columns: [table.debtId, table.shopId],
      foreignColumns: [debts.id, debts.shopId],
      name: "fk_payments_debt",
    }).onDelete("cascade"),

    debtIdx: index("idx_payments_debt").on(table.debtId),
  })
);

export const expenses = pgTable("expenses", {
  id: integer().notNull(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).default("Daily use"),
  category: varchar("category", { length: 255 }).default("Personal"),
  totalAmount: real("total_amount").notNull(),
  createdAt: text("created_at"),
  syncStatus: integer("sync_status").default(0),
  updatedAt: text("updated_at"),
  syncedAt: timestamp("synced_at").defaultNow()
}, (table) => ({
  pk: primaryKey(table.id, table.shopId), // ✅ composite primary key
}));

export const expensesItems = pgTable(
  "expenses_items",
  {
    id: integer().notNull(),
    shopId: varchar("shop_id", { length: 255 }).notNull(),

    expenseId: integer("expense_id").notNull(),
    stockId: integer("stock_id"),

    productName: varchar("product_name", { length: 255 }).notNull(),
    qty: integer("qty").notNull(),
    price: real("price").notNull(),
    isQuickExpense: integer("is_quick_expense").default(0),

    syncStatus: integer("sync_status").default(0),
    updatedAt: text("updated_at"),
    syncedAt: timestamp("synced_at").defaultNow()
  },
  (table) => ({
    pk: primaryKey(table.id, table.shopId),

    expenseFk: foreignKey({
      columns: [table.expenseId, table.shopId],
      foreignColumns: [expenses.id, expenses.shopId],
      name: "fk_expenses_items_expense",
    }).onDelete("cascade"),

    stockFk: foreignKey({
      columns: [table.stockId, table.shopId],
      foreignColumns: [stock.id, stock.shopId],
      name: "fk_expenses_items_stock",
    }).onDelete("set null"),
  })
);

export const orders = pgTable("orders", {
  id: integer().notNull(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  code: varchar("code", { length: 50 }).notNull(),
  totalAmount: real("total_amount").notNull(),
  orderStr: text("order_str").notNull(),
  time: text("time"),
  syncStatus: integer("sync_status").default(0),
  updatedAt: text("updated_at"),
  delivery: deliveryStatusEnum("delivery").default('not-taken').notNull(),
  payment: paymentStatusEnum("payment").default('pending').notNull(),
  syncedAt: timestamp("synced_at").defaultNow()
}, (table) => ({
  pk: primaryKey(table.id, table.shopId), // ✅ composite primary key
}));


export const orderCounter = pgTable("order_counter", {
  id: integer().notNull(), // for avoiding conflict - missing id in /sync logic
  date: text("date"),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  counter: integer("counter"),
  syncStatus: integer("sync_status").default(0),
  updatedAt: text("updated_at"),
  syncedAt: timestamp("synced_at").defaultNow()
}, (table) => ({
  pk: primaryKey(table.id, table.shopId),

  uniqueDate: uniqueIndex("order_counter_date_per_shop")
    .on(table.shopId, table.date),
}));

export const sales = pgTable("sales", {
  id: integer().notNull(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  saleNumber: varchar("sale_number", { length: 100 }).notNull(),
  totalAmount: real("total_amount").notNull(),
  paidAmount: real("paid_amount").notNull(),
  balance: real("balance").notNull(),
  paymentType: salePaymentTypeEnum("payment_type").notNull(),
  status: saleStatusEnum("status").notNull(),
  customerName: varchar("customer_name", { length: 255 }),
  createdAt: text("created_at"),
  syncStatus: integer("sync_status").default(0),
  updatedAt: text("updated_at"),
  syncedAt: timestamp("synced_at").defaultNow()
}, (table) => ({
  pk: primaryKey(table.id, table.shopId), // ✅ composite primary key
  shopSaleNoUnique: uniqueIndex("idx_shop_sale_no").on(table.shopId, table.saleNumber)
}));

export const saleItems = pgTable(
  "sale_items",
  {
    id: integer().notNull(),
    shopId: varchar("shop_id", { length: 255 }).notNull(),

    saleId: integer("sale_id").notNull(),
    stockId: integer("stock_id"),

    productName: varchar("product_name", { length: 255 }).notNull(),
    qty: integer("qty").notNull(),
    price: real("price").notNull(),
    isQuickSale: integer("is_quick_sale").default(0),

    syncStatus: integer("sync_status").default(0),
    updatedAt: text("updated_at"),
    syncedAt: timestamp("synced_at").defaultNow()
  },
  (table) => ({
    pk: primaryKey(table.id, table.shopId),

    saleFk: foreignKey({
      columns: [table.saleId, table.shopId],
      foreignColumns: [sales.id, sales.shopId],
      name: "fk_sale_items_sale",
    }).onDelete("cascade"),

    stockFk: foreignKey({
      columns: [table.stockId, table.shopId],
      foreignColumns: [stock.id, stock.shopId],
      name: "fk_sale_items_stock",
    }).onDelete("set null"),
  })
);



export const suppliers = pgTable("suppliers", {
  id: integer().notNull(),
  shopId: varchar("shop_id", { length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }),
  syncStatus: integer().default(0),
  updatedAt: text(),
  syncedAt: timestamp("synced_at").defaultNow()
}, (table) => ({
  pk: primaryKey(table.id, table.shopId), // ✅ composite primary key
  shopSupplierUnique: uniqueIndex("idx_shop_supplier_name").on(table.shopId, table.name)
}));


export const supplierProducts = pgTable("supplier_products", {
    id: integer().notNull(),
    shopId: varchar("shop_id", { length: 255 }).notNull(),

    supplierId: integer("supplier_id").notNull(),
    stockId: integer("stock_id").notNull(),

    qty: integer("qty").default(1),
    syncStatus: integer("sync_status").default(0),
    updatedAt: text("updated_at"),
    syncedAt: timestamp("synced_at").defaultNow()
  },
  (table) => ({
    pk: primaryKey(table.id, table.shopId),

    supplierFk: foreignKey({
      columns: [table.supplierId, table.shopId],
      foreignColumns: [suppliers.id, suppliers.shopId],
      name: "fk_supplier_products_supplier",
    }).onDelete("cascade"),

    stockFk: foreignKey({
      columns: [table.stockId, table.shopId],
      foreignColumns: [stock.id, stock.shopId],
      name: "fk_supplier_products_stock",
    }).onDelete("cascade"),
  })
);