import "./App.css"; 
import React, { useState } from "react";
import WelcomeScreen from "./Game/WelcomeScreen";
import GameBoard from "./Game/GameBoard";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");

  const startGame = (playerOneName, playerTwoName) => {
    setPlayerOneName(playerOneName);
    setPlayerTwoName(playerTwoName);
    setGameStarted(true);
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <WelcomeScreen startGame={startGame} />
      ) : (
        <GameBoard playerOneName={playerOneName} playerTwoName={playerTwoName} />
      )}
    </div>
  );
}

export default App;
