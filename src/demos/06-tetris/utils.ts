import { BlockStates, BlockShapes, RotateStates, StartPos } from "./type";

export const getActivePos = (
  { row, col }: StartPos,
  blockState: BlockStates
) => {
  // start pos is the left top pos of a square
  let pos: StartPos[] = [];

  if (blockState === "LU") {
    pos = [
      { row: row + 1, col: col + 2 },
      { row: row + 2, col },
      { row: row + 2, col: col + 1 },
      { row: row + 2, col: col + 2 },
    ];
  } else if (blockState === "LD") {
    pos = [
      { row: row + 1, col: col },
      { row: row + 1, col: col + 1 },
      { row: row + 1, col: col + 2 },
      { row: row + 2, col },
    ];
  } else if (blockState === "LL") {
    pos = [
      { row: row, col: col },
      { row: row, col: col + 1 },
      { row: row + 1, col: col + 1 },
      { row: row + 2, col: col + 1 },
    ];
  } else if (blockState === "LR") {
    pos = [
      { row: row, col: col + 1 },
      { row: row + 1, col: col + 1 },
      { row: row + 2, col: col + 1 },
      { row: row + 2, col: col + 2 },
    ];
  } else if (blockState === "BLANK") pos = [];

  // only show the valid part
  return pos.filter(({ row, col }) => row >= 0 && col >= 0);
};

export const rotateFsm = (blockState: BlockStates) => {
  const blockShape = blockState[0] as BlockShapes;
  const rotateState = blockState[1] as RotateStates;

  if (blockShape === "L") {
    if (rotateState === "U") return "LL";
    if (rotateState === "D") return "LR";
    if (rotateState === "L") return "LD";
    if (rotateState === "R") return "LU";
  }

  return "LU";
};
