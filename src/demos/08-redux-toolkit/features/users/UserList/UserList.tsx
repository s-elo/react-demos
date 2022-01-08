import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllUsers,
  selectUserFetchStatus,
  fetchUsers,
} from "../userSlice";
import "./UserList.less";
import { Spinner } from "@/component/Spinner/Spinner";

export default function UserList() {
  const users = useSelector(selectAllUsers);
  const userFetchStatus = useSelector(selectUserFetchStatus);

  const dispatch = useDispatch();

  if (userFetchStatus === "idle") {
    dispatch(fetchUsers());
  }

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
