import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./PostItem.less";

export default function PostItem(props) {
  const { post } = props;

  const user = useSelector(state => state.users.find(user => user.id === post.userId));

  const detailPath = `/reduxToolkit/posts/${post.id}`;

  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <span>Author: {user.name}</span>
      <p className="post-content">{post.content.slice(0, 100)}</p>
      <Link to={detailPath} className="view-btn btn">
        View
      </Link>
    </article>
  );
}
