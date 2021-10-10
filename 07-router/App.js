import React, { Component } from "react";
import { Link, Route, NavLink, Switch, Redirect } from "react-router-dom";

// route components
import About from "./pages/About";
import Home from "./pages/Home";

// common component
import Header from "./component/Header";
import MyNavLink from "./component/MyNavLink";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="menu">
          <div className="menu-item">
            {/* <Link to="/home">Home</Link> */}
            {/* <NavLink activeClassName="my-acitve" to="/home">
              Home
            </NavLink> */}

            <MyNavLink to="/home">Home</MyNavLink>
          </div>
          <div className="menu-item">
            {/* <Link to="/about">About</Link> */}
            <MyNavLink to="/about">About</MyNavLink>
          </div>
        </div>
        <hr />
        <div className="show-area">
          {/* using Switch will match one route and stop search to improve the performance */}
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />

            {/* when the above does not match */}
            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    );
  }
}
