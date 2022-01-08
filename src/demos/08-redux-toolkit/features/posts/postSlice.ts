import {
  createSlice,
  nanoid,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import {
  Post,
  PostAddedPayload,
  PostUpdatedPayload,
  ReactionAddedPayload,
  PostAddedField,
} from "./post";
import { RootState } from "../../store";
import { client } from "../../api/client";

const initialState: Post = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const resp = await client.get("/fakeApi/posts");

  return resp.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async ({ title, content, user }: PostAddedField) => {
    const newPost = {
      id: nanoid(),
      title,
      content,
      user,
      date: new Date().toISOString(),
      reactions: {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    };

    const resp = await client.post("/fakeApi/posts", newPost);

    // The response includes the complete post object, including unique ID
    return resp.data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // sync added, addNewPost is aync for AJAX
    postAdded: {
      reducer(state, action: PayloadAction<PostAddedPayload>) {
        state.data.unshift(action.payload);
      },

      // this callback help us create the payload object
      // so that we dont need do this every time in components
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
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

        const prevPost = state.data.find((post) => post.id === id);
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

      const prevPost = state.data.find((post) => post.id === id);
      if (prevPost) {
        prevPost.reactions[reactName]++;
      }
    },
  },

  // for async reducers
  extraReducers(builder) {
    // for fetch posts
    builder
      .addCase(fetchPosts.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "complete";
        // Add any fetched posts to the array
        state.data = action.payload;
        // Sort posts in reverse chronological order by datetime string
        state.data.sort((a, b) => b.date.localeCompare(a.date));
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // for save post
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.data.unshift(action.payload);
    });
  },
});

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts.data;
export const selectPostFetchStatus = (state: RootState) => state.posts.status;
export const selectPostById = (postId: string) => (state: RootState) =>
  state.posts.data.find((post) => post.id === postId);

// here using the posts.filter which will return a new reference
// and it leads to rerender even the posts doesnt change when other states changed in other places
// createSelector can return a memorized selector to avoid this unneccessary rerender
export const selectPostByUser = (userId: string) =>
  createSelector([selectAllPosts], (posts) =>
    posts.filter((post) => post.user === userId)
  );

export default postSlice.reducer;
