import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.less";

export default class Header extends Component {
  render() {
    const { demoPath } = this.props;
    return (
      <div className="header-container">
        <Link className="link-btn" to={`${demoPath}/posts`}>
          Posts
        </Link>
        <Link className="link-btn" to={`${demoPath}/users`}>
          Users
        </Link>
        <Link className="link-btn" to={`${demoPath}/notifications`}>
          Notifications
        </Link>
      </div>
    );
  }
}
