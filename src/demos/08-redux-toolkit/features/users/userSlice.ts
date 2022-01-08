import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Users } from "./user";
import { client } from "../../api/client";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const resp = await client.get("/fakeApi/users");

  return resp.data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  } as Users,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "complete";
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, _) => {
        state.status = "failed";
      });
  },
});

export const selectAllUsers = (state: RootState) => state.users.data;
export const selectUserById = (userId: string) => (state: RootState) =>
  state.users.data.find((user) => user.id === userId);
export const selectUserFetchStatus = (state: RootState) => state.users.status;

export default userSlice.reducer;
