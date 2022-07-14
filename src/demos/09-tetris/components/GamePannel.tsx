import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPannel } from "../pannelSlice";
import { useControlBlock } from "../control";
import "./GamePannel.less";

export default function GamePannel() {
  const { pannel, pannelHeight, pannelWidth } = useSelector(selectPannel);

  const controler = useControlBlock();

  useEffect(() => {
    const timer = setInterval(() => {
      controler("DOWN");
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [controler]);

  return (
    <div
      className="game-container"
      style={{ width: `${pannelWidth}px`, height: `${pannelHeight}px` }}
    >
      {pannel.map((row, idx) => (
        <p className="row" key={idx}>
          {row.map(({ isActive }, idx) => (
            <b
              className={`block ${isActive ? "active-block" : ""}`}
              key={idx}
            ></b>
          ))}
        </p>
      ))}
    </div>
  );
}
