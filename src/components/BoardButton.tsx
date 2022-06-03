import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { GameState, Player } from "../types";
import { Circle, X } from "react-bootstrap-icons";
import { useBoard } from "../hooks/useBoard";

interface Props {
  board: ReturnType<typeof useBoard>;
  row: Player | null;
  idx: number;
}

const PLAYER_ICONS = {
  [Player.Player]: <X width={90} height={90} />,
  [Player.Computer]: <Circle width={60} height={60} />,
};

export function BoardButton({ board, idx, row }: Props) {
  const controls = useAnimation();
  const shouldPositionAnimate = board.state.winner?.positions.includes(idx);

  React.useEffect(() => {
    controls.mount();

    if (shouldPositionAnimate) {
      controls.start({ scale: [1, 1.5, 1], transition: { duration: 0.3, ease: "easeInOut" } });
    }
  }, [controls, shouldPositionAnimate]);

  React.useEffect(() => {
    if (row !== null) {
      controls.start({ scale: [1, 1.2, 1], transition: { duration: 0.3, ease: "easeInOut" } });
    }
  }, [row, controls]);

  return (
    <button
      onClick={() => board.setPosition(idx)}
      className="board-button"
      data-row-item={idx}
      data-disabled={board.state.gameState === GameState.Ended}
    >
      {row ? (
        <motion.span style={{ display: "block" }} animate={controls}>
          {PLAYER_ICONS[row]}
        </motion.span>
      ) : (
        <span className="button-current-player">
          {board.state.currentPlayer ? PLAYER_ICONS[board.state.currentPlayer] : null}
        </span>
      )}
    </button>
  );
}
