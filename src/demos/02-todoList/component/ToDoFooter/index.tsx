import React, { Component } from "react";
import { TodoFooterProps } from "../../type";
import "./index.css";

export default class index extends Component<TodoFooterProps> {
  handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.selectAll(event.target.checked);
  };

  handleClearAllDone = () => {
    this.props.clearAllDone();
  };

  render() {
    const { data } = this.props;

    const doneTasks = data.reduce((pre, curVal) => {
      return pre + (curVal.done ? 1 : 0);
    }, 0);

    const total = data.length;
    return (
      <div className="footer-box">
        <input
          type="checkbox"
          checked={doneTasks === total && total !== 0}
          onChange={this.handleSelectAll}
        />
        <span className="data">
          {doneTasks} Done / {total} All
        </span>
        <button onClick={this.handleClearAllDone}>Clear all done tasks</button>
      </div>
    );
  }
}
