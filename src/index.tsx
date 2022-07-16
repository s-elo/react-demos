import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";

const rootDom = document.getElementById("root");

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  rootDom
);
