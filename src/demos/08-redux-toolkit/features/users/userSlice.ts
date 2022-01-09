import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityId,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { UserData, UserExtraField } from "./user";
import { client } from "../../api/client";

const userAdapter = createEntityAdapter<UserData>();

const initialState = userAdapter.getInitialState({
  status: "idle",
  error: null,
} as UserExtraField);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const resp = await client.get("/fakeApi/users");

  return resp.data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "complete";
        userAdapter.setAll(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state, _) => {
        state.status = "failed";
      });
  },
});

const { selectAll, selectById } = userAdapter.getSelectors(
  (state: RootState) => state.users
);

export const selectAllUsers = selectAll;
export const selectUserById = (userId: EntityId) => (state: RootState) =>
  selectById(state, userId);
export const selectUserFetchStatus = (state: RootState) => state.users.status;

export default userSlice.reducer;
