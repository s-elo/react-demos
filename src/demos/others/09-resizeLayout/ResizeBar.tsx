import React, { useRef } from "react";

export default function ResizeBar({
  containerRef,
  widthChange,
  style = {},
}: {
  containerRef: React.RefObject<HTMLElement>;
  widthChange: (mirrorWidth: string) => void;
  style?: any;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  const dragStart = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const moveEvent = (e: MouseEvent) => {
      if (containerRef.current && barRef.current) {
        const offsetLeft = e.clientX - containerRef.current.offsetLeft;

        const widthPercentage =
          1 -
          offsetLeft /
            Number(
              getComputedStyle(containerRef.current).width.replace("px", "")
            );

        widthChange(`${(widthPercentage * 100 - 1.5).toFixed(2)}%`);
      }
    };
    document.addEventListener("mousemove", moveEvent);

    const upEvent = () => {
      document.removeEventListener("mousemove", moveEvent);
      document.removeEventListener("mouseup", upEvent);
    };

    document.addEventListener("mouseup", upEvent);
  };

  return (
    <div
      className="resiz-bar"
      ref={barRef}
      onMouseDown={dragStart}
      style={style}
    ></div>
  );
}
