import { MouseEvent, ChangeEvent, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { postUpdated } from "../postSlice";
// import { selectPostById } from "../postSlice";
import { useEditPostMutation, useGetPostQuery } from "../../api/apiSlice";
import Spinner from "@/component/Spinner/Spinner";
import "./EditPostForm.less";

export default function EditPostForm(
  props: RouteComponentProps<{ postId: string }>
) {
  const { postId } = props.match.params;

  // const post = useSelector(selectPostById(postId));

  const { data: post } = useGetPostQuery(postId);
  const [updatePost, { isLoading }] = useEditPostMutation();

  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");

  // const dispatch = useDispatch();

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const onSaveBtnClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (title.trim() === "") return alert("Please enter the title");

    if (content.trim() === "") return alert("Please give some content");

    // dispatch(postUpdated(postId, title, content));
    await updatePost({ id: postId, title, content });

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
          className="scroll-bar"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <div style={{ display: "flex" }}>
          <button className="btn" onClick={onSaveBtnClick} disabled={isLoading}>
            Edit Post
          </button>
          {isLoading ? (
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
