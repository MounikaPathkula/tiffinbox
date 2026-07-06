import React from 'react';
import { useCart } from '../CartContext.jsx';

export default function FoodCard({ food }) {
  const { addItem, items, updateQty } = useCart();
  const inCart = items.find((i) => i.id === food.id);

  return (
    <article className="food-card">
      <div className="food-card__emoji" aria-hidden="true">{food.emoji}</div>
      <div className="food-card__body">
        <div className="food-card__title-row">
          <span className={`veg-dot ${food.veg ? 'veg-dot--veg' : 'veg-dot--nonveg'}`} title={food.veg ? 'Vegetarian' : 'Non-vegetarian'} />
          <h3 className="food-card__title">{food.name}</h3>
        </div>
        <p className="food-card__desc">{food.description}</p>
        <div className="food-card__footer">
          <span className="food-card__price">₹{food.price}</span>
          {inCart ? (
            <div className="stepper">
              <button onClick={() => updateQty(food.id, inCart.qty - 1)} aria-label="Decrease quantity">−</button>
              <span>{inCart.qty}</span>
              <button onClick={() => updateQty(food.id, inCart.qty + 1)} aria-label="Increase quantity">+</button>
            </div>
          ) : (
            <button className="btn btn--add" onClick={() => addItem(food)}>Add</button>
          )}
        </div>
      </div>
    </article>
  );
}
