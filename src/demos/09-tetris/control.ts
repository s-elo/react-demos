import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurBlock,
  setDropBlocks,
  selectBoundary,
  selectPannel,
} from "./pannelSlice";
import { BlockStates, Operations, StartPos } from "./type";

export const useControlBlock = () => {
  const { curDropPos, curDropState, curStartPos } = useSelector(selectCurBlock);
  const { maxRow, maxCol } = useSelector(selectBoundary);

  const getActivePos = useGetActivePos();
  const checkBoundary = useCheckBoundary();

  const dispatch = useDispatch();

  return useCallback(
    (operation: Operations) => {
      if (!checkBoundary(operation)) return "STOPPED";

      switch (operation) {
        case "DOWN":
          const startCol = Math.floor(maxCol / 2) - 1;
          const nextStartPos =
            curDropPos.length === 0 // not shown yet
              ? { row: -2, col: startCol }
              : {
                  row: curStartPos.row + 1,
                  col: curStartPos.col,
                };

          dispatch(
            setDropBlocks({
              startPos: nextStartPos,
              activePos: getActivePos(nextStartPos, curDropState),
            })
          );
          break;

        default:
          break;
      }

      return "DROPPING";
    },
    [
      getActivePos,
      checkBoundary,
      dispatch,
      curDropPos,
      curDropState,
      curStartPos,
      maxRow,
      maxCol,
    ]
  );
};

export const useGetActivePos = () => {
  const { maxRow, maxCol } = useSelector(selectBoundary);

  return useCallback(
    ({ row, col }: StartPos, blockState: BlockStates) => {
      // start pos is the left top pos of a square
      let pos: StartPos[] = [];

      if (blockState === "LU") {
        pos = [
          { row: row + 1, col: col + 2 },
          { row: row + 2, col },
          { row: row + 2, col: col + 1 },
          { row: row + 2, col: col + 2 },
        ];
      }

      if (blockState === "LD") {
        pos = [
          { row: row + 1, col: col },
          { row: row + 1, col: col + 1 },
          { row: row + 1, col: col + 2 },
          { row: row + 2, col },
        ];
      }

      if (blockState === "BLANK") pos = [];

      // only show the valid part
      return pos.filter(
        ({ row, col }) => row >= 0 && row <= maxRow && col >= 0 && col <= maxCol
      );
    },
    [maxRow, maxCol]
  );
};

export const useGenerateBlock = () => {
  const { maxCol } = useSelector(selectBoundary);

  const getActivePos = useGetActivePos();

  const dispatch = useDispatch();
  return useCallback(() => {
    const dropStates: BlockStates[] = ["LU", "LD"];
    // randomly generate
    const dropState =
      dropStates[Math.round(Math.random() * (dropStates.length - 1))];
    const nextStartPos = { row: -2, col: Math.floor(maxCol / 2) - 1 };

    dispatch(
      setDropBlocks({
        startPos: nextStartPos,
        activePos: getActivePos(nextStartPos, dropState),
        dropState,
        clearPrev: false, // preserve previous blocks
      })
    );
  }, [maxCol, getActivePos, dispatch]);
};

export const useCheckBoundary = () => {
  const { pannel, maxRow, maxCol, curDropPos } = useSelector(selectPannel);

  return useCallback(
    (operation: Operations) => {
      if (
        operation === "DOWN" &&
        curDropPos.some(
          ({ row, col }) =>
            row + 1 > maxRow || // exceed the maximum value
            (pannel[row + 1][col].isActive && // next pos is active
              !curDropPos.some(
                // and next pos is not included in curDropPos
                ({ row: row_, col: col_ }) => row_ === row + 1 && col_ === col
              ))
        )
      ) {
        return false;
      }

      return true;
    },
    [pannel, maxRow, maxCol, curDropPos]
  );
};
