import { useState } from "react";

function Square({ value, handleClick }) {
  return (
    <button className="border m-1 size-14 text-xl" onClick={handleClick}>
      {value}
    </button>
  );
}

function Board({ squares, isXNext, onPlay }) {
  const winner = calculateWinner(squares);

  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Nextplayer: ${isXNext ? "X" : "O"}`;
  }

  const handleClick = (i) => {
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = isXNext ? "X" : "O";
    onPlay(newSquares);
  };

  return (
    <>
      <h2 className="text-lg mb-4">{status}</h2>

      <div className="flex">
        <Square value={squares[0]} handleClick={() => handleClick(0)} />
        <Square value={squares[1]} handleClick={() => handleClick(1)} />
        <Square value={squares[2]} handleClick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} handleClick={() => handleClick(3)} />
        <Square value={squares[4]} handleClick={() => handleClick(4)} />
        <Square value={squares[5]} handleClick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} handleClick={() => handleClick(6)} />
        <Square value={squares[7]} handleClick={() => handleClick(7)} />
        <Square value={squares[8]} handleClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isXNext, setIsXNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentHistory = history[currentMove];

  const handlePlay = (squares) => {
    setIsXNext(!isXNext);
    const nextHistory = [...history.slice(0, currentMove + 1), squares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpMove = (move) => {
    setCurrentMove(move);

    setIsXNext(move % 2 === 0);
  };

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = `Go to move #${move}`;
    } else {
      description = "Go to game start";
    }

    return (
      <li className="mb-1 text-white bg-gray-500 p-1" key={move}>
        <button onClick={() => jumpMove(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="flex justify-center gap-10 mt-8">
      <div>
        <Board squares={currentHistory} isXNext={isXNext} onPlay={handlePlay} />
      </div>

      <div>
        <ol className="text-lg border border-gray-400 p-1">{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
