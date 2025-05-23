import React from "react";

export default function FrontPage({ onStart }) {
  return (
    <>
      <h1>Welcome to Blink Tac Toe! 🎮</h1>
      <p>Choose your favorite emojis and battle it out in this fun twist on Tic-Tac-Toe!</p>
      <button onClick={onStart}>Start Game</button>
      {/* <div className="emoji-decor">🍎</div>
      <div className="emoji-decor">🐶</div>
      <div className="emoji-decor">⚽️</div>
      <div className="emoji-decor">🍉</div> */}
    </>
  );
}