import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const defaultPannelWidth = 294;
const defaultPannelHeight = 404;
const defaultPannel: { isActive: boolean }[][] = new Array(
  ~~(defaultPannelHeight / 22)
).fill(
  new Array(~~(defaultPannelWidth / 22)).fill({
    isActive: false,
  })
);

const pannelSlice = createSlice({
  name: "pannel",
  initialState: {
    pannelWidth: defaultPannelWidth,
    pannelHeight: defaultPannelHeight,
    pannel: defaultPannel,
  },
  reducers: {},
});

export default pannelSlice.reducer;

export const selectPannel = (state: RootState) => state.pannel;
