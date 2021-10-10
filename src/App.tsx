import React from "react";
import Menu from "./component/Menu";
import Others from "./demos/others/others";
import TodoList from "./demos/02-todoList/todoList";

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
    path: "/todoList",
    name: "To do List",
    component: TodoList,
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
