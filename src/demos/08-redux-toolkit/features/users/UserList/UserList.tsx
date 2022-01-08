import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../userSlice";
import './UserList.less';

export default function UserList() {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/reduxToolkit/users/${user.id}`} className="link">{user.name}</Link>
    </li>
  ));

  return (
    <div className="user-list-container">
      <ul>{renderedUsers}</ul>
    </div>
  );
}
