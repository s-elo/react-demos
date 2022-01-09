import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { client } from "../../api/client";
import { NotificationData, NotificationExtraField } from "./notifications";

const notificationAdapter = createEntityAdapter<NotificationData>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = notificationAdapter.getInitialState({
  status: "idle",
  error: null,
} as NotificationExtraField);

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState() as RootState);
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
  initialState,
  reducers: {
    markAsRead(state) {
      Object.values(state.entities).forEach((notification) => {
        notification!.isRead = true;
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNotifications.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(
        fetchNotifications.fulfilled,
        (state, action: PayloadAction<NotificationData[]>) => {
          state.status = "complete";
          // newly fetched mark as no read
          action.payload.forEach((notification) => {
            notification.isRead = false;
          });

          notificationAdapter.upsertMany(state, action.payload);
        }
      )
      .addCase(fetchNotifications.rejected, (state, _) => {
        state.status = "failed";
      });
  },
});

export const { markAsRead } = slice.actions;

export default slice.reducer;

export const { selectAll: selectAllNotifications } =
  notificationAdapter.getSelectors((state: RootState) => state.notifications);
export const selectNotificationFetchStatus = (state: RootState) =>
  state.notifications.status;
