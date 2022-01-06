import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: nanoid(), title: "Second Post", content: "something else" },
  { id: nanoid(), title: "First Post", content: "nothing else" },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action) {
      state.unshift(action.payload);
    },

    postUpdated(state, action) {
      const { id, title, content } = action.payload;

      const prevPost = state.find((post) => post.id === id);
      if (prevPost) {
        prevPost.title = title;
        prevPost.content = content;
      }
    },
  },
});

export const { postAdded, postUpdated } = postSlice.actions;

export default postSlice.reducer;
