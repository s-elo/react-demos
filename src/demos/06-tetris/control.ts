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
  setActive,
  setDisactive,
  selectInfo,
} from "./pannelSlice";
import { getActivePos, rotateFsm } from "./utils";
import {
  BlockStates,
  GameLevel,
  GameStates,
  Operations,
  SetActivePayload,
  StartPos,
} from "./type";

export const useController = () => {
  const { curDropPos, curDropState, curStartPos } = useSelector(selectCurBlock);
  const gameState = useSelector(selectGameState);
  const { maxRow, maxCol } = useSelector(selectBoundary);
  const { level } = useSelector(selectInfo);

  const initBlock = useGenerateBlock();
  const checkBoundary = useCheckBoundary();

  const dispatch = useDispatch();

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const moveFnRef = useRef<
    ((operation: Operations) => "STOPPED" | "DROPPING") | null
  >(null);
  const restartFnRef = useRef<(() => void) | null>(null);
  const initBlockFnRef = useRef<(() => void) | null>(null);
  const gameStateRef = useRef<GameStates>("DROPPING");
  const curDropPosRef = useRef<SetActivePayload>([]);
  const levelRef = useRef<GameLevel>("kid");

  const globalTimerCallBack = () => {
    if (!moveFnRef.current) return;
    if (
      gameStateRef.current === "RESTARTING" ||
      gameStateRef.current === "PAUSING"
    )
      return;

    if (
      curDropPosRef.current.length === 0 ||
      gameStateRef.current === "CANCELLING" ||
      gameStateRef.current === "CANCELLED"
    ) {
      initBlockFnRef.current && initBlockFnRef.current();
      return;
    }

    const status = moveFnRef.current("DOWN");

    if (status === "STOPPED" && gameStateRef.current === "DROPPING") {
      if (
        curDropPosRef.current &&
        curDropPosRef.current.some(({ row }) => row <= 0)
      ) {
        restartFnRef.current && restartFnRef.current();
      } else {
        initBlockFnRef.current && initBlockFnRef.current();
      }
    }
  };

  return useMemo(() => {
    const controller = {
      start() {
        dispatch(setGameState("DROPPING"));
        if (timerRef.current != null) return;

        const speed =
          level === "kid"
            ? 1000
            : level === "adult"
            ? 700
            : level === "elder"
            ? 500
            : 200;
        timerRef.current = setInterval(globalTimerCallBack, speed);
      },
      pause() {
        if (!timerRef.current) return;
        dispatch(setGameState("PAUSING"));
      },
      move(operation: Operations) {
        if (gameState !== "DROPPING") return "STOPPED";

        const validStep = checkBoundary(operation);
        if (validStep === false || validStep === 0) return "STOPPED";

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
            case "FAST_DOWN":
            case "DROP":
              nextStartPos = {
                row: curStartPos.row + (validStep as number),
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
      restart() {
        dispatch(setGameState("RESTARTING"));

        Promise.all(
          new Array(maxCol + 1).fill(0).map(
            (_, col) =>
              new Promise<NodeJS.Timer>((res) => {
                let row = maxRow;

                const refreshTimer: NodeJS.Timer = setInterval(() => {
                  if (row < 0) return res(refreshTimer);

                  dispatch(setActive([{ row, col }]));

                  row--;
                }, 50);
              })
          )
        ).then((timers) => {
          timers.forEach((timer) => clearInterval(timer));

          dispatch(setDisactive("All"));
        });
      },
    };

    // every time changes, update the ref so that the timer can use the latest function
    moveFnRef.current = controller.move;
    restartFnRef.current = controller.restart;
    initBlockFnRef.current = initBlock;
    gameStateRef.current = gameState;
    curDropPosRef.current = curDropPos;

    // update speed
    if (level !== levelRef.current) {
      levelRef.current = level;
      timerRef.current && clearInterval(timerRef.current);

      const speed =
        level === "kid"
          ? 1000
          : level === "adult"
          ? 700
          : level === "elder"
          ? 500
          : 200;

      timerRef.current = setInterval(globalTimerCallBack, speed);
    }

    return controller;
  }, [
    initBlock,
    checkBoundary,
    dispatch,
    curDropPos,
    curDropState,
    curStartPos,
    maxCol,
    maxRow,
    level,
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

      if (operation === "FAST_DOWN" || operation === "DROP") {
        const dropStep = 3;
        let validStep = Infinity;

        for (const { row, col } of curDropPos) {
          let validStepPerBlock = 0;

          for (
            let i = 1;
            i <= (operation === "FAST_DOWN" ? dropStep : maxRow - row);
            i++
          ) {
            if (
              row + i > maxRow ||
              (pannel[row + i][col].isActive &&
                !curDropPos.some(
                  // and pos is not included in curDropPos
                  ({ row: row_, col: col_ }) => row_ === row + i && col_ === col
                ))
            ) {
              validStep = Math.min(validStep, validStepPerBlock);
              break;
            }

            validStepPerBlock++;
          }

          validStep = Math.min(validStep, validStepPerBlock);
        }

        return validStep;
      }

      return true;
    },
    [pannel, maxRow, maxCol, curDropPos, curStartPos, curDropState]
  );
};
