const BASE = '/api';

export async function getFoods() {
  const res = await fetch(`${BASE}/foods`);
  if (!res.ok) throw new Error('Failed to load menu');
  return res.json();
}

export async function placeOrder(payload) {
  const res = await fetch(`${BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to place order');
  return data;
}

export async function getOrder(id) {
  const res = await fetch(`${BASE}/orders/${id}`);
  if (!res.ok) throw new Error('Order not found');
  return res.json();
}
