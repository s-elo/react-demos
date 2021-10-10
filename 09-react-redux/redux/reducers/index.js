// combine all the reducers
import { combineReducers } from "redux";

import sum from "./count";
import persons from "./person";

export default combineReducers({
  sum,
  persons,
});
