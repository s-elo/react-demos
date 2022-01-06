import React from "react";
import { useSelector } from "react-redux";
import PostItem from "../PostItem/PostItem";
import "./PostList.less";

export default function PostList() {
  const posts = useSelector((state) => state.posts);

  // Sort posts in reverse chronological order by datetime string
  const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <PostItem post={post} key={post.id} />
  ));

  return <div className="post-list-container">{renderedPosts}</div>;
}
