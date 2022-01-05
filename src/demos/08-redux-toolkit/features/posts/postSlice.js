import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: nanoid(), title: "First Post", content: "nothing else" },
  { id: nanoid(), title: "Second Post", content: "something else" },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload);
    },
  },
});

export const { postAdded } = postSlice.actions;

export default postSlice.reducer;
