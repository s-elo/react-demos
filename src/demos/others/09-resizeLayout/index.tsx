import React, { useRef } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import ResizableBox from "./ResizableBox";

export default function ResizeLayout() {
  const leftRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div>
        <Link to="/others/resizeLayout/right">right</Link>
        <Link to="/others/resizeLayout/left">left</Link>
      </div>
      <div style={{ width: "800px" }}>
        <ResizableBox
          leftBox={() => <LeftBox ref={leftRef} />}
          rightBox={() => <RightBox leftRef={leftRef} />}
        />
      </div>
    </div>
  );
}

const LeftBox = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className="left-box" ref={ref}>
      left
    </div>
  );
});

const RightBox = ({
  leftRef,
}: {
  leftRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div className="right-box">
      {leftRef.current ? leftRef.current.innerText : "right"}
      <Switch>
        <Route exact path={`/others/resizeLayout/left`} key="/left">
          <div>this is left router</div>
        </Route>
        <Route exact path={`/others/resizeLayout/right`} key="/right">
          <div>this is right router</div>
        </Route>
        <Redirect to="/others/resizeLayout/right" />
      </Switch>
    </div>
  );
};
