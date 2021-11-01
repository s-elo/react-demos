import React from "react";
import Menu from "./component/Menu";
import TicTacToe from "./demos/01-tic-tac-toe";
import TodoList from "./demos/02-todoList/TodoList";
import ProxyTest from "./demos/03-proxy/Proxy";
import SearchAxios from "./demos/04-search_axios/SearchAxios";
import ReduxDemo from "./demos/05-redux/ReduxDemo";
import Others from "./demos/others/others";

import "./App.less";

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
    path: "/others",
    name: "Others",
    component: Others,
  },
];

export default class App extends React.Component {
  state = {
    currentDemoName: "",
  };

  changeDemo = (itemName: string) => {
    this.setState({
      currentDemoName: itemName,
    });
  };

  render() {
    return (
      <div className="app-body">
        <div className="app-content">
          <div className="demo-name">{this.state.currentDemoName}</div>
          <Menu
            items={demos}
            linkStyle={linkStyle}
            menuPath="/"
            itemChanged={this.changeDemo}
          ></Menu>
        </div>
        <div className="footer">@SuperLi</div>
      </div>
    );
  }
}
