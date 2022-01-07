import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "../PostAuthor/PostAuthor";
import TimeAge from "@/demos/08-redux-toolkit/components/TimeAgo/TimeAge";
import PostReactBtn from "../PostReactBtn/PostReactBtn";
import { Post } from "../post";
import "./PostItem.less";

export default function PostItem(props: { post: Post }) {
  const { post } = props;

  const detailPath = `/reduxToolkit/posts/${post.id}`;

  return (
    <article className="post-excerpt">
      <h2>{post.title}</h2>
      <PostAuthor userId={post.userId} />
      <TimeAge timestamp={post.date} />
      <hr style={{ margin: "5px 0" }} />
      <p className="post-content">{post.content.slice(0, 100)}</p>
      <PostReactBtn post={post} />
      <Link to={detailPath} className="view-btn btn">
        View
      </Link>
    </article>
  );
}
