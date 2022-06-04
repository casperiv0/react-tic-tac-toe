export enum Player {
  Player = "player",
  Computer = "computer",
}

export enum GameState {
  Playing = "playing",
  Ended = "ended",
}

export interface GameCount {
  player: number;
  computer: number;
  ties: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Winner {
  player: Player;
  positions: number[];
}

export interface BoardStore {
  board: Board;
  setBoard(board: Board): void;

  gameState: GameState;
  setGameState(gameState: GameState): void;

  count: GameCount;
  setCount(counter: GameCount): void;

  currentPlayer: Player | null;
  setCurrentPlayer(currentPlayer: Player | null): void;

  winner: Winner | null;
  setWinner(winner: BoardStore["winner"]): void;
}

export type Board = (null | Player)[];
