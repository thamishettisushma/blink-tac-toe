import React from "react";

function HelpPage({ onStart }) {
  const instructions = [
    "Select a category and choose 3 emojis per player.",
    "Players take turns placing emojis on the 3x3 grid.",
    "Only the latest 3 emojis are active for each player (FIFO rule).",
    "First to align 3 of their emojis wins. No draws allowed!",
    "Players cannot place emojis on occupied grid spaces.",
    "Use strategy to block your opponent’s winning moves.",
    
  ];

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md text-left help">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text">
        How to Play
      </h2>
      <div className="space-y-4">
        {instructions.map((rule, index) => (
          <p key={index} className="text-gray-800 leading-relaxed flex items-start">
            <span className="mr-4 text-indigo-600 font-bold select-none text-2xl">→</span>
            <span className="text-base">{rule}</span>
          </p>
        ))}
      </div>
      <div className="mt-8 flex justify-start text">
        <button
          onClick={onStart}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition button-outline"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default HelpPage;
