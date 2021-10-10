import React, { Component, Suspense } from "react";
import { NavLink, Route } from "react-router-dom";
// import Home from "./Home";
// import About from "./About";

// the clip will split the lazy components as indenpendent chunks
const lazyHome = React.lazy(() => import("./Home"));
const lazyAbout = React.lazy(() => import("./About"));

export default class LazyLoad extends Component {
  render() {
    return (
      <div>
        <div>
          <NavLink to="/home">Home</NavLink>&nbsp;
          <NavLink to="/about">About</NavLink>
        </div>
        <hr />
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Route path="/home" component={lazyHome} />
            <Route path="/about" component={lazyAbout} />
          </Suspense>
        </div>
      </div>
    );
  }
}
