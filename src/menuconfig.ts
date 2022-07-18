import React from "react";
import TicTacToe from "./demos/01-tic-tac-toe";
import TodoList from "./demos/02-todoList/TodoList";
import ProxyTest from "./demos/03-proxy/Proxy";
import SearchAxios from "./demos/04-search-axios/SearchAxios";
import ReduxDemo from "./demos/05-redux/ReduxDemo";
import ReactRedux from "./demos/06-react-redux/ReactRedux";
import RefDemo from "./demos/07-refs";
import ReduxToolkit from "./demos/08-redux-toolkit/ReduxToolkit";
import Tetris from "./demos/09-tetris";
import LazyLoad from "./demos/others/02-lazyLoad";
import Hooks from "./demos/others/03-hooks";
import Context from "./demos/others/04-context";
import PureComDemo from "./demos/others/05-pureComponent";
import ErrorBoundary from "./demos/others/07-errorBoundary/index";
import RenderProp from "./demos/others/06-render_prop(slot)";
import Portal from "./demos/others/08-portal/PortalDemo";
import ResizeLayout from "./demos/others/09-resizeLayout";
// import Others from "./demos/others/others";

export type Demo = {
  path: string;
  name: string;
  component: React.ComponentType | Demo[];
};

export const linkStyle = {
  textDecoration: "none",
  color: "black",
  width: "100%",
  height: "100%",
  display: "inline-block",
  padding: "10px",
};

const demos: Demo[] = [
  {
    path: "/tictactoe",
    name: "tic-tac-toe",
    component: TicTacToe,
  },
  {
    path: "/todoList",
    name: "To do List",
    component: TodoList,
  },
  {
    path: "/proxy",
    name: "ProxyTest",
    component: ProxyTest,
  },
  {
    path: "/searchAxios",
    name: "SearchAxios",
    component: SearchAxios,
  },
  {
    path: "/reduxDemo",
    name: "ReduxDemo",
    component: ReduxDemo,
  },
  {
    path: "/reactRedux",
    name: "ReactRedux",
    component: ReactRedux,
  },
  {
    path: "/refDemo",
    name: "RefDemo",
    component: RefDemo,
  },
  {
    path: "/reduxToolkit",
    name: "ReduxToolkit",
    component: ReduxToolkit,
  },
  {
    path: "/tetris",
    name: "Tetris",
    component: Tetris,
  },
  {
    path: "/others",
    name: "Others",
    component: [
      {
        path: "/lazyLoad",
        name: "LazyLoad",
        component: LazyLoad,
      },
      {
        path: "/hooks",
        name: "Hooks",
        component: Hooks,
      },
      {
        path: "/context",
        name: "Context",
        component: Context,
      },
      {
        path: "/pureComDemo",
        name: "PureComDemo",
        component: PureComDemo,
      },
      {
        path: "/errorBoundary",
        name: "Error Boumdary",
        component: ErrorBoundary,
      },
      {
        path: "/renderProp",
        name: "Render Prop(slot)",
        component: RenderProp,
      },
      {
        path: "/portalDemo",
        name: "portal demo",
        component: Portal,
      },
      {
        path: "/resizeLayout",
        name: "resizable layout",
        component: ResizeLayout,
      },
    ],
  },
];

export default demos;
