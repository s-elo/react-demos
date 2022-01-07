export type Post = {
  id: string;
  title: string;
  content: string;
  userId: string;
  date: string;
  reactions: {
    thumbsUp: number;
    hooray: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
};

export type PostAddedPayload = Post;

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
