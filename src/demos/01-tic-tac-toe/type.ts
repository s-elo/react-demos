import React from "react";

export type SquareProps = {
  value: "X" | "O" | null;
  squareClick: React.MouseEventHandler<HTMLButtonElement>;
};

export type BoardProps = {
  square: Array<SquareProps["value"]>;
  handleClickOnBoard: (pos: number) => void;
};

export type GameProps = {};

export type GameStates = {
  history: Array<{
    squares: Array<SquareProps["value"]>;
  }>;
  xIsNext: boolean;
  stepNumber: number;
};
