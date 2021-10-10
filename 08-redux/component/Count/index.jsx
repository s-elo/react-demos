import React, { Component } from "react";
import store from "../../redux/store";
import {
  incrementAction,
  decrementAction,
  incrementAsyncAction,
} from "../../redux/count_action";

export default class Count extends Component {
  state = {
    // count: 0,
    step: 1,
  };

  stateChange = (event) => {
    const { value } = event.target;
    this.setState({
      step: value * 1,
    });
  };

  add = () => {
    const { step } = this.state;

    store.dispatch(incrementAction(step));
  };

  sub = () => {
    const { step } = this.state;

    store.dispatch(decrementAction(step));
  };

  addIfOdd = () => {
    const { step } = this.state;

    if (store.getState() % 2 === 0) {
      return;
    }

    store.dispatch(incrementAction(step));
  };

  addAsync = () => {
    const { step } = this.state;

    // async action
    store.dispatch(incrementAsyncAction(step, 1000));
  };

  render() {
    return (
      <div className="box">
        <h2 className="count-show">SUM: {store.getState()}</h2>
        <select onChange={this.stateChange}>
          <option select="1">1</option>
          <option select="2">2</option>
          <option select="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.add}>+</button>&nbsp;
        <button onClick={this.sub}>-</button>&nbsp;
        <button onClick={this.addIfOdd}>+ odd</button>&nbsp;
        <button onClick={this.addAsync}>+ async</button>
      </div>
    );
  }
}
