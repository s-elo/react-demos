export type BlockShapes = "L" | "J" | "T" | "S" | "Z" | "O" | "I" | "B";
export type GameStates =
  | "DROPPING"
  | "CANCELLING"
  | "CANCELLED"
  | "PAUSING"
  | "RESTARTING";
export type GameLevel = "kid" | "adult" | "elder" | "genius";
export type DefaultPannel = {
  pannelWidth: number;
  pannelHeight: number;
  maxRow: number;
  maxCol: number;
  pannel: {
    isActive: boolean;
    isCancelling: boolean;
  }[][];
  curDropState: BlockStates;
  curStartPos: StartPos;
  curDropPos: {
    row: number;
    col: number;
  }[];
  gameState: GameStates;
  lastCancelledRow: number;
  topCancelledRow: number;
  record: number;
  level: GameLevel;
  score: number;
};
export type SetActivePayload = {
  row: number;
  col: number;
}[];
export type SetDropBlock = {
  startPos: StartPos;
  activePos: SetActivePayload;
  dropState?: BlockStates;
  clearPrev?: boolean;
};

export type Operations =
  | "LEFT"
  | "RIGHT"
  | "DOWN"
  | "ROTATE"
  | "FAST_DOWN"
  | "DROP";

export type StartPos = { row: number; col: number };

export type BlockStates =
  | "LU"
  | "LD"
  | "LL"
  | "LR"
  | "JU"
  | "JD"
  | "JL"
  | "JR"
  | "TU"
  | "TD"
  | "TL"
  | "TR"
  | "SU"
  | "SL"
  | "ZU"
  | "ZR"
  | "IU"
  | "IL"
  | "OU"
  | "B";
export type RotateStates = "U" | "D" | "L" | "R";
