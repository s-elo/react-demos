import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllUsers,
  selectUserFetchStatus,
  fetchUsers,
} from "../userSlice";
// import { selectPostFetchStatus, fetchPosts } from "../../posts/postSlice";
import Spinner from "@/component/Spinner/Spinner";
import "./UserList.less";

export default function UserList() {
  const users = useSelector(selectAllUsers);
  const userFetchStatus = useSelector(selectUserFetchStatus);
  // const postFetchStatus = useSelector(selectPostFetchStatus);
  const dispatch = useDispatch();

  if (userFetchStatus === "idle") {
    dispatch(fetchUsers());
  }

  // if (postFetchStatus === "idle") {
  //   dispatch(fetchPosts());
  // }

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/reduxToolkit/users/${user.id}`} className="link">
        {user.name}
      </Link>
    </li>
  ));

  let finalRender;

  if (userFetchStatus === "complete") {
    finalRender = renderedUsers;
  } else if (userFetchStatus === "loading" || userFetchStatus === "idle") {
    finalRender = <Spinner />;
  }

  return (
    <div className="user-list-container">
      <ul>{finalRender}</ul>
    </div>
  );
}
