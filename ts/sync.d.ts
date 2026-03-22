declare type tableName = 
    "stock" | "requests" | "categories" | "customers" | "debts" |
    "payments" | "expenses" | "expenses_items" | "orders" | "order_counter" |
    "sales" | "sale_items" | "suppliers" | "supplier_products";

declare type Payload = Record<tableName, Record<string, unknown>[]>;