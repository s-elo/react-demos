import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { SetActivePayload, SetDropBlock, DefaultPannel } from "./type";

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

const pannelSlice = createSlice({
  name: "pannel",
  initialState: {
    pannelWidth: defaultPannelWidth,
    pannelHeight: defaultPannelHeight,
    maxRow: ~~(defaultPannelHeight / 22) - 1,
    maxCol: ~~(defaultPannelWidth / 22) - 1,
    pannel: defaultPannel,
    curDropState: "BLANK",
    curStartPos: { row: 0, col: 0 },
    curDropPos: [],
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

    setDropBlocks(state, action: PayloadAction<SetDropBlock>) {
      const {
        startPos,
        activePos,
        dropState,
        clearPrev = true,
      } = action.payload;

      // disactivate the previous blocks if it is true
      clearPrev &&
        state.curDropPos.forEach(({ row, col }) => {
          state.pannel[row][col].isActive = false;
        });

      // activate the new blocks
      activePos.forEach(({ row, col }) => {
        state.pannel[row][col].isActive = true;
      });

      state.curDropPos = activePos;
      state.curStartPos = startPos;

      dropState && (state.curDropState = dropState);
    },
  },
});

export default pannelSlice.reducer;
export const { setActive, setDisactive, setDropBlocks } = pannelSlice.actions;

export const selectPannel = (state: RootState) => state.pannel;
export const selectCurBlock = (state: RootState) => ({
  curDropPos: state.pannel.curDropPos,
  curStartPos: state.pannel.curStartPos,
  curDropState: state.pannel.curDropState,
});
export const selectBoundary = (state: RootState) => ({
  maxRow: state.pannel.maxRow,
  maxCol: state.pannel.maxCol,
});
