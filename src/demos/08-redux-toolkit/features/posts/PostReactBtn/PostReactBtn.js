import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "../postSlice";
import "./PostReactBtn.less";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export default function PostReactBtn({ post }) {
  const dispatch = useDispatch();

  return (
    <div className="react-btn-container">
      {Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
          className="btn emoji-btn"
          key={name}
          onClick={() =>
            dispatch(reactionAdded({ id: post.id, reactName: name }))
          }
        >
          {emoji}{" "}
          <span style={{ "fontWeight": "bold" }}>{post.reactions[name]}</span>
        </button>
      ))}
    </div>
  );
}
