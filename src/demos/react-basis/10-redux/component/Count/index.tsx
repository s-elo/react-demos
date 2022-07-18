import React, { Component } from "react";
import store from "../../redux/store";
import {
  incrementAction,
  decrementAction,
  incrementAsyncAction,
} from "../../redux/counter/count_action";

export default class Count extends Component {
  state = {
    // count: 0,
    step: 1,
  };

  stateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    this.setState({
      step: Number(value),
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
    // the store contains two states
    const { counterSum } = store.getState();

    if (counterSum % 2 === 0) {
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
    const { counterSum, todoList } = store.getState();

    return (
      <div className="box">
        <h2 className="count-show">SUM: {counterSum}</h2>
        <h2>Todo Num: {todoList.length}</h2>
        <select onChange={this.stateChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.add}>+</button>&nbsp;
        <button onClick={this.sub}>-</button>&nbsp;
        <button onClick={this.addIfOdd}>+ ifodd</button>&nbsp;
        <button onClick={this.addAsync}>+ async</button>
      </div>
    );
  }
}
