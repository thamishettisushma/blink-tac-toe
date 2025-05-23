import React, { useState } from "react";
import FrontPage from "./Components/FrontPage";
import EmojiSelector from "./Components/EmojiSelector";
import CategorySelector from "./Components/CategorySelector";
import GameBoard from "./Components/GameBoard";
import WinnerDialog from "./Components/WinnerDialog";
import "./App.css";

// const emojiCategories = {
//   Fruits: ["🍎", "🍌", "🍇", "🍉", "🍓", "🍍", "🥭", "🍒", "🍑"],
//   Animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨"],
//   Sports: ["⚽️", "🏀", "🏈", "⚾️", "🎾", "🏐", "🏉", "🥏", "🏓"],
// };

const emojiCategories = {
  Fruits: ["🍎", "🍌", "🍇", "🍉", "🍓", "🍍", "🥭", "🍒", "🍑"],
  Animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨"],
  Sports: ["⚽️", "🏀", "🏈", "⚾️", "🎾", "🏐", "🏉", "🥏", "🏓"],
  Food: ["🍕", "🍔", "🍟", "🌮", "🍣", "🥐", "🍦", "🍰", "🥗"],
  Weather: ["☀️", "🌧️", "⛈️", "🌞", "🌙", "⭐", "🌈", "❄️", "🌪️"],
  Vehicles: ["🚗", "🚲", "✈️", "🚂", "🚌", "🚤", "🚀", "🚁", "🛴"],
  Music: ["🎵", "🎶", "🎤", "🎸", "🥁", "🎹", "🎻", "🎧", "🎺"],
  Nature: ["🌳", "🌸", "🌻", "🌴", "🌵", "🍂", "🌊", "🏔️", "🌋"]
};

const winningLines = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6],
];

export default function BlinkTacToe() {
  const [view, setView] = useState("front");
  const [step, setStep] = useState(1);
  const [player1Category, setPlayer1Category] = useState("");
  const [player2Category, setPlayer2Category] = useState("");
  const [player1Emojis, setPlayer1Emojis] = useState([]);
  const [player2Emojis, setPlayer2Emojis] = useState([]);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player1Positions, setPlayer1Positions] = useState([]);
  const [player2Positions, setPlayer2Positions] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerMoveCount, setPlayerMoveCount] = useState({ 1: 0, 2: 0 });
  const [winner, setWinner] = useState(null);

  const player2AvailableCategories = Object.keys(emojiCategories).filter(
    (cat) => cat !== player1Category
  );

  function handleCategorySelect(player, category) {
    if (player === 1) {
      setPlayer1Category(category);
      setStep(2);
    } else {
      setPlayer2Category(category);
      setStep(4);
    }
  }

  function handleEmojiSelect(player, emoji) {
    if (player === 1) {
      if (player1Emojis.includes(emoji) || player1Emojis.length >= 3) return;
      const newEmojis = [...player1Emojis, emoji];
      setPlayer1Emojis(newEmojis);
      if (newEmojis.length === 3) setStep(3);
    } else {
      if (player2Emojis.includes(emoji) || player2Emojis.length >= 3) return;
      const newEmojis = [...player2Emojis, emoji];
      setPlayer2Emojis(newEmojis);
      if (newEmojis.length === 3) setStep(5);
    }
  }

  function checkGameWinner(newBoard) {
    for (let line of winningLines) {
      const [a, b, c] = line;
      const cellA = newBoard[a];
      const cellB = newBoard[b];
      const cellC = newBoard[c];

      if (cellA && cellB && cellC) {
        if (
          player1Emojis.includes(cellA) &&
          player1Emojis.includes(cellB) &&
          player1Emojis.includes(cellC)
        ) {
          return "Player 1";
        }
        if (
          player2Emojis.includes(cellA) &&
          player2Emojis.includes(cellB) &&
          player2Emojis.includes(cellC)
        ) {
          return "Player 2";
        }
      }
    }

    if (newBoard.every((cell) => cell !== null)) return "Draw";

    return null;
  }

  function handlePlaceEmoji(index, emoji) {
    const currentPlayerEmojis = currentPlayer === 1 ? player1Emojis : player2Emojis;
    const currentPlayerPositions = currentPlayer === 1 ? player1Positions : player2Positions;
    const currentMoveCount = playerMoveCount[currentPlayer];

    let newBoard = [...board];
    let newPositions = [...currentPlayerPositions];

    if (newPositions.length === 3) {
      const oldestPos = newPositions[0];
      newBoard[oldestPos] = null;
      newPositions = newPositions.slice(1);
    }

    newBoard[index] = emoji;
    newPositions.push(index);

    setBoard(newBoard);
    if (currentPlayer === 1) setPlayer1Positions(newPositions);
    else setPlayer2Positions(newPositions);

    setPlayerMoveCount((prev) => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] + 1,
    }));

    const result = checkGameWinner(newBoard);
    if (result) {
      setWinner(result);
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  }

  function resetGame() {
    setStep(1);
    setPlayer1Category("");
    setPlayer2Category("");
    setPlayer1Emojis([]);
    setPlayer2Emojis([]);
    setBoard(Array(9).fill(null));
    setPlayer1Positions([]);
    setPlayer2Positions([]);
    setCurrentPlayer(1);
    setPlayerMoveCount({ 1: 0, 2: 0 });
    setWinner(null);
    setView("front");
  }

  return (
    <div className={view === "front" ? "front-page" : "App"}>
      {view === "front" ? (
        <FrontPage onStart={() => setView("game")} />
      ) : (
        <>
          <h2>Blink Tac Toe</h2>
          {step === 1 && (
            <CategorySelector
              player={1}
              categories={Object.keys(emojiCategories)}
              selectedCategory={player1Category}
              onSelect={handleCategorySelect}
            />
          )}
          {step === 2 && (
            <EmojiSelector
              player={1}
              category={player1Category}
              emojis={emojiCategories[player1Category]}
              selectedEmojis={player1Emojis}
              onSelect={handleEmojiSelect}
            />
          )}
          {step === 3 && (
            <CategorySelector
              player={2}
              categories={player2AvailableCategories}
              selectedCategory={player2Category}
              onSelect={handleCategorySelect}
            />
          )}
          {step === 4 && (
            <EmojiSelector
              player={2}
              category={player2Category}
              emojis={emojiCategories[player2Category]}
              selectedEmojis={player2Emojis}
              onSelect={handleEmojiSelect}
            />
          )}
          {step === 5 && (
            <GameBoard
              board={board}
              currentPlayer={currentPlayer}
              player1Emojis={player1Emojis}
              player2Emojis={player2Emojis}
              playerMoveCount={playerMoveCount}
              winner={winner}
              onPlaceEmoji={handlePlaceEmoji}
            />
          )}
          {winner && <WinnerDialog winner={winner} onReset={resetGame} />}
        </>
      )}
    </div>
  );
}