import React from "react";
import Menu from "./component/Menu";
import demos, { linkStyle } from "./menuconfig";

import "./App.less";

export default class App extends React.Component {
  render() {
    return (
      <div className="app-body">
        <div className="app-content">
          <Menu items={demos} linkStyle={linkStyle} menuPath="/"></Menu>
        </div>
        <div className="footer">@SuperLi</div>
      </div>
    );
  }
}
