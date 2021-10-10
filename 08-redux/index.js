import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";

import App from "./App";

ReactDOM.render(<App />, document.querySelector("#root"));

// refresh the page, since redux only manage the states without render the page again
// it wont reduce the performance because of the diff algorithm
store.subscribe(() => {
  ReactDOM.render(<App />, document.querySelector("#root"));
});
