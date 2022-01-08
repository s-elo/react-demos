import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../../posts/postSlice";
import PostItem from "../../posts/PostItem/PostItem";

export default function UserPage(
  props: RouteComponentProps<{ userId: string }>
) {
  const { userId } = props.match.params;

  const posts = useSelector(selectAllPosts);

  const renderedPosts = posts
    .filter((post) => post.user === userId)
    .map((post) => <PostItem key={post.id} post={post} />);

  return <div>{renderedPosts}</div>;
}
