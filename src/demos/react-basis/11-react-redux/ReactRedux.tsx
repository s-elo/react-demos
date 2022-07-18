import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
// import Count from "./component/Count";

// use the container
import Count from "./component/Count";
import Person from "./component/Person";

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {/* connect the container with the redux */}
          {/* <Count store={store} /> */}
          {/* using Provider in index to give the store to all components */}
          <Count />
          <hr />
          <Person />
        </Provider>
      </div>
    );
  }
}
