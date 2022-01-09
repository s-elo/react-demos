import {
  createSlice,
  nanoid,
  createAsyncThunk,
  PayloadAction,
  createSelector,
  createEntityAdapter,
  EntityId,
} from "@reduxjs/toolkit";
import {
  PostData,
  PostExtraField,
  PostAddedPayload,
  PostUpdatedPayload,
  ReactionAddedPayload,
  PostAddedField,
} from "./post";
import { RootState } from "../../store";
import { client } from "../../api/client";

// instead of using array, now using Map kind of method to store the data
// so that we can get the item by id without iterating the entire array
const postAdapter = createEntityAdapter<PostData>({
  // Sort posts in reverse chronological order by datetime string
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

// {status: 'idle', error: null} is the extra field plus entities field
// The type of the state is inferred here
const initialState = postAdapter.getInitialState({
  status: "idle",
  error: null,
} as PostExtraField);

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
        state.entities[action.payload.id] = action.payload;
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

        const prevPost = state.entities[id];
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

      const prevPost = state.entities[id];
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
        // if there's any items in action.payload that already existing in our state,
        // the upsertMany function will merge them together based on matching IDs
        postAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // for save post
    // Use the `addOne` reducer for the fulfilled case
    builder.addCase(addNewPost.fulfilled, postAdapter.addOne);
  },
});

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
const {
  selectAll,
  selectById,
  selectIds,
  // Pass in a selector that returns the posts slice of state
} = postAdapter.getSelectors((state: RootState) => state.posts);

export const selectAllPosts = selectAll;
export const selectPostById = (postId: EntityId) => (state: RootState) =>
  selectById(state, postId);
export const selectPostIds = selectIds;
export const selectPostFetchStatus = (state: RootState) => state.posts.status;

// here using the posts.filter which will return a new reference
// and it leads to rerender even the posts doesnt change when other states changed in other places
// createSelector can return a memorized selector to avoid this unneccessary rerender
export const selectPostByUser = (userId: string) =>
  createSelector([selectAllPosts], (posts) =>
    posts.filter((post) => post.user === userId)
  );

export default postSlice.reducer;
