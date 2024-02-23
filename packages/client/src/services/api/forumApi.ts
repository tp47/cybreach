import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ForumAPI = createApi({
  reducerPath: 'forumAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/forum' }),
  tagTypes: ['Topic', 'Topics', 'Comments'],
  endpoints: (build) => ({
    createAuthor: build.mutation({
      query: (author) => ({
        url: '/author',
        method: 'POST',
        body: author,
      }),
    }),
    fetchAllTopics: build.query({
      query: () => ({
        url: '/topics',
      }),
      providesTags: (result) => ['Topics'],
    }),
    createTopic: build.mutation({
      query: (post) => ({
        url: '/topic',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Topics'],
    }),
    fetchTopic: build.query({
      query: (id) => ({
        url: `/topic/${id}`,
      }),
      providesTags: ['Topic'],
    }),
    createComment: build.mutation({
      query: (comment) => ({
        url: '/comments',
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: ['Comments', 'Topic'],
    }),
  }),
})

export const {
  useCreateAuthorMutation,
  useFetchAllTopicsQuery,
  useCreateTopicMutation,
  useFetchTopicQuery,
  useCreateCommentMutation,
} = ForumAPI
