import React from "react";

export default function WinnerDialog({ winner, onReset }) {
  return (
    <>
      <div className="winner-dialog-overlay"></div>
      <div className="winner-dialog">
        <h2>{winner === "Draw" ? "It's a Draw!" : `${winner} Wins! 🎉`}</h2>
        <button onClick={onReset}>Play Again</button>
      </div>
    </>
  );
}