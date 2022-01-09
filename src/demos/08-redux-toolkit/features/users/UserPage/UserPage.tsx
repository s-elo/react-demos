import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostByUser } from "../../posts/postSlice";
import PostItem from "../../posts/PostItem/PostItem";

export default function UserPage(
  props: RouteComponentProps<{ userId: string }>
) {
  const { userId } = props.match.params;

  const posts = useSelector(selectPostByUser(userId));

  const renderedPosts = posts.map((post) => (
    <PostItem key={post.id} postId={post.id} />
  ));

  return <div>{renderedPosts}</div>;
}
