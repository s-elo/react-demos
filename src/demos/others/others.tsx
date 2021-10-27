import React from "react";
import Menu from "@/component/Menu";
import ErrorBoundary from "./07-errorBoundary/index";
import RenderProp from "./06-render_prop(slot)";

import "./others.less";

const linkStyle = {
  textDecoration: "none",
  color: "black",
  width: "100%",
  height: "100%",
  display: "inline-block",
  padding: "10px",
};

const demos = [
  {
    path: "/others/errorBoundary",
    name: "Error Boumdary",
    component: ErrorBoundary,
  },
  {
    path: "/others/renderProp",
    name: "Render Prop(slot)",
    component: RenderProp,
  },
];

export default class others extends React.Component {
  render() {
    return (
      <div className="others-body">
        <div className="others-content">
          <Menu items={demos} linkStyle={linkStyle} menuPath="/others"></Menu>
        </div>
      </div>
    );
  }
}
