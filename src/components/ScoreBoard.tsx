import { useBoard } from "../hooks/useBoard";

export function ScoreBoard() {
  const board = useBoard();

  return (
    <div className="scores">
      <div className="scores-item">
        <h1>Player 1</h1>
        <h4>{board.state.count.player}</h4>
      </div>
      <div className="scores-item">
        <h1>Player 2</h1>
        <h4>{board.state.count.computer}</h4>
      </div>
      <div className="scores-item">
        <h1>Ties</h1>
        <h4>{board.state.count.ties}</h4>
      </div>
    </div>
  );
}
