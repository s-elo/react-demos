import React from "react";
import { useSelector } from "react-redux";
import PostItem from "../../../components/PostItem/PostItem";
import './PostList.less';

export default function PostList() {
  const posts = useSelector((state) => state.posts);

  const renderedPosts = posts.map((post) => (
    <PostItem post={post} key={post.id} />
  ));

  return (
    <div className="post-list-container">
      {renderedPosts}
    </div>
  );
}
