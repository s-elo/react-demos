import React, { Component } from "react";

export default class Count extends Component {
  state = {
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

    // from the container
    this.props.add(step);
  };

  sub = () => {
    const { step } = this.state;

    this.props.sub(step);
  };

  addIfOdd = () => {
    const { step } = this.state;
    const { count, add } = this.props;

    if (count % 2 === 0) {
      return;
    }

    add(step);
  };

  addAsync = () => {
    const { step } = this.state;

    // async action
    this.props.asyncAdd(step, 1000);
  };

  render() {
    return (
      <div className="box">
        <h2 className="count-show">SUM: {this.props.count}</h2>
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
