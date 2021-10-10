import { ADD_PERSON } from "../constant";

const initData = [{ id: 1, name: "leo", age: "22" }];
export default function personReducer(prevState = initData, action) {
  const { type, data } = action;
  switch (type) {
    case ADD_PERSON:
      // must return a new reference!!
      // reudx will have a shallow comparsion
      return [data, ...prevState];
    default:
      return prevState;
  }
}
