import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: nanoid(),
    title: "Second Post",
    content: "something else",
    userId: "0",
  },
  { id: nanoid(), title: "First Post", content: "nothing else", userId: "1" },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.unshift(action.payload);
      },

      // this callback help us create the payload object
      // so that we dont need do this every time in components
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
          },
        };
      },
    },

    postUpdated: {
      reducer(state, action) {
        const { id, title, content } = action.payload;

        const prevPost = state.find((post) => post.id === id);
        if (prevPost) {
          prevPost.title = title;
          prevPost.content = content;
        }
      },

      prepare(id, title, content, userId) {
        return {
          payload: {
            id,
            title,
            content,
            userId,
          },
        };
      },
    },
  },
});

export const { postAdded, postUpdated } = postSlice.actions;

export default postSlice.reducer;
