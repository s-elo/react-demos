import { INCREMENT, DECREMENT } from "./constant";
import { Dispatch } from "react";
import { AnyAction } from "redux";

// sync action, reutrn an obj
export const incrementAction = (data: number) => ({ type: INCREMENT, data });
export const decrementAction = (data: number) => ({ type: DECREMENT, data });

// async action, return a function
export const incrementAsyncAction = (data: number, time: number) => {
  return (dispatch: Dispatch<AnyAction>) => {
    setTimeout(() => {
      dispatch(incrementAction(data));
    }, time);

    return { type: "asycIncrement" };
  };
};
