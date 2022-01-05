import React, { Component } from "react";
import Search from "./component/Search";
import List from "./component/List";
import { Status } from "./type";

export default class App extends Component {
  state: Status = {
    data: [],
    isFirst: true,
    isLoading: false,
    err: "",
  };

  updateState = (status: Status) => {
    this.setState({
      data: status.data,
      isFirst: status.isFirst,
      isLoading: status.isLoading,
      err: status.err,
    });
  };

  render() {
    return (
      <div>
        <Search updateState={this.updateState} />
        <List {...this.state} />
      </div>
    );
  }
}
