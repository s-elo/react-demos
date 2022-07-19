import { useCallback, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurBlock,
  setDropBlocks,
  selectBoundary,
  selectPannel,
  selectGameState,
  cancelBlocks,
  downBlocksAfterCancellation,
  setGameState,
} from "./pannelSlice";
import { getActivePos, rotateFsm } from "./utils";
import { BlockStates, GameStates, Operations, StartPos } from "./type";

export const useController = () => {
  const { curDropPos, curDropState, curStartPos } = useSelector(selectCurBlock);
  const gameState = useSelector(selectGameState);
  const { maxCol } = useSelector(selectBoundary);

  const initBlock = useGenerateBlock();
  const checkBoundary = useCheckBoundary();

  const dispatch = useDispatch();

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const moveFnRef = useRef<
    ((operation: Operations) => "STOPPED" | "DROPPING") | null
  >(null);
  const initBlockFnRef = useRef<(() => void) | null>(null);
  const gameStateRef = useRef<GameStates>("DROPPING");

  return useMemo(() => {
    const controller = {
      start() {
        dispatch(setGameState("DROPPING"));
        if (timerRef.current != null) return;

        // when no block dropping, generate one
        curDropPos.length === 0 && initBlock();

        timerRef.current = setInterval(() => {
          if (!moveFnRef.current) return;

          if (
            gameStateRef.current === "CANCELLING" ||
            gameStateRef.current === "CANCELLED"
          ) {
            initBlockFnRef.current && initBlockFnRef.current();
            return;
          }

          const status = moveFnRef.current("DOWN");

          if (status === "STOPPED" && gameStateRef.current === "DROPPING") {
            initBlockFnRef.current && initBlockFnRef.current();
          }
        }, 500);
      },
      pause() {
        if (!timerRef.current) return;
        clearInterval(timerRef.current);
        timerRef.current = null;
        dispatch(setGameState("PAUSING"));
      },
      move(operation: Operations) {
        if (gameState === "PAUSING") return "STOPPED";
        if (!checkBoundary(operation)) return "STOPPED";

        let nextStartPos: StartPos;
        if (curDropPos.length === 0) {
          // not shown yet
          nextStartPos = { row: -2, col: Math.floor(maxCol / 2) - 1 };
        } else {
          switch (operation) {
            case "DOWN":
              nextStartPos = {
                row: curStartPos.row + 1,
                col: curStartPos.col,
              };
              break;
            case "LEFT":
              nextStartPos = {
                row: curStartPos.row,
                col: curStartPos.col - 1,
              };
              break;
            case "RIGHT":
              nextStartPos = {
                row: curStartPos.row,
                col: curStartPos.col + 1,
              };
              break;
            case "ROTATE":
              nextStartPos = {
                row: curStartPos.row,
                col: curStartPos.col,
              };
              break;
            default:
              nextStartPos = { row: -2, col: Math.floor(maxCol / 2) - 1 };
              break;
          }
        }

        dispatch(
          setDropBlocks({
            startPos: nextStartPos,
            activePos: getActivePos(
              nextStartPos,
              operation === "ROTATE" ? rotateFsm(curDropState) : curDropState
            ),
            dropState:
              operation === "ROTATE" ? rotateFsm(curDropState) : curDropState,
          })
        );

        return "DROPPING";
      },
    };

    // every time changes, update the ref so that the timer can use the latest function
    moveFnRef.current = controller.move;
    initBlockFnRef.current = initBlock;
    gameStateRef.current = gameState;

    return controller;
  }, [
    initBlock,
    checkBoundary,
    dispatch,
    curDropPos,
    curDropState,
    curStartPos,
    maxCol,
    gameState,
  ]);
};

export const useGenerateBlock = () => {
  const { pannel, gameState, maxCol } = useSelector(selectPannel);

  const dispatch = useDispatch();

  return useCallback(() => {
    // check if there is any row can be cancelled
    const cancellRows = pannel.reduce((cancelledRows, row, idx) => {
      row.every((block) => block.isActive === true) && cancelledRows.push(idx);
      return cancelledRows;
    }, [] as number[]);

    if (
      (gameState === "DROPPING" || gameState === "CANCELLED") &&
      cancellRows.length
    ) {
      dispatch(cancelBlocks(cancellRows));
      return;
    }

    // down after cancellation
    if (gameState === "CANCELLING") {
      dispatch(downBlocksAfterCancellation());
      return;
    }

    const dropStates: BlockStates[] = [
      "LU",
      "JU",
      "TU",
      "SU",
      "ZU",
      "IU",
      "OU",
    ];
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
  }, [maxCol, gameState, pannel, dispatch]);
};

export const useCheckBoundary = () => {
  const { pannel, maxRow, maxCol, curDropPos, curStartPos, curDropState } =
    useSelector(selectPannel);

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

      if (
        operation === "LEFT" &&
        curDropPos.some(
          ({ row, col }) =>
            col - 1 < 0 || // less than minimum value
            (pannel[row][col - 1].isActive && // next pos is active
              !curDropPos.some(
                // and next pos is not included in curDropPos
                ({ row: row_, col: col_ }) => row_ === row && col_ === col - 1
              ))
        )
      ) {
        return false;
      }

      if (
        operation === "RIGHT" &&
        curDropPos.some(
          ({ row, col }) =>
            col + 1 > maxCol || // bigger than maximum value
            (pannel[row][col + 1].isActive && // next pos is active
              !curDropPos.some(
                // and next pos is not included in curDropPos
                ({ row: row_, col: col_ }) => row_ === row && col_ === col + 1
              ))
        )
      ) {
        return false;
      }

      if (operation === "ROTATE") {
        const rotatedPos = getActivePos(
          curStartPos,
          rotateFsm(curDropState),
          false
        );

        if (
          rotatedPos.some(
            ({ row, col }) =>
              !(row >= 0 && row <= maxRow && col >= 0 && col <= maxCol) || // outside boundary
              (pannel[row][col].isActive && // rotated pos is active
                !curDropPos.some(
                  // and rotated pos is not included in curDropPos
                  ({ row: row_, col: col_ }) => row_ === row && col_ === col
                ))
          )
        )
          return false;
      }

      return true;
    },
    [pannel, maxRow, maxCol, curDropPos, curStartPos, curDropState]
  );
};
