import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';
import { placeOrder } from '../api.js';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ customerName: '', phone: '', address: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const deliveryFee = subtotal >= 300 ? 0 : 25;
  const total = subtotal + deliveryFee;

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.customerName.trim() || !form.phone.trim() || !form.address.trim()) {
      setError('Please fill in your name, phone, and delivery address.');
      return;
    }

    setSubmitting(true);
    try {
      const order = await placeOrder({
        items: items.map((i) => ({ id: i.id, qty: i.qty })),
        ...form,
      });
      clearCart();
      navigate(`/confirmation/${order.id}`);
    } catch (err) {
      setError(err.message || 'Something went wrong placing your order.');
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="checkout-page">
        <div className="state-block">
          <p>Your tiffin is empty right now.</p>
          <Link className="btn btn--primary" to="/">Browse the menu</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input name="customerName" value={form.customerName} onChange={handleChange} placeholder="e.g. Priya Sharma" />
          </label>
          <label>
            Phone number
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. 98765 43210" />
          </label>
          <label>
            Delivery address
            <textarea name="address" value={form.address} onChange={handleChange} rows={3} placeholder="Flat, street, landmark, city" />
          </label>
          <label>
            Delivery notes (optional)
            <input name="notes" value={form.notes} onChange={handleChange} placeholder="e.g. Leave at the door" />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="btn btn--primary btn--full" type="submit" disabled={submitting}>
            {submitting ? 'Placing order…' : `Place order · ₹${total}`}
          </button>
        </form>

        <aside className="order-summary">
          <h2>Order summary</h2>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <span>{item.emoji} {item.name} × {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </li>
            ))}
          </ul>
          <div className="order-summary__row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="order-summary__row">
            <span>Delivery fee</span>
            <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
          </div>
          <div className="order-summary__row order-summary__row--total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          {deliveryFee > 0 && <p className="order-summary__hint">Add ₹{300 - subtotal} more for free delivery.</p>}
        </aside>
      </div>
    </main>
  );
}
