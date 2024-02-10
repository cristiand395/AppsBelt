'use client'
import { useState } from "react"
import confetti from "canvas-confetti"
import "./index.css"

const TURNS: { [key: string]: string } = {
  O: 'o',
  X: 'x',
}

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

interface SquareProps {
  children?: React.ReactNode
  updateBoard?: (index: number) => void
  index?: number
  isSelected?: boolean
}
const Square = ({ children, updateBoard, index, isSelected }: SquareProps) => {
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div
      onClick={handleClick}
      className={`square ${isSelected ? 'is-selected' : ''}`}>
      {children}
    </div>
  )
}
export default function Page() {
  const [board, setBoard] = useState<string[]>(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')
    if (boardFromLocalStorage) return JSON.parse(boardFromLocalStorage)
    return Array(9).fill(null)
  })
  const [currentTurn, setCurrentTurn] = useState(() => {
    const currentTurnFromLocalStorage = window.localStorage.getItem('currentTurn')
    if (currentTurnFromLocalStorage) return JSON.parse(currentTurnFromLocalStorage)
    return TURNS.X
  })
  const [winner, setWinner] = useState<string | null | boolean>(null)

  const checkWinner = (boardToCheck: string[]) => {
    for (const line in WINNING_LINES) {
      const [a, b, c] = WINNING_LINES[line]
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
  }

  const checkEndGame = (newBoard: string[]) => {
    return newBoard.every(position => position !== null)
  }
  const updateBoard = (index: number) => {
    // If position is full or there is a winner, stop update
    if (board[index] || winner) return
    // Update board
    const newBoard = [...board]
    newBoard[index] = currentTurn
    setBoard(newBoard)
    // Change turn
    const newTurn = currentTurn === TURNS.X ? TURNS.O : TURNS.X
    setCurrentTurn(newTurn)
    // Save game on LocalStorage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('currentTurn', JSON.stringify(newTurn))
    // Check winner after update
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      const gameState = checkEndGame(newBoard)
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('currentTurn')
  }
  return (
    <main className="board">
      <h1 className="text--colors_primary">Tic-Tac-Toe</h1>
      <button onClick={resetGame} className="text-slate-950 dark:text-gray-300">Play Again</button>
      <section className="game">
        {
          board.map((position, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>
                {position}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={currentTurn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={currentTurn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false ? 'Draw' : `Winner is ${winner}`
                }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Play Again</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}