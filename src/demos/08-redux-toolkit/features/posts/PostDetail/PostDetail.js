import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostAuthor from "../PostAuthor/PostAuthor";
import "./PostDetail.less";

export default function PostDetail(props) {
  const { postId } = props.match.params;

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );

  if (!post) {
    return <h2>Page not found...</h2>;
  }

  return (
    <article className="post-detail-container">
      <h2>{post.title}</h2>
      <PostAuthor userId={post.userId}/>
      <main>{post.content}</main>
      <Link to={`/reduxToolkit/edit/${post.id}`} className="btn edit-btn">
        Edit
      </Link>
    </article>
  );
}
