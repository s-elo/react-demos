import React, { useState, useRef } from "react";
import ResizeBar from "./ResizeBar";
import "./ResizableBox.less";

export type ResizableBoxProps = {
  children: React.ReactChild[];
};

export default function ResizableBox({ children }: ResizableBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [widths, setWidths] = useState<number[]>(
    new Array(children.length).fill(1 / children.length)
  );

  const tostr = (n: number) => `${(n * 100 - 1.5).toFixed(2)}%`;

  return (
    <div className="resizable-box" ref={containerRef}>
      {children.map((box, idx) => (
        <React.Fragment key={idx}>
          <div style={{ width: tostr(widths[idx]) }}>{box}</div>

          {idx !== children.length - 1 ? (
            <ResizeBar
              containerRef={containerRef}
              widthChange={(widths) => setWidths(widths)}
              idx={idx + 1}
              widths={widths}
            />
          ) : (
            ""
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
