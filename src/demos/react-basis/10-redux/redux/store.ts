import { createStore, applyMiddleware, combineReducers } from "redux";
import countReducer from "./counter/count_reducer";
import todoReducer from "./todos/todo_reducer";

// handle the async actions
// the async reducers return a function,
// but we need an object with type prop
import thunk from "redux-thunk";

export default createStore(
  combineReducers({ counterSum: countReducer, todoList: todoReducer }),
  applyMiddleware(thunk)
);
