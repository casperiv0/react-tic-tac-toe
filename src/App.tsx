import { useBoard } from "./hooks/useBoard";
import { BoardButton } from "./components/BoardButton";
import { ScoreBoard } from "./components/ScoreBoard";
import { WinLine } from "./components/WinLine";

function App() {
  const board = useBoard();

  return (
    <>
      <div onClick={board.resetGame} className="board">
        {board.rows.map((row, idx) => {
          return <BoardButton row={row} idx={idx} key={idx} />;
        })}

        <WinLine />
      </div>

      <ScoreBoard />
    </>
  );
}

export default App;
