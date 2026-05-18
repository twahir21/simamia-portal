## 1. Sales (steps)
- 4 tabs remembered last used.
- Scan tab, smart search tab (with recommendation dropdown)
- quick sale tab (for services just enter price only)
- favorite tab ( has 3 inner tabs -> 5 pinned products, 5 top sellers, 8 last sold)
- sticky preview at the bottom for viewing product in cart + (view cart and save sales) buttons

## 2. Cart
- Full page preview of products
- Delete all products in a cart
- edit quantity ( supports even fractions and hold for rapid change in +/- buttons)
- delete product (single one)
- discount input
- bottom actions ( cash, debts, digital, mixed -> default to cash)
- buttons (save sale, order, expense)
- here person select sale type first for the sale or
- select order or select expense
- onclick select order means cart is marked as order (to be processed later), there is a modal for enter phone number to save the order
- onclick expense you enter modal info to save cart as sales

## 3. onboarding (steps)
- user sign up with email or phone number
- verify otp
- has option to enter as a guest no sign up
- enter shop name 
- finish

## 4. debts
- view debts, due date
- pay
- debt summary
- call or message customer with one touch

## 5. stock 
- create (simple - all required parts like productName, quantity, selling, buying prices
and full stock registrations
-all field + minimum stock, transport costs, supplier, category,
unit, qr/barcode, expire date, target max
), edit, delete
- restock new items
- imports (Bulk stocks via csv)
- prints, export csv, sort and filter

## 6. orders
- Print (pdf), filter, Sort, export (csv)
- primary call to customer
- Change status (payment status and delivery status)
- secondary contact (whatsapp and sms)
- search
- save sale upon paid and delivered


## 7. settings
- View remaining days
- view expire date
- change language
- lock app
- help center (link to video - how to use the app)
- call us
- share app
- Delete all data
- Export db
- Import db

## 8. pricing 
- package selection (step 1)
- payment instructions (step 2)
- confirm payment and fill transaction ID (step 3)

## 9.business tools
- categories (crud), 
- suppliers, (crud, call normal, whatsapp, message)
- deep reports (
    . profit and loss graph, summary card, expenses
    . sales analytics graph, sales distribution donut graph, 5 top sellers
    . inventory status , 5 critical stock, 5 slow moving, 5 top profitable prd, 5 less profitable
)
- expenses (crud, summary breakdown by categories), 
- asked (crud)
- returns (crud) 
- customers (crud)
- sales history (view, print receipt of the sale ), 

#### MAIN FLOW ########
- 1. A person register product 
- 2. make his first sale
- 3. (optional) view cart
- 4. Save sales

the home layout design
- simple analytics + new sale button + stock button + debt button
- bottom navigation (home , orders, tools, settings)
- tools here means business tools it shows cards -> categories, suppliers, deep reports, expenses, 
asked, returns, customers, sales history