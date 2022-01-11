import { useMemo, useEffect, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostItem from "../PostItem/PostItem";
// import { selectPostIds, fetchPosts } from "../postSlice";
import { RootState } from "@/demos/08-redux-toolkit/store";
import Spinner from "@/component/Spinner/Spinner";
import { fetchUsers } from "../../users/userSlice";
import { useGetPostsQuery } from "../../api/apiSlice";
import "./PostList.less";

export default function PostList() {
  const dispatch = useDispatch();

  // const postIds = useSelector(selectPostIds);
  // const postFetchStatus = useSelector((state: RootState) => state.posts.status);
  // const postFetchError = useSelector((state: RootState) => state.posts.error);
  const userFetchStatus = useSelector((state: RootState) => state.users.status);

  useEffect(() => {
    // if (postFetchStatus === "idle") {
    //   dispatch(fetchPosts());
    // }

    if (userFetchStatus === "idle") {
      dispatch(fetchUsers());
    }
    // eslint-disable-next-line
  }, []);

  // replace the postSlice.ts
  // this is not stored in the Redux store anymore
  // the data will be cached once query
  // actually it is the endpoint query func being cached with the same arg
  // unless the arg changes or using refetch func, it wont re-fetch
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    // error,
    // refetch
  } = useGetPostsQuery();

  // to avoid sorting every time re-render
  // unless posts has been changed
  const sortedPosts = useMemo(() => {            
    const sortedPosts = posts.slice();
    // Sort posts in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date));    
    return sortedPosts;
  }, [posts]);

  let renderedPosts: ReactNode;

  if (isLoading) {
    renderedPosts = <Spinner text="Loading" />;
  } else if (isSuccess) {
    renderedPosts = sortedPosts.map((post) => (
      <PostItem post={post} key={post.id} />
    ));
  } else if (isError) {
    renderedPosts = <div>{`error, cannot fetch the list so far`}</div>;
  }

  // if (postFetchStatus === "loading") {
  //   renderedPosts = <Spinner text="Loading" />;
  // } else if (postFetchStatus === "complete") {
  //   renderedPosts = postIds.map((postId) => (
  //     <PostItem postId={postId} key={postId} />
  //   ));
  // } else if (postFetchStatus === "failed") {
  //   renderedPosts = <div>{postFetchError}</div>;
  // }

  return <div className="post-list-container">{renderedPosts}</div>;
}
