import React from "react";
import { useController } from "../../control";
import "./ControlPannel.less";

export default function ControlPannel() {
  const controller = useController();

  return (
    <div className="control-pannel">
      <div className="overall-control">
        <button className="restart-btn" onClick={controller.pause}>
          restart
        </button>
        <button className="start-btn" onClick={controller.start}>
          start
        </button>
        <button className="pause-btn" onClick={controller.pause}>
          pause
        </button>
      </div>
      <div className="step-control">
        <button
          className="left-btn"
          onClick={() => controller.move("LEFT")}
        ></button>
        <button
          className="right-btn"
          onClick={() => controller.move("RIGHT")}
        ></button>
        <button
          className="down-btn"
          onClick={() => controller.move("FAST_DOWN")}
        ></button>
        <button
          className="rotate-btn"
          onClick={() => controller.move("ROTATE")}
        ></button>
      </div>
      <div className="drop-control">
        <button className="drop-btn" onClick={() => controller.move("DROP")}>
          drop
        </button>
      </div>
    </div>
  );
}
