import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postUpdated } from "../postSlice";

import "./EditPostForm.less";

export default function EditPostForm(props) {
  const { postId } = props.match.params;

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSaveBtnClick = (e) => {
    e.preventDefault();

    if (title.trim() === "") return alert("Please enter the title");

    if (content.trim() === "") return alert("Please give some content");

    dispatch(postUpdated(postId, title, content, post.userId));

    alert("Updated!");
  };

  return (
    <section className="edit-post-form-container">
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
        <button className="btn" onClick={onSaveBtnClick}>
          Edit Post
        </button>
      </form>
    </section>
  );
}
