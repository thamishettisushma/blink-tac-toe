import React from "react";

export default function EmojiSelector({ player, category, emojis, selectedEmojis, onSelect }) {
  return (
    <>
      <h2>Player {player}: Pick 3 emojis from {category}</h2>
      <div className="emojis">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onSelect(player, emoji)}
            className={selectedEmojis.includes(emoji) ? "selected" : ""}
            disabled={selectedEmojis.includes(emoji) || selectedEmojis.length >= 3}
          >
            {emoji}
          </button>
        ))}
      </div>
      <p>Selected: {selectedEmojis.join(" ")}</p>
    </>
  );
}