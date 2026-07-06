import React from 'react';
import { Link } from 'react-router-dom';
import TiffinMark from './TiffinMark.jsx';
import { useCart } from '../CartContext.jsx';

export default function Header({ onCartClick }) {
  const { count } = useCart();

  return (
    <header className="header">
      <Link to="/" className="header__brand">
        <TiffinMark size={36} />
        <span className="header__wordmark">
          Tiffin<em>Box</em>
        </span>
      </Link>
      <button className="header__cart" onClick={onCartClick} aria-label="Open cart">
        <span>Cart</span>
        <span className="header__cart-count">{count}</span>
      </button>
    </header>
  );
}
