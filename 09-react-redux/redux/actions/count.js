import { INCREMENT, DECREMENT } from "../constant";

// sync action, reutrn an obj
export const incrementAction = (data) => ({ type: INCREMENT, data });
export const decrementAction = (data) => ({ type: DECREMENT, data });

// async action, return a function
export const incrementAsyncAction = (data, time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(incrementAction(data));
    }, time);
  };
};
