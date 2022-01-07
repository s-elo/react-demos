import { useEffect, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostItem from "../PostItem/PostItem";
import { selectAllPosts, fetchPosts } from "../postSlice";
import { RootState } from "@/demos/08-redux-toolkit/store";
import { Spinner } from "@/component/Spinner/Spinner";
import "./PostList.less";

export default function PostList() {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postFetchStatus = useSelector((state: RootState) => state.posts.status);
  const postFetchError = useSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    if (postFetchStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postFetchStatus, dispatch]);

  let renderedPosts: ReactNode;

  if (postFetchStatus === "loading") {
    renderedPosts = <Spinner text="Loading" />;
  } else if (postFetchStatus === "complete") {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = [...posts].sort((a, b) =>
      b.date.localeCompare(a.date)
    );

    renderedPosts = orderedPosts.map((post) => (
      <PostItem post={post} key={post.id} />
    ));
  } else if (postFetchStatus === "failed") {
    renderedPosts = <div>{postFetchError}</div>;
  }

  return <div className="post-list-container">{renderedPosts}</div>;
}
