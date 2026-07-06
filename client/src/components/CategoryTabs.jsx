import React from 'react';

export default function CategoryTabs({ categories, active, onSelect }) {
  return (
    <div className="tabs" role="tablist">
      {categories.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          className={`tabs__tab ${active === cat ? 'tabs__tab--active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
