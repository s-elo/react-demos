import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { client } from "../../api/client";
import { Notifications } from "./notifications";
import { Post } from "../posts/post";
import { Users } from "../users/user";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(
      getState() as { posts: Post; users: Users; notifications: Notifications }
    );
    const latestNotification = allNotifications[0];
    const latestTimestamp = latestNotification ? latestNotification.date : "";
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    );

    return response.data;
  }
);

const slice = createSlice({
  name: "notifications",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  } as Notifications,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNotifications.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "complete";
        state.data.push(...action.payload);
        // Sort with newest first
        state.data.sort((a, b) => b.date.localeCompare(a.date));
      })
      .addCase(fetchNotifications.rejected, (state, _) => {
        state.status = "failed";
      });
  },
});

export default slice.reducer;

export const selectAllNotifications = (state: RootState) =>
  state.notifications.data;

export const selectNotificationFetchStatus = (state: RootState) =>
  state.notifications.status;
