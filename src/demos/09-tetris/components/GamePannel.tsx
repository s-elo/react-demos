import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPannel, setDropBlocks } from "../pannelSlice";
import "./GamePannel.less";

export default function GamePannel() {
  const { pannel, pannelHeight, pannelWidth, dropBlocks, maxRow } =
    useSelector(selectPannel);

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(
        setDropBlocks(
          dropBlocks.map(({ row, col }) => {
            if (dropBlocks[dropBlocks.length - 1].row >= maxRow)
              clearInterval(timer);

            return {
              row:
                dropBlocks[dropBlocks.length - 1].row >= maxRow ? row : row + 1,
              col: col,
            };
          })
        )
      );
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [dispatch, dropBlocks, maxRow]);

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
