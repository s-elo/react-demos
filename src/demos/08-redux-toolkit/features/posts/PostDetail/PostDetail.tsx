import React from "react";
import { useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import PostAuthor from "../PostAuthor/PostAuthor";
import TimeAge from "@/demos/08-redux-toolkit/components/TimeAgo/TimeAge";
import PostReactBtn from "../PostReactBtn/PostReactBtn";
import { RootState } from "../../../store";
import "./PostDetail.less";

export default function PostDetail(
  props: RouteComponentProps<{ postId: string }>
) {
  const { postId } = props.match.params;

  const post = useSelector((state: RootState) =>
    state.posts.find((post) => post.id === postId)
  );

  if (!post) {
    return <h2>Page not found...</h2>;
  }

  return (
    <article className="post-detail-container">
      <h2>{post.title}</h2>
      <PostAuthor userId={post.userId} />
      <TimeAge timestamp={post.date} />
      <hr style={{ margin: "5px 0" }} />
      <main>{post.content}</main>
      <PostReactBtn post={post} />
      <Link to={`/reduxToolkit/edit/${post.id}`} className="btn edit-btn">
        Edit
      </Link>
    </article>
  );
}
