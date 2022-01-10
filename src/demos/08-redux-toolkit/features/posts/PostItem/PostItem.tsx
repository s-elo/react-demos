import React from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import PostAuthor from "../PostAuthor/PostAuthor";
import TimeAge from "@/demos/08-redux-toolkit/components/TimeAgo/TimeAge";
import PostReactBtn from "../PostReactBtn/PostReactBtn";
import { PostData } from "../post";
// import { selectPostById } from "../postSlice";
import "./PostItem.less";
// import { EntityId } from "@reduxjs/toolkit";

export default function PostItem({ post }: { post: PostData }) {
  // now using the normalized data to find the item
  // instead of array
  // const post = useSelector(selectPostById(postId)) as PostData;
  const detailPath = `/reduxToolkit/posts/${post.id}`;

  return (
    <article className="post-excerpt">
      <h2>{post.title}</h2>
      <PostAuthor userId={post.user} />
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

// just like pureComponent for class component
// export default React.memo(PostItem);
