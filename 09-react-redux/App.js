import React, { Component } from "react";
// import Count from "./component/Count";

// use the container
import Count from "./containers/Count";
import Person from "./containers/Person";

export default class App extends Component {
  render() {
    return (
      <div>
        {/* connect the container with the redux */}
        {/* <Count store={store} /> */}
        {/* using Provider in index to give the store to all components */}
        <Count />
        <hr />
        <Person />
      </div>
    );
  }
}
