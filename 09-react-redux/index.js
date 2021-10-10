import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";
import { Provider } from "react-redux";

import App from "./App";

// refresh the page, since redux only manage the states without render the page again
// it wont reduce the performance because of the diff algorithm

// using react-redux no need to subscribe, connect method has helped you
// store.subscribe(() => {
//   ReactDOM.render(<App />, document.querySelector("#root"));
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
