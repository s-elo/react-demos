import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPannel } from "../pannelSlice";
import { useControlBlock, useGenerateBlock } from "../control";
import "./GamePannel.less";

export default function GamePannel() {
  const { pannel, pannelHeight, pannelWidth } = useSelector(selectPannel);

  const controler = useControlBlock();
  const initBlock = useGenerateBlock();

  useEffect(() => {
    initBlock(); // should use a button event to start
    // eslint-disable-next-line
  }, [initBlock]);

  useEffect(() => {
    const timer = setInterval(() => {
      const status = controler("DOWN");
      // generate a new dropping block
      if (status === "STOPPED") {
        initBlock();
      }
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [controler, initBlock]);

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
