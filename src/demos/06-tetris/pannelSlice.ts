import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {
  SetActivePayload,
  SetDropBlock,
  DefaultPannel,
  GameStates,
} from "./type";

const defaultPannelWidth = 294;
const defaultPannelHeight = 404;
const defaultPannel: { isActive: boolean; isCancelling: boolean }[][] =
  new Array(~~(defaultPannelHeight / 22)).fill(
    new Array(~~(defaultPannelWidth / 22)).fill({
      isActive: false,
      isCancelling: false,
    })
  );

const pannelSlice = createSlice({
  name: "pannel",
  initialState: {
    pannelWidth: defaultPannelWidth,
    pannelHeight: defaultPannelHeight,
    maxRow: ~~(defaultPannelHeight / 22) - 1,
    maxCol: ~~(defaultPannelWidth / 22) - 1,
    pannel: defaultPannel,
    curDropState: "B",
    curStartPos: { row: 0, col: 0 },
    curDropPos: [],
    gameState: "DROPPING",
    topCancelledRow: 0,
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

    setGameState(state, action: PayloadAction<GameStates>) {
      const gameState = action.payload;
      state.gameState = gameState;
    },

    cancelBlocks(state, action: PayloadAction<number[]>) {
      const cancelRows = action.payload;

      cancelRows.forEach((row) =>
        state.pannel[row].forEach((block) => {
          block.isActive = false;
          block.isCancelling = true;
        })
      );

      state.gameState = "CANCELLING";
      state.topCancelledRow = cancelRows[0];
    },

    downBlocksAfterCancellation(state) {
      // down after cancellation
      for (let row = state.topCancelledRow - 1; row >= 0; row--) {
        state.pannel[row].forEach((block, col) => {
          if (!block.isActive) return;

          // find the lowest postition
          for (let r = row; r <= state.maxRow; r++) {
            if (r === state.maxRow || state.pannel[r + 1][col].isActive) {
              state.pannel[row][col].isActive = false;
              state.pannel[r][col].isActive = true;
              return;
            }
          }
        });
      }

      // set isCancelling status as false
      for (let row = state.topCancelledRow; row <= state.maxRow; row++) {
        state.pannel[row].forEach((block, col) => {
          if (block.isCancelling) state.pannel[row][col].isCancelling = false;
        });
      }

      state.topCancelledRow = 0;
      state.gameState = "CANCELLED";
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

      dropState && (state.curDropState = dropState);

      state.curDropPos = activePos;
      state.curStartPos = startPos;
      state.gameState = "DROPPING";
    },
  },
});

export default pannelSlice.reducer;
export const {
  setActive,
  setDisactive,
  setDropBlocks,
  setGameState,
  cancelBlocks,
  downBlocksAfterCancellation,
} = pannelSlice.actions;

export const selectGameState = (state: RootState) => state.pannel.gameState;
export const selectPannel = (state: RootState) => state.pannel;
export const selectPannelPos = (state: RootState) => state.pannel.pannel;
export const selectCurBlock = (state: RootState) => ({
  curDropPos: state.pannel.curDropPos,
  curStartPos: state.pannel.curStartPos,
  curDropState: state.pannel.curDropState,
});
export const selectBoundary = (state: RootState) => ({
  maxRow: state.pannel.maxRow,
  maxCol: state.pannel.maxCol,
});
