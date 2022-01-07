import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function PostAuthor({ userId }: { userId: string }) {
  const user = useSelector((state: RootState) =>
    state.users.find((user) => user.id === userId)
  );

  return <span>by {user ? user.name : "Unknown author"}</span>;
}
