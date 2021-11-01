const initData = 0;
export default function counterReducer (prevState = initData, action: any) {
  const { type, data } = action;

  switch (type) {
    case "increment":
      return prevState + data;
    case "decrement":
      return prevState - data;
    default:
      return prevState;
  }
}
