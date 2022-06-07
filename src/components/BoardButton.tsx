import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { GameState, Player } from "../types";
import { Circle, X } from "react-bootstrap-icons";
import { useBoard } from "../hooks/useBoard";

interface Props {
  row: Player | null;
  idx: number;
}

const PLAYER_ICONS = {
  [Player.Player]: <X width={90} height={90} />,
  [Player.Computer]: <Circle width={60} height={60} />,
};

export function BoardButton({ idx, row }: Props) {
  const controls = useAnimation();
  const board = useBoard();

  const shouldPositionAnimate = React.useMemo(
    () => board.state.winner?.winItem.indices.includes(idx),
    [board.state.winner], // eslint-disable-line
  );

  React.useEffect(() => {
    if (row !== null) {
      // animate when a player sets a position
      controls.start({ scale: [1, 1.2, 1], transition: { duration: 0.2, ease: "linear" } });
    }
  }, [row, controls]);

  React.useEffect(() => {
    if (shouldPositionAnimate) {
      // animate when the current element of the array is the winning position
      controls.start({ scale: [1, 1.5, 1], transition: { duration: 0.3, ease: "linear" } });
    }
  }, [controls, shouldPositionAnimate]);

  return (
    <button
      onClick={() => board.setPosition(idx)}
      className="board-button"
      data-row-item={idx}
      data-disabled={board.state.gameState === GameState.Ended}
    >
      {process.env.NODE_ENV === "development" ? <span className="index-item">{idx}</span> : null}
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
