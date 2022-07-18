import { FetchData } from "../../type";

export type UserData = {
  id: string;
  name: string;
};

export type Users = FetchData<UserData[]>;

export type UserExtraField = Omit<FetchData<UserData[]>, "data">;
