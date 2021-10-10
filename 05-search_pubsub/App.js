import React, { Component } from "react";
import Search from "./component/Search";
import List from "./component/List";

export default class App extends Component {
  render() {
    return (
      <div>
        <Search />
        <List />
      </div>
    );
  }
}
