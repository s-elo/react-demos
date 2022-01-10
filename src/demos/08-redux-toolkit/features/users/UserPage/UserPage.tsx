import React, { useMemo } from "react";
import { RouteComponentProps } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectPostByUser } from "../../posts/postSlice";
import PostItem from "../../posts/PostItem/PostItem";
import { useGetPostsQuery } from "../../api/apiSlice";
import Spinner from "@/component/Spinner/Spinner";

export default function UserPage(
  props: RouteComponentProps<{ userId: string }>
) {
  const { userId } = props.match.params;

  // const posts = useSelector(selectPostByUser(userId));
  const {
    data: posts = [],
    isFetching,
    isSuccess,
    isError,
  } = useGetPostsQuery(null);

  const filteredPosts = useMemo(() => {
    console.log("call");
    return posts.filter((post) => post.user === userId);
  }, [posts, userId]);

  let renderedPosts;
  if (isFetching) {
    renderedPosts = <Spinner />;
  } else if (isSuccess) {
    if (filteredPosts.length === 0) {
      return <div>{`This user has noting here`}</div>;
    }
    renderedPosts = filteredPosts.map((post) => (
      <PostItem key={post.id} post={post} />
    ));
  } else if (isError) {
    return <div>{`can not fetch`}</div>;
  }

  return <div>{renderedPosts}</div>;
}
