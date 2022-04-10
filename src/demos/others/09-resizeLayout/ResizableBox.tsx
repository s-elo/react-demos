import React, { useState, useRef } from "react";
import ResizeBar from "./ResizeBar";
import "./ResizableBox.less";

export type ResizableBoxProps = {
  leftBox: () => React.ComponentElement<any, any>;
  rightBox: () => React.ComponentElement<any, any>;
};

export default function ResizableBox({ leftBox, rightBox }: ResizableBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rightWidth, setRightWidth] = useState("50%");

  return (
    <div className="resizable-box" ref={containerRef}>
      {leftBox()}
      <ResizeBar
        containerRef={containerRef}
        widthChange={(rightWidth) => setRightWidth(rightWidth)}
      />
      <div className="right-container" style={{ width: rightWidth }}>
        {rightBox()}
      </div>
    </div>
  );
}
