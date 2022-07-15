import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPannel } from "../../pannelSlice";
import { useController } from "../../control";
import "./GamePannel.less";

export default function GamePannel() {
  const { pannel, pannelHeight, pannelWidth } = useSelector(selectPannel);

  const controler = useController();

  useEffect(() => {
    controler.start(); // should use a button event to start
  }, []);

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
