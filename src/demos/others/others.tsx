import React from "react";
import Menu from "@/component/Menu";
import LazyLoad from "./02-lazyLoad";
import Hooks from "./03-hooks";
import Context from "./04-context";
import PureComDemo from "./05-pureComponent";
import ErrorBoundary from "./07-errorBoundary/index";
import RenderProp from "./06-render_prop(slot)";
import Portal from "./08-portal/PortalDemo";
import ResizeLayout from "./09-resizeLayout";
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
    path: "/others/lazyLoad",
    name: "LazyLoad",
    component: LazyLoad,
  },
  {
    path: "/others/hooks",
    name: "Hooks",
    component: Hooks,
  },
  {
    path: "/others/context",
    name: "Context",
    component: Context,
  },
  {
    path: "/others/pureComDemo",
    name: "PureComDemo",
    component: PureComDemo,
  },
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
  {
    path: "/others/portalDemo",
    name: "portal demo",
    component: Portal,
  },
  {
    path: "/others/resizeLayout",
    name: "resizable layout",
    component: ResizeLayout,
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
