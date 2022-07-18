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
          <NavLink to="/others/lazyLoad/home">Home</NavLink>&nbsp;
          <NavLink to="/others/lazyLoad/about">About</NavLink>
        </div>
        <hr />
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Route path="/others/lazyLoad/home" component={lazyHome} />
            <Route path="/others/lazyLoad/about" component={lazyAbout} />
          </Suspense>
        </div>
      </div>
    );
  }
}
