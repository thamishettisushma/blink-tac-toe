import React from "react";


function FrontPage({ onStart, onHelp }) {
  return (
    <div className="text-center p-6 space-y-4">
      <h1 className="text-4xl font-bold">Welcome to Blink Tac Toe! 🎮</h1>
      <p className="text-gray-600">Choose your favorite emojis and battle it out in this fun twist on Tic-Tac-Toe!</p>
      <div className="button-group">
  <button onClick={onStart}>Start Game</button>
  <button variant="outline" onClick={onHelp}>Help</button>
</div>

    </div>
  );
}

export default FrontPage;

