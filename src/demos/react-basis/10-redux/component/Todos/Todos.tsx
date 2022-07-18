import React, { Component } from "react";
import store from "../../redux/store";
import { addWork, subWork } from "../../redux/todos/todo_action";
import "./todos.less";

export default class Todos extends Component {
  workInput: React.RefObject<HTMLInputElement> = React.createRef();

  addToList = () => {
    const work = this.workInput.current!.value;

    if (work.trim() === "") return alert("blank work?");

    store.dispatch(addWork(work));
  };

  subFromList = () => {
    const work = this.workInput.current!.value;

    if (work.trim() === "") return alert("blank work?");

    const { todoList } = store.getState();

    if (!todoList.includes(work)) return alert("no such work");

    store.dispatch(subWork(work));
  };

  render() {
    const { todoList, counterSum } = store.getState();

    return (
      <div className="todo-redux-box">
        <h2>SUM: {counterSum}</h2>
        <span>Todo List:</span>
        <input type="text" ref={this.workInput} />
        <button onClick={this.addToList}>Add</button>
        <button onClick={this.subFromList}>Sub</button>
        {todoList.map((work, index) => (
          <li key={work}>{`${index + 1}: ${work}`}</li>
        ))}
      </div>
    );
  }
}
