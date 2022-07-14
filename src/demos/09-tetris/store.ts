import { configureStore } from "@reduxjs/toolkit";
import pannelReducer from "./pannelSlice";

const store = configureStore({
  reducer: {
    pannel: pannelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
