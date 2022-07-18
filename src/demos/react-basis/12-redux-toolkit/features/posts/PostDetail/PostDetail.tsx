import React from "react";
// import { useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import PostAuthor from "../PostAuthor/PostAuthor";
import TimeAge from "@/demos/react-basis/12-redux-toolkit/components/TimeAgo/TimeAge";
import Spinner from "@/component/Spinner/Spinner";
import PostReactBtn from "../PostReactBtn/PostReactBtn";
// import { selectPostById } from "../postSlice";
import { useGetPostQuery } from "../../api/apiSlice";
import "./PostDetail.less";

export default function PostDetail(
  props: RouteComponentProps<{ postId: string }>
) {
  const { postId } = props.match.params;

  // const post = useSelector(selectPostById(postId));

  // you can use the same query hook multiple times,
  // pass it different query parameters,
  // and each result will be cached separately in the Redux store
  const {
    data: post,
    isFetching,
    isSuccess,
    isError,
    // error,
  } = useGetPostQuery(postId);

  let renderedDetail;
  if (isFetching) {
    renderedDetail = <Spinner />;
  } else if (isSuccess) {
    if (!post) {
      return <h2>Page not found...</h2>;
    }

    renderedDetail = (
      <article className="post-detail-container">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.user} />
        <TimeAge timestamp={post.date} />
        <hr style={{ margin: "5px 0" }} />
        <main>{post.content}</main>
        <PostReactBtn post={post} />
        <Link to={`/reduxToolkit/edit/${post.id}`} className="btn edit-btn">
          Edit
        </Link>
      </article>
    );
  } else if (isError) {
    return <div>{`error, cannot find this id`}</div>;
  }

  return <React.Fragment>{renderedDetail}</React.Fragment>;
}
