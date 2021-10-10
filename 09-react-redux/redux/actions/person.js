import { ADD_PERSON } from "../constant";

export const AddPerosonAction = (personObj) => ({
  type: ADD_PERSON,
  data: personObj,
});
