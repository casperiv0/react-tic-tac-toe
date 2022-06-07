import { motion } from "framer-motion";
import { useBoard } from "../hooks/useBoard";

export function WinLine() {
  const board = useBoard();
  const winner = board.state.winner;

  if (!winner) {
    return null;
  }

  return (
    <motion.div
      animate={{
        scale: [0, 1],
        transformOrigin: "top left",
        transition: { duration: 0.3 },
      }}
      style={{
        top: winner.winItem.style.top,
        left: winner.winItem.style.left,
        width: winner.winItem.style.width,
        rotate: `${winner.winItem.style.rotate}deg`,
        transform: `rotate(${winner.winItem.style.rotate}deg)`,
      }}
      className="win-line"
    />
  );
}
