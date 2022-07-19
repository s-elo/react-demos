import { BlockStates, BlockShapes, RotateStates, StartPos } from "./type";

export const getActivePos = (
  { row, col }: StartPos,
  blockState: BlockStates,
  isFilter = true
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
  } else if (blockState === "JU") {
    pos = [
      { row: row + 1, col },
      { row: row + 2, col },
      { row: row + 2, col: col + 1 },
      { row: row + 2, col: col + 2 },
    ];
  } else if (blockState === "JD") {
    pos = [
      { row: row + 1, col },
      { row: row + 1, col: col + 1 },
      { row: row + 1, col: col + 2 },
      { row: row + 2, col: col + 2 },
    ];
  } else if (blockState === "JL") {
    pos = [
      { row: row + 2, col },
      { row, col: col + 1 },
      { row: row + 1, col: col + 1 },
      { row: row + 2, col: col + 1 },
    ];
  } else if (blockState === "JR") {
    pos = [
      { row, col: col + 1 },
      { row, col: col + 2 },
      { row: row + 1, col: col + 1 },
      { row: row + 2, col: col + 1 },
    ];
  } else if (blockState === "TU") {
    pos = [
      { row: row + 1, col: col + 1 },
      { row: row + 2, col },
      { row: row + 2, col: col + 1 },
      { row: row + 2, col: col + 2 },
    ];
  } else if (blockState === "TD") {
    pos = [
      { row: row + 1, col },
      { row: row + 1, col: col + 1 },
      { row: row + 1, col: col + 2 },
      { row: row + 2, col: col + 1 },
    ];
  } else if (blockState === "TL") {
    pos = [
      { row, col: col + 1 },
      { row: row + 1, col },
      { row: row + 1, col: col + 1 },
      { row: row + 2, col: col + 1 },
    ];
  } else if (blockState === "TR") {
    pos = [
      { row, col: col + 1 },
      { row: row + 1, col: col + 2 },
      { row: row + 1, col: col + 1 },
      { row: row + 2, col: col + 1 },
    ];
  } else if (blockState === "SU") {
    pos = [
      { row: row + 1, col: col + 1 },
      { row: row + 1, col: col + 2 },
      { row: row + 2, col },
      { row: row + 2, col: col + 1 },
    ];
  } else if (blockState === "SL") {
    pos = [
      { row, col },
      { row: row + 1, col },
      { row: row + 1, col: col + 1 },
      { row: row + 2, col: col + 1 },
    ];
  } else if (blockState === "ZU") {
    pos = [
      { row: row + 1, col: col + 1 },
      { row: row + 1, col },
      { row: row + 2, col: col + 2 },
      { row: row + 2, col: col + 1 },
    ];
  } else if (blockState === "ZR") {
    pos = [
      { row: row + 1, col: col + 1 },
      { row, col: col + 2 },
      { row: row + 1, col: col + 2 },
      { row: row + 2, col: col + 1 },
    ];
  } else if (blockState === "IU") {
    pos = [
      { row: row + 2, col },
      { row: row + 2, col: col + 1 },
      { row: row + 2, col: col + 2 },
      { row: row + 2, col: col + 3 },
    ];
  } else if (blockState === "IL") {
    pos = [
      { row, col: col + 2 },
      { row: row + 1, col: col + 2 },
      { row: row + 2, col: col + 2 },
      { row: row + 3, col: col + 2 },
    ];
  } else if (blockState === "OU") {
    pos = [
      { row: row + 1, col: col + 1 },
      { row: row + 1, col: col + 2 },
      { row: row + 2, col: col + 1 },
      { row: row + 2, col: col + 2 },
    ];
  } else if (blockState === "B") pos = [];

  // only show the valid part
  return isFilter ? pos.filter(({ row, col }) => row >= 0 && col >= 0) : pos;
};

export const rotateFsm = (blockState: BlockStates): BlockStates => {
  const blockShape = blockState[0] as BlockShapes;
  const rotateState = blockState[1] as RotateStates;

  if (blockShape === "L") {
    if (rotateState === "U") return "LL";
    if (rotateState === "D") return "LR";
    if (rotateState === "L") return "LD";
    if (rotateState === "R") return "LU";
  }

  if (blockShape === "J") {
    if (rotateState === "U") return "JL";
    if (rotateState === "D") return "JR";
    if (rotateState === "L") return "JD";
    if (rotateState === "R") return "JU";
  }

  if (blockShape === "T") {
    if (rotateState === "U") return "TL";
    if (rotateState === "D") return "TR";
    if (rotateState === "L") return "TD";
    if (rotateState === "R") return "TU";
  }

  if (blockShape === "S") {
    if (rotateState === "U") return "SL";
    if (rotateState === "L") return "SU";
  }

  if (blockShape === "Z") {
    if (rotateState === "U") return "ZR";
    if (rotateState === "R") return "ZU";
  }

  if (blockShape === "I") {
    if (rotateState === "U") return "IL";
    if (rotateState === "L") return "IU";
  }

  if (blockShape === "O") {
    return "OU";
  }

  return "B";
};
