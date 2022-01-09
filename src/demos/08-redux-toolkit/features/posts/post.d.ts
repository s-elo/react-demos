import { FetchData } from "../../type";

export type PostData = {
  id: string;
  title: string;
  content: string;
  user: string;
  date: string;
  reactions: {
    thumbsUp: number;
    hooray: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
};

export type Post = FetchData<PostData[]>;

export type PostExtraField = Omit<FetchData<PostData[]>, "data">;

export type PostAddedPayload = PostData;

export type PostUpdatedPayload = {
  id: string;
  title: string;
  content: string;
};

export type PostAddedField = {
  title: string;
  content: string;
  user: string;
};

export type ReactionNames = "thumbsUp" | "hooray" | "heart" | "rocket" | "eyes";

export type ReactionAddedPayload = {
  id: string;
  reactName: ReactionNames;
};
