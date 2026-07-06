import React, { useEffect, useMemo, useState } from 'react';
import { getFoods } from '../api.js';
import FoodCard from '../components/FoodCard.jsx';
import CategoryTabs from '../components/CategoryTabs.jsx';
import TiffinMark from '../components/TiffinMark.jsx';

export default function Menu() {
  const [foods, setFoods] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | error | ready
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    getFoods()
      .then((data) => {
        setFoods(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(foods.map((f) => f.category)));
    return ['All', ...cats];
  }, [foods]);

  const visibleFoods = activeCategory === 'All' ? foods : foods.filter((f) => f.category === activeCategory);

  return (
    <main className="menu-page">
      <section className="hero">
        <div className="hero__text">
          <span className="eyebrow">Home-style meals, delivered warm</span>
          <h1>Today's tiffin, packed fresh from real home kitchens.</h1>
          <p>
            No mass kitchens. No conveyor belts. Just the same dabba your neighborhood aunty
            would've sent you — ordered in two minutes, delivered in under an hour.
          </p>
        </div>
      </section>

      {status === 'loading' && (
        <div className="state-block">
          <TiffinMark size={44} spin />
          <p>Warming up the menu…</p>
        </div>
      )}

      {status === 'error' && (
        <div className="state-block">
          <p>Couldn't load the menu. Is the server running on port 4000?</p>
        </div>
      )}

      {status === 'ready' && (
        <>
          <CategoryTabs categories={categories} active={activeCategory} onSelect={setActiveCategory} />
          <div className="food-grid">
            {visibleFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
