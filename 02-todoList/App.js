import React, { Component } from "react";
import ToDoInput from "./component/ToDoInput";
import ToDoList from "./component/ToDoList";
import ToDoFooter from "./component/ToDoFooter";
import "./App.css";

export default class App extends Component {
  state = {
    data: [
      { id: 1, task: "sleep", done: true },
      { id: 2, task: "eat", done: true },
      { id: 3, task: "codeing", done: false },
    ],

    total: 3,
  };

  handleAddTask = (newTask) => {
    const { data, total } = this.state;

    const newItem = { id: total + 1, task: newTask, done: false };

    this.setState({
      data: [newItem, ...data],
      total: total + 1,
    });
  };

  updateStatus = (id, status) => {
    const { data } = this.state;

    const newData = data.map((item) => {
      return item.id === id ? { ...item, done: status } : item;
    });

    this.setState({
      data: newData,
    });
  };

  deleteTask = (id) => {
    const { data } = this.state;

    const newData = data.filter((item) => {
      return item.id !== id;
    });

    this.setState({
      data: newData,
    });
  };

  selectAll = (isAll) => {
    const { data } = this.state;

    const newData = data.map((item) => {
      return { ...item, done: isAll };
    });

    this.setState({
      data: newData,
    });
  };

  clearAllDone = () => {
    const { data } = this.state;

    const newData = data.filter((item) => {
      return !item.done;
    });

    this.setState({
      data: newData,
    });
  };

  render() {
    return (
      <div className="todo-box">
        <ToDoInput addTask={this.handleAddTask} />
        <ToDoList
          data={this.state.data}
          updateStatus={this.updateStatus}
          deleteTask={this.deleteTask}
        />
        <ToDoFooter
          data={this.state.data}
          selectAll={this.selectAll}
          clearAllDone={this.clearAllDone}
        />
      </div>
    );
  }
}
