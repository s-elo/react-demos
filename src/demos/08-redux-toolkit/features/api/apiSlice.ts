import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostAddedField, PostUpdatedPayload, PostData } from "../posts/post";

export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: "/fakeApi" }),
  // define all the tags
  tagTypes: ["Posts"] as string[],
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPosts: builder.query<PostData[], void>({
      // The URL for the request is '/fakeApi/posts'
      query: () => "/posts",
      // when the mutation includes one of the tags
      // in the array, this data will be refetched
      // providesTags: ["Post"],
      // it can be a callback as well
      providesTags: (queryRet = [], error, queryArg) => [
        "Posts",
        // specific to a certian post
        ...queryRet.map(({ id }) => ({ type: "Posts", id })),
      ],
      // the cached time when no subscribers
      // 60s by default
      keepUnusedDataFor: 300, // 300s 5min
    }),
    getPost: builder.query<PostData, string>({
      query: (postId) => `/posts/${postId}`,
      providesTags: (queryRet, error, queryArg) =>
        queryRet
          ? ["Posts", { type: "Posts" as "Posts", id: queryRet.id }]
          : ["Posts"],
    }),
    addNewPost: builder.mutation<
      unknown,
      // the other fields will be handled in server-side
      PostAddedField
    >({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        // Include the entire post object as the body of the request
        body: newPost,
      }),
      // when mutating, the query containing the tags will be called
      // but why can we just add to the cached list
      // instead of refetching...
      invalidatesTags: ["Posts"],
    }),
    editPost: builder.mutation<unknown, PostUpdatedPayload>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Posts", id: arg.id }],
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
// use + <endpoints name (capitalized)> + Query|Mutation
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
} = apiSlice;
