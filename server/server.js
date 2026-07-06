const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

const FOODS_PATH = path.join(__dirname, "data", "foods.json");
const ORDERS_PATH = path.join(__dirname, "data", "orders.json");

app.use(cors());
app.use(express.json());

// Ensure orders.json exists
if (!fs.existsSync(ORDERS_PATH)) {
  fs.writeFileSync(ORDERS_PATH, "[]", "utf-8");
}

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function generateOrderId() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `TB${Date.now().toString().slice(-6)}${rand}`;
}

// --- Routes ---

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Get all food items (optionally filter by category)
app.get("/api/foods", (req, res) => {
  const foods = readJSON(FOODS_PATH);
  const { category } = req.query;
  if (category) {
    return res.json(
      foods.filter((f) => f.category.toLowerCase() === category.toLowerCase()),
    );
  }
  res.json(foods);
});

// Get single food item
app.get("/api/foods/:id", (req, res) => {
  const foods = readJSON(FOODS_PATH);
  const food = foods.find((f) => f.id === req.params.id);
  if (!food) return res.status(404).json({ error: "Food item not found" });
  res.json(food);
});

// Place an order
app.post("/api/orders", (req, res) => {
  const { items, customerName, phone, address, notes } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ error: "Order must include at least one item" });
  }
  if (!customerName || !phone || !address) {
    return res
      .status(400)
      .json({ error: "Customer name, phone, and address are required" });
  }

  const foods = readJSON(FOODS_PATH);
  let subtotal = 0;
  let maxPrep = 10;
  const lineItems = [];

  for (const item of items) {
    const food = foods.find((f) => f.id === item.id);
    if (!food) {
      return res.status(400).json({ error: `Unknown food item: ${item.id}` });
    }
    const qty = Math.max(1, parseInt(item.qty, 10) || 1);
    subtotal += food.price * qty;
    maxPrep = Math.max(maxPrep, food.prepMinutes);
    lineItems.push({ id: food.id, name: food.name, price: food.price, qty });
  }

  const deliveryFee = subtotal >= 300 ? 0 : 25;
  const total = subtotal + deliveryFee;

  const order = {
    id: generateOrderId(),
    items: lineItems,
    subtotal,
    deliveryFee,
    total,
    customerName,
    phone,
    address,
    notes: notes || "",
    status: "placed",
    estimatedMinutes: maxPrep + 20,
    placedAt: new Date().toISOString(),
  };

  const orders = readJSON(ORDERS_PATH);
  orders.push(order);
  writeJSON(ORDERS_PATH, orders);

  res.status(201).json(order);
});

// Get single order by id
app.get("/api/orders/:id", (req, res) => {
  const orders = readJSON(ORDERS_PATH);
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

// --- Serve the built frontend in production ---
// After running `npm run build` in /client, this serves the static files
// and hands back index.html for any non-API route so React Router works.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "Not found" });
  }
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`TiffinBox server running at http://localhost:${PORT}`);
});
