import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/posts/postSlice";

export default configureStore({
  reducer: {
    posts: postReducer,
  },
});
