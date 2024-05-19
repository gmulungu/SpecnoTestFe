// WelcomeScreen.js
import React, { useState } from "react";

function WelcomeScreen({ startGame }) {
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");

  const handleStartGame = async() => {
    // Ensure both player names are entered before starting the game
    if (playerOneName && playerTwoName) {
      startGame(playerOneName, playerTwoName);
    } else {
      // Display an alert or message to inform users to enter both names
      alert("Please enter both player names!");
    }
  };

  return (
    <div className="welcome-screen">
      <h1 >Memory</h1>
      <h2>Are you ready to play?</h2>
      <div className="input-section">
        <label>
          Player One Name:
          <input
            type="text"
            value={playerOneName}
            onChange={(e) => setPlayerOneName(e.target.value)}
          />
        </label>
        <label>
          Player Two Name:
          <input
            type="text"
            value={playerTwoName}
            onChange={(e) => setPlayerTwoName(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
}

export default WelcomeScreen;
