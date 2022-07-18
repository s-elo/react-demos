import React from "react";
import { useController } from "../../control";
import "./ControlPannel.less";

export default function ControlPannel() {
  const controller = useController();

  return (
    <div className="control-pannel">
      <button className="start-btn" onClick={controller.start}>
        start
      </button>
      <button className="pause-btn" onClick={controller.pause}>
        pause
      </button>
      <button className="left-btn" onClick={() => controller.move("LEFT")}>
        left
      </button>
      <button className="right-btn" onClick={() => controller.move("RIGHT")}>
        right
      </button>
      <button className="down-btn" onClick={() => controller.move("DOWN")}>
        down
      </button>
      <button className="rotate-btn" onClick={() => controller.move("ROTATE")}>
        rotate
      </button>
    </div>
  );
}
