import { createStore, applyMiddleware, combineReducers } from "redux";

// reducers
import sum from "./reducers/count";
import persons from "./reducers/person";

// handle the async actions
import thunk from "redux-thunk";
// for dev tools of redux
import { composeWithDevTools } from "redux-devtools-extension";

export default createStore(
  combineReducers({
    sum,
    persons,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
