import React, { Component } from "react";
import { TodoInputProps } from "../../type";
import "./index.css";

export default class ToDoInput extends Component<TodoInputProps> {
  handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement> &
      React.ChangeEvent<HTMLInputElement>
  ) => {
    const { target, key } = event;

    if (key !== "Enter") {
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
