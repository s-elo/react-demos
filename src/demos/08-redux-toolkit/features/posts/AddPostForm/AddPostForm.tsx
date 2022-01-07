import { MouseEvent, ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { postAdded } from "../postSlice";
import { selectAllUsers } from "../../users/userSlice";

import "./AddPostForm.less";

function AddPostForm(props: RouteComponentProps) {
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(users[0].id);

  const dispatch = useDispatch();

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onUserSelected = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

  const onSaveBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (title.trim() === "") return alert("Please enter the title");

    if (content.trim() === "") return alert("Please give some content");

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
        <select name="user" id="user" onChange={onUserSelected}>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label>Post Content:</label>
        <textarea
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
