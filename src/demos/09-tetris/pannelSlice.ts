import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { SetActivePayload, DefaultPannel } from "./type";

const defaultPannelWidth = 294;
const defaultPannelHeight = 404;
const defaultPannel: { isActive: boolean }[][] = new Array(
  ~~(defaultPannelHeight / 22)
).fill(
  new Array(~~(defaultPannelWidth / 22)).fill({
    isActive: false,
  })
);

// const initPosMap = {
// L: [
//   { row: 0, col: 0 },
//   { row: 1, col: 0 },
//   { row: 2, col: 0 },
//   { row: 2, col: 1 },
// ]
// };

// const getActivePos = {
//   L: ({row, col}: StartPos) => {
//     if (row < -3) return
//   },
// };

const pannelSlice = createSlice({
  name: "pannel",
  initialState: {
    pannelWidth: defaultPannelWidth,
    pannelHeight: defaultPannelHeight,
    maxRow: ~~(defaultPannelHeight / 22) - 1,
    maxCol: ~~(defaultPannelWidth / 22) - 1,
    pannel: defaultPannel,
    curShape: "BLANK",
    dropBlocks: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
    ],
  } as DefaultPannel,
  reducers: {
    setActive(state, action: PayloadAction<SetActivePayload>) {
      const activePos = action.payload;

      activePos.forEach(({ row, col }) => {
        state.pannel[row][col].isActive = true;
      });
    },

    setDisactive(state, action: PayloadAction<SetActivePayload>) {
      const activePos = action.payload;

      activePos.forEach(({ row, col }) => {
        state.pannel[row][col].isActive = false;
      });
    },

    setDropBlocks(state, action: PayloadAction<SetActivePayload>) {
      // disactivate the previous blocks
      state.dropBlocks.forEach(({ row, col }) => {
        state.pannel[row][col].isActive = false;
      });

      // activate the new blocks
      const curDropBlocks = action.payload;
      curDropBlocks.forEach(({ row, col }) => {
        state.pannel[row][col].isActive = true;
      });

      state.dropBlocks = curDropBlocks;
    },
  },
});

export default pannelSlice.reducer;
export const { setActive, setDisactive, setDropBlocks } = pannelSlice.actions;

export const selectPannel = (state: RootState) => state.pannel;
export const selectCurBlock = (state: RootState) => ({
  curBlockPos: state.pannel.dropBlocks,
  curBlockShape: state.pannel.curShape,
});
export const selectBoundary = (state: RootState) => ({
  maxRow: state.pannel.maxRow,
  maxCol: state.pannel.maxCol,
});
