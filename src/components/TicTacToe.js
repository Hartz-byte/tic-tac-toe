import React, { useState } from "react";

import "./styles.css";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepHistory, setStepHistory] = useState([Array(9).fill(null)]);

  const handleClick = (i) => {
    if (winner || board[i]) {
      return;
    }

    const newBoard = board.slice();
    newBoard[i] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setStepHistory(stepHistory.concat([newBoard]));
    setCurrentStep(stepHistory.length);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  const jumpTo = (step) => {
    setBoard(stepHistory[step]);
    setCurrentPlayer(step % 2 === 0 ? "X" : "O");
    setCurrentStep(step);
    setWinner(null);
  };

  const renderSquare = (i) => {
    return (
      <div className="square" onClick={() => handleClick(i)}>
        {board[i]}
      </div>
    );
  };

  const renderBoard = () => {
    return (
      <div className="board">
        <div className="row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setCurrentStep(0);
    setStepHistory([Array(9).fill(null)]);
  };

  const renderMoveList = () => {
    return (
      <div className="move-list">
        <h2>Move History</h2>
        {stepHistory.map((step, move) => {
          const desc = move ? `Go to move #${move}` : "Restart";
          return (
            <li key={move}>
              <button onClick={() => (move === 0 ? resetGame() : jumpTo(move))}>
                {desc}
              </button>
            </li>
          );
        })}
      </div>
    );
  };

  const checkWinner = (board) => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  return (
    <div className="container">
      <p className="text">tic-tac-toe</p>

      <div className="game">
        <div className="game-board">{renderBoard()}</div>
        <div className="game-info">
          <p>Next player: {currentPlayer}</p>
          {winner ? (
            <p className="winnerText">Winner: {winner}</p>
          ) : (
            <p>Game in progress</p>
          )}
          {renderMoveList()}
        </div>
      </div>

      {/* <p className="text">tic-tac-toe</p> */}
    </div>
  );
}

export default TicTacToe;
