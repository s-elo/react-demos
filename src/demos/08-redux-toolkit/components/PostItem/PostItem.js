import React from "react";
import { Link } from "react-router-dom";

import "./PostItem.less";

export default function PostItem(props) {
  const { post } = props;

  const detailPath = `/reduxToolkit/posts/${post.id}`;

  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.slice(0, 100)}</p>
      <Link to={detailPath} className="view-btn btn">
        View
      </Link>
    </article>
  );
}
