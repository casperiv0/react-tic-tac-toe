import { useBoard } from "./hooks/useBoard";
import { BoardButton } from "./components/BoardButton";

function App() {
  const board = useBoard();

  return (
    <>
      <div onClick={board.resetGame} className="board">
        {board.rows.map((row, idx) => {
          return <BoardButton row={row} idx={idx} key={idx} board={board} />;
        })}
      </div>

      <div className="scores">
        <div className="scores-item">
          <h1>Player 1</h1>
          <h4>{board.state.counts.player}</h4>
        </div>
        <div className="scores-item">
          <h1>Player 2</h1>
          <h4>{board.state.counts.computer}</h4>
        </div>
        <div className="scores-item">
          <h1>Ties</h1>
          <h4>{board.state.counts.ties}</h4>
        </div>
      </div>
    </>
  );
}

export default App;
