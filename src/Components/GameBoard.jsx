import React from "react";

export default function GameBoard({
  board,
  currentPlayer,
  player1Emojis,
  player2Emojis,
  playerMoveCount,
  winner,
  onPlaceEmoji,
}) {
  function handleCellClick(index) {
    if (winner || board[index] !== null) return;
    const currentPlayerEmojis = currentPlayer === 1 ? player1Emojis : player2Emojis;
    const currentMoveCount = playerMoveCount[currentPlayer];
    const emojiToPlace = currentPlayerEmojis[currentMoveCount % 3];
    onPlaceEmoji(index, emojiToPlace);
  }

  // function handleDragStart(e, emoji) {
  //   e.dataTransfer.setData("text/plain", emoji);
  //   e.target.classList.add("dragging");
  // }

  // function handleDragEnd(e) {
  //   e.target.classList.remove("dragging");
  // }

  function handleDragOver(e) {
    e.preventDefault();
    e.target.classList.add("drop-target");
  }

  function handleDragLeave(e) {
    e.target.classList.remove("drop-target");
  }

  function handleDrop(e, index) {
    e.preventDefault();
    e.target.classList.remove("drop-target");
    if (winner || board[index] !== null) return;

    const emoji = e.dataTransfer.getData("text/plain");
    const currentPlayerEmojis = currentPlayer === 1 ? player1Emojis : player2Emojis;
    const currentMoveCount = playerMoveCount[currentPlayer];
    const emojiToPlace = currentPlayerEmojis[currentMoveCount % 3];

    if (emoji !== emojiToPlace) return;
    onPlaceEmoji(index, emoji);
  }

  return (
    <>
      <h2>Game Start</h2>
      <p>
        Current turn: {winner ? "Game Over" : `Player ${currentPlayer} (${(currentPlayer === 1 ? player1Emojis : player2Emojis)[playerMoveCount[currentPlayer] % 3]})`}
      </p>
      {/* <div className="emojis">
        <button
          draggable
          onDragStart={(e) => handleDragStart(e, (currentPlayer === 1 ? player1Emojis : player2Emojis)[playerMoveCount[currentPlayer] % 3])}
          onDragEnd={handleDragEnd}
          disabled={winner}
        >
          {(currentPlayer === 1 ? player1Emojis : player2Emojis)[playerMoveCount[currentPlayer] % 3]}
        </button>
      </div> */}
      <div className="board">
        {board.map((cell, idx) => (
          <button
            key={idx}
            className="cell"
            onClick={() => handleCellClick(idx)}
            disabled={cell !== null || winner !== null}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, idx)}
            aria-label={`Cell ${idx + 1}`}
          >
            {cell}
          </button>
        ))}
      </div>
      <p>
        Player 1 emojis: {player1Emojis.join(" ")} | Player 2 emojis: {player2Emojis.join(" ")}
      </p>
    </>
  );
}