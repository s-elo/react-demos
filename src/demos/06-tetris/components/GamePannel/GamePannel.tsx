import React from "react";
import { useSelector } from "react-redux";
import { selectPannel } from "../../pannelSlice";
import "./GamePannel.less";

export default function GamePannel() {
  const { pannel, pannelHeight, pannelWidth } = useSelector(selectPannel);

  return (
    <div
      className="game-container"
      style={{ width: `${pannelWidth}px`, height: `${pannelHeight}px` }}
    >
      {pannel.map((row, idx) => (
        <p className="row" key={idx}>
          {row.map(({ isActive, isCancelling }, idx) => (
            <b
              className={`block ${isActive ? "active-block" : ""} ${
                isCancelling && isActive === false ? "cancelled-block" : ""
              }`}
              key={idx}
            ></b>
          ))}
        </p>
      ))}
    </div>
  );
}
