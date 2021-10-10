import React, { Component } from "react";
import "./index.css";

export default class index extends Component {
  state = {
    mouseFlag: false,
  };

  handleMouse(flag) {
    this.setState({
      mouseFlag: flag,
    });
  }

  handleChange = (id) => {
    return (event) => {
      this.props.updateStatus(id, event.target.checked);
    };
  };

  handleDelete = (id) => {
    return () => {
      if (window.confirm("delete?")) {
        this.props.deleteTask(id);
      }
    };
  };

  render() {
    const { id, task, done } = this.props;
    const { mouseFlag } = this.state;

    return (
      <div
        style={{ background: mouseFlag ? "#e6e6e6" : "white" }}
        className="item-box"
        onMouseEnter={() => {
          this.handleMouse(true);
        }}
        onMouseLeave={() => {
          this.handleMouse(false);
        }}
      >
        <input
          type="checkbox"
          checked={done}
          onChange={this.handleChange(id)}
        />
        <span className="task">{task}</span>
        <button
          style={{ visibility: mouseFlag ? "visible" : "hidden" }}
          onClick={this.handleDelete(id)}
        >
          Delete
        </button>
      </div>
    );
  }
}
