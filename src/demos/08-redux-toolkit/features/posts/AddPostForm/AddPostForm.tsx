import { MouseEvent, ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { addNewPost } from "../postSlice";
import { selectAllUsers } from "../../users/userSlice";
import { Spinner } from "@/component/Spinner/Spinner";

import "./AddPostForm.less";

function AddPostForm(props: RouteComponentProps) {
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(users[0] ? users[0].id : "");
  const [addStatus, setAddStatus] = useState("idle");

  const dispatch = useDispatch();

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onUserSelected = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

  const onSaveBtnClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (title.trim() === "") return alert("Please enter the title");

    if (content.trim() === "") return alert("Please give some content");

    if (userId.trim() === "") return alert("Please select the user");

    try {
      setAddStatus("pending");
      await dispatch(addNewPost({ title, content, user: userId }));

      // alert("Added!");
      // jump to the /posts
      // and the addStatus will be idle next time rendering
      props.history.push("/reduxToolkit/posts");
    } catch (err) {
      console.error("Failed to save the post: ", err);
    }
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
        <select name="user" id="user" onChange={onUserSelected} value={userId}>
          <option value="" style={{ display: "none" }}></option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label>Post Content:</label>
        <textarea
          className="scroll-bar"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <div style={{ display: "flex" }}>
          <button
            className="btn"
            onClick={onSaveBtnClick}
            disabled={addStatus === "pending"}
          >
            Save
          </button>
          {addStatus === "pending" ? (
            <span style={{ display: "inline-block" }}>
              <Spinner size={"2em"} />
            </span>
          ) : (
            ""
          )}
        </div>
      </form>
    </section>
  );
}

export default withRouter(AddPostForm);
