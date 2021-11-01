import { createStore, applyMiddleware } from "redux";
import countReducer from "./counter/count_reducer";
// handle the async actions
import thunk from "redux-thunk";

export default createStore(countReducer, applyMiddleware(thunk));
