import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// import "./index.css";

type Props = {
  to: string;
};

export default class MyNavLink extends Component<Props> {
  render() {
    // this.props includes the children prop which is the content of the link
    return <NavLink activeClassName="my-active" {...this.props} />;
  }
}
