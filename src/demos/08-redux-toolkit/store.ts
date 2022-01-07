import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/posts/postSlice";
import userReducer from "./features/users/userSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
