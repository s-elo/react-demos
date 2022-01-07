import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import {
  PostAddedPayload,
  PostUpdatedPayload,
  ReactionAddedPayload,
} from "./post";

const initialState = [
  {
    id: nanoid(),
    title: "Second Post",
    content: "something else",
    userId: "0",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: nanoid(),
    title: "First Post",
    content: "nothing else",
    userId: "1",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<PostAddedPayload>) {
        state.unshift(action.payload);
      },

      // this callback help us create the payload object
      // so that we dont need do this every time in components
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        };
      },
    },

    postUpdated: {
      reducer(state, action: PayloadAction<PostUpdatedPayload>) {
        const { id, title, content } = action.payload;

        const prevPost = state.find((post) => post.id === id);
        if (prevPost) {
          prevPost.title = title;
          prevPost.content = content;
        }
      },

      prepare(id: string, title: string, content: string) {
        return {
          payload: {
            id,
            title,
            content,
          },
        };
      },
    },

    reactionAdded(state, action: PayloadAction<ReactionAddedPayload>) {
      const { id, reactName } = action.payload;

      const prevPost = state.find((post) => post.id === id);
      if (prevPost) {
        prevPost.reactions[reactName]++;
      }
    },
  },
});

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
