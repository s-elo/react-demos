import React, { Component } from "react";
import store from "./redux/store";
import Count from "./component/Count";
import Todos from './component/Todos/Todos';

export default class ReduxDemo extends Component {
  unsubscribe: () => void = () => {}

  componentDidMount() {
    // when one of the states in the store changes
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {    
    return (
      <div>
        <Count />
        <hr />
        <Todos />
      </div>
    );
  }
}
