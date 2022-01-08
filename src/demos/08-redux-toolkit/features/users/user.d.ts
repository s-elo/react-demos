import { FetchData } from "../../type";

export type User = {
  id: string;
  name: string;
};

export type UserData = User[];

export type Users = FetchData<UserData>;
