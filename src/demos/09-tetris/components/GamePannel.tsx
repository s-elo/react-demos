import React from "react";
import "./GamePannel.less";

const pannelWidth = 294;
const pannelHeight = 404;

const pannel: { isBlock: boolean }[][] = new Array(~~(pannelHeight / 22)).fill(
  new Array(~~(pannelWidth / 22)).fill({
    isBlock: false,
  })
);
export default function GamePannel() {
  return (
    <div
      className="game-container"
      style={{ width: `${pannelWidth}px`, height: `${pannelHeight}px` }}
    >
      {pannel.map((row, idx) => (
        <p className="row" key={idx}>
          {row.map(({ isBlock }, idx) => (
            <b
              className={`block ${isBlock ? "active-block" : ""}`}
              key={idx}
            ></b>
          ))}
        </p>
      ))}
    </div>
  );
}
