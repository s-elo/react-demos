export type DefaultPannel = {
  pannelWidth: number;
  pannelHeight: number;
  maxRow: number;
  maxCol: number;
  pannel: {
    isActive: boolean;
  }[][];
  curShape: "L" | "J" | "T" | "S" | "Z" | "SQUARE" | "STICK" | "BLANK";
  dropBlocks: {
    row: number;
    col: number;
  }[];
};
export type SetActivePayload = {
  row: number;
  col: number;
}[];

export type Operations = "LEFT" | "RIGHT" | "DOWN" | "ROTATE";

export type StartPos = { row: number; col: number };
