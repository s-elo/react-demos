import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../../users/userSlice";

export default function PostAuthor({ userId }: { userId: string }) {
  const user = useSelector(selectUserById(userId));

  return <span>by {user ? user.name : "Unknown author"}</span>;
}
