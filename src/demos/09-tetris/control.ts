import { useSelector, useDispatch } from "react-redux";
import { selectCurBlock, setDropBlocks, selectBoundary } from "./pannelSlice";
import { Operations } from "./type";

export const useControlBlock = () => {
  const { curBlockPos } = useSelector(selectCurBlock);
  const { maxRow } = useSelector(selectBoundary);
  const dispatch = useDispatch();

  return (operation: Operations) => {
    switch (operation) {
      case "DOWN":
        dispatch(
          setDropBlocks(
            curBlockPos.map(({ row, col }) => {
              return {
                row:
                  curBlockPos[curBlockPos.length - 1].row >= maxRow
                    ? row
                    : row + 1,
                col,
              };
            })
          )
        );
        break;

      default:
        break;
    }
  };
};
