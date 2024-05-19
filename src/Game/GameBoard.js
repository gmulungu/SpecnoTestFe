import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import {createGame, makeMove} from "../api";

function GameBoard({ playerOneName, playerTwoName }) {
  const hasRunRef = useRef(false);

  const [cardsArray, setCardsArray] = useState([]);
  const [moves, setMoves] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [playerScores, setPlayerScores] = useState({ [playerOneName]: 0, [playerTwoName]: 0 });
  const [newGameData, setNewGameData] = useState();

  async function createNewGameData() {
    const newGameResponse = await createGame(playerOneName, playerTwoName);

    setNewGameData(newGameResponse);
  }

  useEffect( () => {
    const loadNewGame = async() => {
      if (hasRunRef.current) return;
      hasRunRef.current = true;
      newGame();
    }

    loadNewGame();
  }, [newGameData, cardsArray]);

  async function newGame() {
    await createNewGameData();
    setCardsArray(newGameData?.cards || []);
    setMoves(0);
    setSelectedCards([]);
    setCurrentPlayerIndex(0);
    setPlayerScores({ [playerOneName]: 0, [playerTwoName]: 0 });
  }

  async function handleSelectedCards(item) {
    if (selectedCards.length < 2) {
      setSelectedCards(prevSelectedCards => [...prevSelectedCards, item]);
    }
  }

  useEffect(() => {
    const handleSelectedCards = async() => {

      console.log(selectedCards);

      if (selectedCards.length === 2) {
        const [firstCard, secondCard] = selectedCards;
        const currentPlayer = currentPlayerIndex === 0 ? 'player1' : 'player2';

        const payload = {
          gameId: newGameData.gameId,
          player:  currentPlayer,
          cardIdOne: firstCard.id,
          cardIdTwo: secondCard.id
        };

        const moveResponse = await makeMove(payload);

        setNewGameData(moveResponse);

        setPlayerScores(prevScores => {
          const currentPlayerName = currentPlayerIndex === 0 ? playerOneName : playerTwoName;
          return { ...prevScores, [currentPlayerName]: moveResponse[currentPlayer].score };
        });

        setTimeout(() => {
          removeSelection();
        }, 800);
      }
    };

    handleSelectedCards();
  }, [selectedCards]);

  function removeSelection() {
    setSelectedCards([]);
    setMoves(prevValue => prevValue + 1);
    setCurrentPlayerIndex(prevIndex => (prevIndex + 1) % 2);
  }

  return (
      <div className="container">
        <div className="header">
          <h1>Memory Card Game - {currentPlayerIndex === 0 ? playerOneName : playerTwoName}'s Turn</h1>
        </div>
        { newGameData ? (
              <div className="board">
                {newGameData.cards?.map(item => (
                    <Card
                        key={item.id}
                        item={item}
                        handleSelectedCards={handleSelectedCards}
                        toggled={
                            item === selectedCards[0] || item === selectedCards[1]
                        }
                        stopflip={selectedCards.length === 2}
                    />
                ))}
              </div>
            ) : (
            <p>Loading...</p>
        )}
        <div className="scores">
          <div className="player-score">
            <div className="player-info">
              <img src="/static/media/Player One.3d2c345e197e1d6fec20.png" alt="Player One" />
              <span>{playerOneName}: {playerScores[playerOneName]}</span>
            </div>
            <div>{playerTwoName}: {playerScores[playerTwoName]}</div>
          </div>
        </div>
        <div className="comments">Moves : {moves}</div>
        <button className="button" onClick={newGame}>
          New Game
        </button>
      </div>
  );
}

export default GameBoard;
