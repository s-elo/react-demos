import React, { Component } from "react";
import "./index.css";

export default class ToDoInput extends Component {
  handleKeyUp = (event) => {
    const { target, keyCode } = event;

    if (keyCode !== 13) {
      return;
    }

    if (target.value.trim() === "") {
      return alert("what the hell is the blank task?");
    }

    this.props.addTask(target.value);
  };

  render() {
    return (
      <div className="header">
        <input
          onKeyUp={this.handleKeyUp}
          type="text"
          placeholder="Press Enter to Add"
        />
      </div>
    );
  }
}
