import React, { Component } from "react";
import ToDoItem from "../ToDoItem";
import "./index.css";

export default class ToDoList extends Component {
  render() {
    const { data, updateStatus, deleteTask } = this.props;

    return (
      <div className="list-box">
        {data.map((item) => {
          return (
            <ToDoItem
              key={item.id}
              {...item}
              updateStatus={updateStatus}
              deleteTask={deleteTask}
            />
          );
        })}
      </div>
    );
  }
}
