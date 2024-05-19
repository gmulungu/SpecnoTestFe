// WinnerScreen.js

import React from "react";

function WinnerScreen({ playerOneName, playerTwoName, playerScores }) {
  // Determine the winner based on the scores
  let winner;
  if (playerScores[playerOneName] > playerScores[playerTwoName]) {
    winner = playerOneName;
  } else if (playerScores[playerOneName] < playerScores[playerTwoName]) {
    winner = playerTwoName;
  } else {
    winner = "It's a tie!";
  }

  return (
    <div className="winner-screen">
      <h2>Winner: {winner}</h2>
      <p>
        {playerOneName}: {playerScores[playerOneName]} points
      </p>
      <p>
        {playerTwoName}: {playerScores[playerTwoName]} points
      </p>
    </div>
  );
}

export default WinnerScreen;
