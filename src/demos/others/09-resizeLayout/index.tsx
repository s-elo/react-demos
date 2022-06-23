import React from "react";
import ResizableBox from "./ResizableBox";

export default function ResizeLayout() {
  return (
    <div style={{ width: "800px" }}>
      <ResizableBox>
        <Box1 />
        <Box2 />
        <Box1 />
        <Box1 />
      </ResizableBox>
    </div>
  );
}

const Box1 = () => {
  return <div className="left-box">box1</div>;
};

const Box2 = () => {
  return <div className="right-box">box2</div>;
};
