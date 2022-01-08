import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Users } from "./user";
import { client } from "../../api/client";

const initialState: Users = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const resp = await client.get("/fakeApi/users");

  return resp.data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // same as state = action.payload
      return action.payload;
    });
  },
});

export const selectAllUsers = (state: RootState) => state.users;
export const selectUserById = (userId: string) => (state: RootState) =>
  state.users.find((user) => user.id === userId);

export default userSlice.reducer;
