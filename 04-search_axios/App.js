import React, { Component } from "react";
import Search from "./component/Search";
import List from "./component/List";

export default class App extends Component {
  state = {
    data: [],
    isFirst: true,
    isLoading: false,
    err: "",
  };

  updateState = (status) => {
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
