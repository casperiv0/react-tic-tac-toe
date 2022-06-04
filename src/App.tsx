import { useBoard } from "./hooks/useBoard";
import { BoardButton } from "./components/BoardButton";
import { ScoreBoard } from "./components/ScoreBoard";

function App() {
  const board = useBoard();

  return (
    <>
      <div onClick={board.resetGame} className="board">
        {board.rows.map((row, idx) => {
          return <BoardButton row={row} idx={idx} key={idx} />;
        })}
      </div>

      <ScoreBoard />
    </>
  );
}

export default App;
