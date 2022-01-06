import React from "react";
import { Link } from "react-router-dom";
import "./Header.less";

export default function Header(props) {
  const { demoPath } = props;

  return (
    <div className="header-container">
      <title>Mini Postland</title>
      <div className="tap-box">
        <Link className="link-btn" to={`${demoPath}/posts`}>
          Posts
        </Link>
        <Link className="link-btn" to={`${demoPath}/addPost`}>
          Add Post
        </Link>
        <Link className="link-btn" to={`${demoPath}/users`}>
          Users
        </Link>
        <Link className="link-btn" to={`${demoPath}/notifications`}>
          Notifications
        </Link>
      </div>
    </div>
  );
}
