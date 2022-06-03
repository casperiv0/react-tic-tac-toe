import * as React from "react";
import { Board, Counts, GameState, Player } from "../types";

const DEFAULT_BOARD: Board = [null, null, null, null, null, null, null, null, null];

const POSSIBLE_WINS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function useBoard() {
  const [board, setBoard] = React.useState(DEFAULT_BOARD);
  const [gameState, setGameState] = React.useState<GameState>(GameState.Playing);
  const [counts, setCounts] = React.useState<Counts>({ computer: 0, player: 0, ties: 0 });

  const [currentPlayer, setCurrentPlayer] = React.useState<Player | null>(Player.Player);
  const [winner, setWinner] = React.useState<{ player: Player; positions: number[] } | null>(null);

  function findWinner({ board, gameEnded }: { board: Board; gameEnded: boolean }) {
    if (!currentPlayer) return null;

    let winner: Player | null = null;
    let positions: number[] = [];

    for (let i = 0; i < POSSIBLE_WINS.length; i++) {
      const possibleWinArr = POSSIBLE_WINS[i];
      let count = 0;

      for (let j = 0; j < possibleWinArr.length; j++) {
        const item = board.at(possibleWinArr[j]);

        if (item === currentPlayer) {
          count += 1;
        }
      }

      if (count === 3) {
        winner = currentPlayer;
        positions = possibleWinArr;
        break;
      } else {
        winner = null;
      }
    }

    if (winner) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [currentPlayer]: prevCounts[currentPlayer] + 1,
      }));
    } else if (gameEnded) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        ties: prevCounts.ties + 1,
      }));
    }

    if (!winner) {
      return null;
    }

    return { player: winner, positions };
  }

  function setPosition(position: number) {
    if (isPositionAlreadyInUse(position)) return;
    if (gameState === GameState.Ended) return;

    const newBoard = [...board];
    newBoard[position] = currentPlayer;
    setBoard(newBoard);

    const gameEnded = hasGameEnded(newBoard);
    const winner = findWinner({ board: newBoard, gameEnded });

    if (gameEnded || winner) {
      setCurrentPlayer(null);
      setGameState(GameState.Ended);
      setWinner(winner);
    } else {
      setCurrentPlayer((prev) => {
        return prev === Player.Player ? Player.Computer : Player.Player;
      });
    }
  }

  function resetGame() {
    if (gameState !== GameState.Ended) return;

    const newPlayer = winner?.player === Player.Player ? Player.Computer : Player.Player;
    setWinner(null);
    setCurrentPlayer(newPlayer);

    setGameState(GameState.Playing);
    setBoard(DEFAULT_BOARD);
  }

  function hasGameEnded(board: Board) {
    const ended = board.every((row) => row !== null);
    return ended;
  }

  function isPositionAlreadyInUse(position: number) {
    const item = board[position];
    return Boolean(item);
  }

  const state = {
    counts,
    winner,
    gameState,
    currentPlayer,
  };

  return {
    rows: board,
    state,
    resetGame,
    setPosition,
    isPositionAlreadyInUse,
  };
}
