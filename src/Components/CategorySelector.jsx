import React from "react";

export default function CategorySelector({ player, categories, selectedCategory, onSelect }) {
  return (
    <>
      <h2>Player {player}: Choose your emoji category</h2>
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(player, cat)}
            className={selectedCategory === cat ? "selected" : ""}
          >
            {cat}
          </button>
        ))}
      </div>
    </>
  );
}