import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// import "./index.css";

export default class MyNavLink extends Component {
  render() {
    // this.props includes the children prop which is the content of the link
    return <NavLink activeClassName="my-active" {...this.props} />;
  }
}
