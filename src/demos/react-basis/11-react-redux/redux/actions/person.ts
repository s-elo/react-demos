import { ADD_PERSON } from "../constant";
import { Person } from "../type";


export const AddPerosonAction = (personObj: Person) => ({
  type: ADD_PERSON,
  data: personObj,
});
