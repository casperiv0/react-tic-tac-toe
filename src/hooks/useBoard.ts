import { Board, BoardStore, GameState, Player, WinItem, Winner } from "../types";
import create from "zustand";

const DEFAULT_BOARD: Board = [null, null, null, null, null, null, null, null, null];

const POSSIBLE_WINS: WinItem[] = [
  { indices: [0, 1, 2], style: { rotate: 0, left: "5%", top: `${125 / 2}px`, width: "90%" } },
  { indices: [3, 4, 5], style: { rotate: 0, left: "5%", top: "49%", width: "90%" } },
  { indices: [6, 7, 8], style: { rotate: 0, left: "5%", top: "82.5%", width: "90%" } },
  { indices: [0, 3, 6], style: { rotate: 90, left: "17%", top: "5%", width: "90%" } },
  { indices: [1, 4, 7], style: { rotate: 90, left: "50.5%", top: "5%", width: "90%" } },
  { indices: [2, 5, 8], style: { rotate: 90, left: "84%", top: "5%", width: "90%" } },
  { indices: [0, 4, 8], style: { rotate: 45, left: "8%", top: "7%", width: "120%" } },
  { indices: [2, 4, 6], style: { rotate: -45, left: "6%", top: "93%", width: "120%" } },
];

const useBoardStore = create<BoardStore>((set) => ({
  board: DEFAULT_BOARD,
  setBoard: (board) => set({ board }),

  count: { computer: 0, player: 0, ties: 0 },
  setCount: (count) => set({ count }),

  currentPlayer: Player.Player,
  setCurrentPlayer: (currentPlayer) => set({ currentPlayer }),

  gameState: GameState.Playing,
  setGameState: (gameState) => set({ gameState }),

  winner: null,
  setWinner: (winner) => set({ winner }),
}));

export function useBoard() {
  const boardStore = useBoardStore();

  function findWinner({ board, gameEnded }: { board: Board; gameEnded: boolean }) {
    if (!boardStore.currentPlayer) return null;

    let winner: Winner | null = null;

    for (let i = 0; i < POSSIBLE_WINS.length; i++) {
      const possibleWinArr = POSSIBLE_WINS[i];
      let count = 0;

      for (let j = 0; j < possibleWinArr.indices.length; j++) {
        const item = board.at(possibleWinArr.indices[j]);

        if (item === boardStore.currentPlayer) {
          count += 1;
        }
      }

      if (count === 3) {
        winner = { player: boardStore.currentPlayer, winItem: possibleWinArr };
        break;
      } else {
        winner = null;
      }
    }

    if (winner) {
      boardStore.setCount({
        ...boardStore.count,
        [boardStore.currentPlayer]: boardStore.count[boardStore.currentPlayer] + 1,
      });
    } else if (gameEnded) {
      boardStore.setCount({
        ...boardStore.count,
        ties: boardStore.count.ties + 1,
      });
    }

    if (!winner) {
      return null;
    }

    return winner;
  }

  function setPosition(position: number) {
    if (isPositionAlreadyInUse(position)) return;
    if (hasGameEnded(boardStore.board)) return;

    const newBoard = [...boardStore.board];
    newBoard[position] = boardStore.currentPlayer;
    boardStore.setBoard(newBoard);

    const gameEnded = hasGameEnded(newBoard);
    const winner = findWinner({ board: newBoard, gameEnded });

    if (gameEnded || winner) {
      boardStore.setCurrentPlayer(null);
      boardStore.setGameState(GameState.Ended);
      boardStore.setWinner(winner);
    } else {
      boardStore.setCurrentPlayer(
        boardStore.currentPlayer === Player.Player ? Player.Computer : Player.Player,
      );
    }
  }

  function resetGame() {
    if (boardStore.gameState !== GameState.Ended) return;

    const newPlayer = boardStore.winner?.player === Player.Player ? Player.Computer : Player.Player;
    boardStore.setWinner(null);
    boardStore.setCurrentPlayer(newPlayer);

    boardStore.setGameState(GameState.Playing);
    boardStore.setBoard(DEFAULT_BOARD);
  }

  function hasGameEnded(board: Board) {
    const ended = board.every((row) => row !== null) || boardStore.gameState === GameState.Ended;
    return ended;
  }

  function isPositionAlreadyInUse(position: number) {
    const item = boardStore.board[position];
    return Boolean(item);
  }

  const state = {
    count: boardStore.count,
    winner: boardStore.winner,
    gameState: boardStore.gameState,
    currentPlayer: boardStore.currentPlayer,
  };

  return {
    rows: boardStore.board,
    state,
    resetGame,
    setPosition,
    isPositionAlreadyInUse,
  };
}
