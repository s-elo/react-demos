import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/posts/postSlice";
import userReducer from "./features/users/userSlice";
import notificationReducer from "./features/notifications/notificationSlice";
import { apiSlice } from "./features/api/apiSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
    notifications: notificationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // This middleware must be added as well - it manages cache lifetimes and expiration
  // We need to keep all of the existing standard middleware like redux-thunk in the store setup,
  // which leads to the use of concat
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
