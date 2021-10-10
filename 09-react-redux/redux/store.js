import { createStore, applyMiddleware } from "redux";

import allReducers from "./reducers";

// handle the async actions
import thunk from "redux-thunk";
// for dev tools of redux
import { composeWithDevTools } from "redux-devtools-extension";

export default createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
