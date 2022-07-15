import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurBlock, setDropBlocks, selectBoundary } from "./pannelSlice";
import { BlockStates, Operations, StartPos } from "./type";

export const useControlBlock = () => {
  const { curDropPos, curDropState, curStartPos } = useSelector(selectCurBlock);
  const { maxRow, maxCol } = useSelector(selectBoundary);

  const getActivePos = useGetActivePos();

  const dispatch = useDispatch();

  return useCallback(
    (operation: Operations) => {
      switch (operation) {
        case "DOWN":
          // check boundary
          if (curDropPos.some(({ row }) => row + 1 > maxRow)) return "STOPPED";

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
      if (blockState === "LU") {
        const pos = [
          { row: row + 1, col: col + 2 },
          { row: row + 2, col },
          { row: row + 2, col: col + 1 },
          { row: row + 2, col: col + 2 },
        ];

        // only show the valid part
        return pos.filter(
          ({ row, col }) =>
            row >= 0 && row <= maxRow && col >= 0 && col <= maxCol
        );
      }

      return [];
    },
    [maxRow, maxCol]
  );
};

export const useGenerateBlock = () => {
  const { maxCol } = useSelector(selectBoundary);

  const getActivePos = useGetActivePos();

  const dispatch = useDispatch();

  return useCallback(() => {
    const nextStartPos = { row: -2, col: Math.floor(maxCol / 2) - 1 };
    const dropState = "LU";

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
