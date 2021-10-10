import { createStore, applyMiddleware } from "redux";
import countReducer from "./count_redux.js";
// handle the async actions
import thunk from "redux-thunk";

export default createStore(countReducer, applyMiddleware(thunk));
