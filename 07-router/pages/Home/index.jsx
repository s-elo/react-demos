import React, { Component } from "react";
import { Link, Route, NavLink, Switch, Redirect } from "react-router-dom";

import MyNavLink from "../../component/MyNavLink";

import News from "./News";
import Message from "./Message";

export default class Home extends Component {
  render() {
    return (
      <div className="box">
        <div>Home Component....</div>
        <hr />
        <div className="sub-menus">
          <MyNavLink to="/home/news">News</MyNavLink>
          <MyNavLink to="/home/message">Message</MyNavLink>
        </div>
        <div className="sub-show">
          <Switch>
            <Route path="/home/news" component={News}></Route>
            <Route path="/home/message" component={Message}></Route>
            <Redirect to="/home/news"></Redirect>
          </Switch>
        </div>
      </div>
    );
  }
}
