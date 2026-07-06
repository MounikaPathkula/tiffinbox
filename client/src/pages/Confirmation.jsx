import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrder } from '../api.js';
import TiffinMark from '../components/TiffinMark.jsx';

export default function Confirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getOrder(orderId)
      .then((data) => {
        setOrder(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [orderId]);

  if (status === 'loading') {
    return (
      <main className="confirmation-page">
        <div className="state-block">
          <TiffinMark size={44} spin />
          <p>Fetching your order…</p>
        </div>
      </main>
    );
  }

  if (status === 'error' || !order) {
    return (
      <main className="confirmation-page">
        <div className="state-block">
          <p>We couldn't find that order.</p>
          <Link className="btn btn--primary" to="/">Back to menu</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="confirmation-page">
      <div className="confirmation-card">
        <TiffinMark size={56} />
        <span className="eyebrow">Order confirmed</span>
        <h1>It's on the stove.</h1>
        <p className="confirmation-card__id">Order #{order.id}</p>
        <p>
          Estimated delivery in <strong>{order.estimatedMinutes} minutes</strong> to {order.address}.
        </p>

        <ul className="confirmation-card__items">
          {order.items.map((item) => (
            <li key={item.id}>
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </li>
          ))}
        </ul>

        <div className="confirmation-card__total">
          <span>Total paid on delivery</span>
          <span>₹{order.total}</span>
        </div>

        <Link className="btn btn--primary" to="/">Order more</Link>
      </div>
    </main>
  );
}
