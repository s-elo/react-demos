import React from "react";
import TicTacToe from "./demos/01-tic-tac-toe";
import TodoList from "./demos/02-todoList/TodoList";
import ProxyTest from "./demos/03-proxy/Proxy";
import SearchAxios from "./demos/04-search-axios/SearchAxios";
import ReduxDemo from "./demos/react-basis/10-redux/ReduxDemo";
import ReactRedux from "./demos/react-basis/11-react-redux/ReactRedux";
import RefDemo from "./demos/react-basis/08-refs";
import ReduxToolkit from "./demos/react-basis/12-redux-toolkit/ReduxToolkit";
import Tetris from "./demos/06-tetris";
import LazyLoad from "./demos/react-basis/02-lazyLoad";
import Hooks from "./demos/react-basis/03-hooks";
import Context from "./demos/react-basis/04-context";
import PureComDemo from "./demos/react-basis/05-pureComponent";
import ErrorBoundary from "./demos/react-basis/07-errorBoundary/index";
import RenderProp from "./demos/react-basis/06-render_prop(slot)";
import Portal from "./demos/react-basis/09-portal/PortalDemo";
import ResizeLayout from "./demos/05-resizeLayout";

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
    path: "/resizeLayout",
    name: "resizable layout",
    component: ResizeLayout,
  },
  {
    path: "/tetris",
    name: "Tetris",
    component: Tetris,
  },
  {
    path: "/react-basis",
    name: "React basis",
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
    ],
  },
];

export default demos;
