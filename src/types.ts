export enum Player {
  Player = "player",
  Computer = "computer",
}

export enum GameState {
  Playing = "playing",
  Ended = "ended",
}

export interface Counts {
  player: number;
  computer: number;
  ties: number;
}

export interface Position {
  x: number;
  y: number;
}

export type Board = (null | Player)[];
