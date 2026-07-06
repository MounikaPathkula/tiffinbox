# TiffinBox — Food Delivery App (End-to-End)

A full-stack food delivery app: browse a menu, add items to a cart, check out,
and get an order confirmation. Built with:

- **Backend:** Node.js + Express, data stored in a simple JSON file (no database install needed)
- **Frontend:** React + Vite, with React Router and a cart persisted in the browser

## Requirements

- **Node.js version 20.19+ or 22.12+** (check with `node -v`). This will not run on Node 16.
- npm (comes with Node)

## 1. Start the backend

Open a terminal in the `server` folder:

```bash
cd server
npm install
npm start
```

You should see:
```
TiffinBox server running at http://localhost:4000
```

Leave this terminal running.

## 2. Start the frontend

Open a **second** terminal in the `client` folder:

```bash
cd client
npm install
npm run dev
```

Vite will print a local URL, usually:
```
http://localhost:5173
```

Open that in your browser.

## How it works

- The frontend calls `/api/...` routes, which Vite proxies to the backend at `localhost:4000` (see `client/vite.config.js`).
- Menu items live in `server/data/foods.json` — edit this file to add/change dishes.
- Placed orders are appended to `server/data/orders.json`, created automatically on first run.
- The cart is saved to the browser's `localStorage`, so it survives a page refresh.

## Project structure

```
tiffinbox/
├── server/
│   ├── server.js          # Express API (menu + orders)
│   ├── package.json
│   └── data/
│       ├── foods.json     # Menu items (edit this to customize the menu)
│       └── orders.json    # Created automatically, stores placed orders
└── client/
    ├── src/
    │   ├── pages/          # Menu, Checkout, Confirmation
    │   ├── components/     # Header, FoodCard, CartDrawer, CategoryTabs, TiffinMark
    │   ├── CartContext.jsx # Cart state (add/remove/update qty)
    │   ├── api.js           # fetch() calls to the backend
    │   └── styles.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## API reference

| Method | Route              | Description                          |
|--------|---------------------|---------------------------------------|
| GET    | `/api/foods`         | List all menu items                   |
| GET    | `/api/foods/:id`     | Get a single menu item                |
| POST   | `/api/orders`        | Place an order                        |
| GET    | `/api/orders/:id`    | Look up an order by ID                |

### Example: place an order

```json
POST /api/orders
{
  "items": [{ "id": "f01", "qty": 2 }],
  "customerName": "Priya Sharma",
  "phone": "9876543210",
  "address": "12 MG Road, Hyderabad"
}
```

## Next steps you could add

- User accounts / login
- Order status updates (preparing → out for delivery → delivered)
- Payment integration (this app assumes cash/UPI on delivery)
- An admin view to manage the menu without editing JSON directly
