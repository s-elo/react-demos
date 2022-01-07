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

export type PostFetchStatus = "idle" | "loading" | "complete" | "failed";
export type PostFetchError = string | null | undefined;

export type Post = {
  data: PostData[];
  status: PostFetchStatus;
  error: PostFetchError;
};

export type PostAddedPayload = PostData;

export type PostUpdatedPayload = {
  id: string;
  title: string;
  content: string;
};

export type ReactionNames = "thumbsUp" | "hooray" | "heart" | "rocket" | "eyes";

export type ReactionAddedPayload = {
  id: string;
  reactName: ReactionNames;
};
