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
    </div>
  );
}
