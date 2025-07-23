import React, { useState } from 'react';
import './App.css';

/**
 * Minimalistic Tic Tac Toe React app.
 * - Centers board and status
 * - Light, accent, and secondary colors per spec
 * - Interactive: two-player, win/draw detection, board reset
 */

// Color/theme constants
const COLORS = {
  accent: '#f39c12',
  primary: '#2980b9',
  secondary: '#27ae60',
};

// --- Components ---

// PUBLIC_INTERFACE
function Square({ value, onClick, highlight }) {
  /** Single cell of the Tic Tac Toe board. */
  return (
    <button
      className={`ttt-square${highlight ? ' highlight' : ''}`}
      onClick={onClick}
      tabIndex={0}
      aria-label={value ? `Occupied by ${value}` : 'Empty'}
    >
      {value}
    </button>
  );
}

// PUBLIC_INTERFACE
function Board({ squares, onSquareClick, winningLine }) {
  /** 3x3 Board grid */
  // Compose board as 3 rows of 3 squares
  function renderSquare(i) {
    const highlight = winningLine && winningLine.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onSquareClick(i)}
        highlight={highlight}
      />
    );
  }

  return (
    <div className="ttt-board">
      {[0, 1, 2].map(row =>
        <div className="ttt-board-row" key={row}>
          {[0, 1, 2].map(col => renderSquare(row * 3 + col))}
        </div>
      )}
    </div>
  );
}

// --- Game Logic Utilities ---

// PUBLIC_INTERFACE
function calculateWinner(squares) {
  /**
   * Returns [winner, winning line array] or [null, null]
   * Winner is "X" or "O".
   */
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],    // rows
    [0,3,6],[1,4,7],[2,5,8],    // cols
    [0,4,8],[2,4,6],            // diagonals
  ];
  for (let line of lines) {
    const [a,b,c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[b] === squares[c]
    ) {
      return [squares[a], line];
    }
  }
  return [null, null];
}

function isBoardFull(squares) {
  return squares.every(Boolean);
}

// --- Main Game Component ---

// PUBLIC_INTERFACE
function App() {
  /**
   * Main entrypoint for the Tic Tac Toe game.
   * Renders the layout, manages state, and game logic.
   */
  // Board is length-9: [null,"X","O",...]
  const [squares, setSquares] = useState(Array(9).fill(null));
  // X always goes first
  const [xIsNext, setXIsNext] = useState(true);

  const [winner, winningLine] = calculateWinner(squares);
  const draw = !winner && isBoardFull(squares);

  // PUBLIC_INTERFACE
  function handleSquareClick(i) {
    if (squares[i] || winner) return; // Do not allow move if occupied or finished
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  // Status bar label
  let status;
  if (winner) {
    status = (
      <span>
        <span style={{ color: COLORS.secondary, fontWeight: 500 }}>Winner:</span>{' '}
        <span style={{ color: COLORS.accent, fontWeight: 700 }}>{winner}</span>
      </span>
    );
  } else if (draw) {
    status = (
      <span style={{ color: COLORS.secondary, fontWeight: 600 }}>It&apos;s a draw!</span>
    );
  } else {
    status = (
      <span>
        Next Player:
        {' '}
        <span
          style={{
            color: xIsNext ? COLORS.primary : COLORS.accent,
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          {xIsNext ? 'X' : 'O'}
        </span>
      </span>
    );
  }

  return (
    <div
      className="ttt-app"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#fff', // light theme
        color: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Status Bar */}
      <div className="ttt-statusbar" style={{
        marginBottom: 24,
        fontSize: 24,
        textAlign: 'center',
        minHeight: 36,
        fontFamily: 'system-ui, sans-serif',
        letterSpacing: 0.4,
      }}>
        {status}
      </div>

      {/* Board */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Board squares={squares} onSquareClick={handleSquareClick} winningLine={winningLine} />
      </div>

      {/* Reset Button */}
      <button
        className="ttt-reset-btn"
        onClick={handleReset}
        style={{
          marginTop: 32,
          backgroundColor: COLORS.primary,
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontSize: 18,
          fontWeight: 500,
          letterSpacing: 0.5,
          padding: '12px 32px',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: '0 2px 8px rgba(44, 62, 80, 0.08)',
          transition: 'background 0.2s',
        }}
        aria-label="Reset Game"
      >
        Reset
      </button>
      {/* Attribution (optional, minimal footer) */}
      <footer style={{
        fontSize: 13,
        color: '#bbb',
        marginTop: 40,
        letterSpacing: 0.1,
        fontWeight: 400,
        opacity: 0.80,
      }}>
        © Tic Tac Toe Web Game
      </footer>
    </div>
  );
}

export default App;

