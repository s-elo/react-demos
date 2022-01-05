import React from "react";
import './PostItem.less';

export default function PostItem(props) {
  const { post } = props;
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.slice(0, 100)}</p>
    </article>
  );
}
