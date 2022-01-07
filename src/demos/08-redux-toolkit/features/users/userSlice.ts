import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "leo" },
  { id: "1", name: "pit" },
  { id: "2", name: "git" },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
