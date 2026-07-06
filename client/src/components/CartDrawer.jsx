import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  function goToCheckout() {
    onClose();
    navigate('/checkout');
  }

  return (
    <>
      <div className={`drawer-backdrop ${open ? 'drawer-backdrop--open' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'drawer--open' : ''}`} aria-hidden={!open}>
        <div className="drawer__header">
          <h2>Your tiffin order</h2>
          <button className="drawer__close" onClick={onClose} aria-label="Close cart">×</button>
        </div>

        {items.length === 0 ? (
          <p className="drawer__empty">Your tiffin is empty. Add something warm from the menu.</p>
        ) : (
          <>
            <ul className="drawer__list">
              {items.map((item) => (
                <li key={item.id} className="drawer__item">
                  <span className="drawer__item-emoji">{item.emoji}</span>
                  <div className="drawer__item-info">
                    <span className="drawer__item-name">{item.name}</span>
                    <span className="drawer__item-price">₹{item.price} × {item.qty}</span>
                  </div>
                  <div className="stepper stepper--small">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity">+</button>
                  </div>
                  <button className="drawer__remove" onClick={() => removeItem(item.id)} aria-label="Remove item">Remove</button>
                </li>
              ))}
            </ul>
            <div className="drawer__footer">
              <div className="drawer__subtotal">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <button className="btn btn--primary btn--full" onClick={goToCheckout}>
                Go to checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
