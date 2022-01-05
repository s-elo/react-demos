import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { postAdded } from "../postSlice";

import "./AddPostForm.less";

export default function AddPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSaveBtnClick = (e) => {
    e.preventDefault();

    if (title.trim() === "") return alert("Please enter the title");

    if (content.trim() === "") return alert("Please give some content");

    const newPost = {
      id: nanoid(),
      title,
      content,
    };

    dispatch(postAdded(newPost));

    // clear the form
    setTitle("");
    setContent("");
  };

  return (
    <section className="add-post-form-container">
      <form className="form">
        <label htmlFor="">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          placeholder={`What's on your mind?`}
        />
        <label htmlFor="">Post Content:</label>
        <textarea
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button onClick={onSaveBtnClick}>Save Post</button>
      </form>
    </section>
  );
}
