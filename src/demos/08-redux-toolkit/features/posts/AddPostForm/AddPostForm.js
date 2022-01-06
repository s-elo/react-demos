import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { postAdded } from "../postSlice";

import "./AddPostForm.less";

function AddPostForm(props) {
  const users = useSelector((state) => state.users);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(users[0].id);

  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onUserSelected = (e) => setUserId(e.target.value);

  const onSaveBtnClick = (e) => {
    e.preventDefault();

    if (title.trim() === "") return alert("Please enter the title");

    if (content.trim() === "") return alert("Please give some content");

    console.log(userId);
    dispatch(postAdded(title, content, userId));

    alert("Added!");
    props.history.push("/reduxToolkit/posts");
  };

  return (
    <section className="add-post-form-container">
      <form className="form">
        <label>Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          placeholder={`What's on your mind?`}
        />
        <label>Author:</label>
        <select
          name="user"
          id="user"
          onChange={onUserSelected}
        >
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label>Post Content:</label>
        <textarea
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button className="btn" onClick={onSaveBtnClick}>
          Save Post
        </button>
      </form>
    </section>
  );
}

export default withRouter(AddPostForm);
