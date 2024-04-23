import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ForumAPI = createApi({
  reducerPath: 'forumAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/forum' }),
  tagTypes: ['Topic', 'Topics', 'Comments', 'Reactions'],
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
    createReaction: build.mutation({
      query: (reaction) => ({
        url: '/reactions',
        method: 'POST',
        body: reaction,
      }),
      invalidatesTags: ['Comments', 'Topic'],
    }),
    deleteTopic: build.mutation({
      query: (topicId) => ({
        url: `/topic/${topicId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Topics'],
    }),
    editTopic: build.mutation({
      query: ({ topicId, title, description }) => ({
        url: `/topic/${topicId}`,
        method: 'PUT',
        body: { title, description },
      }),
      invalidatesTags: ['Topics'],
    }),
    deleteComment: build.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments', 'Topic'],
    }),
    editComment: build.mutation({
      query: ({ commentId, content }) => ({
        url: `/comments/${commentId}`,
        method: 'PUT',
        body: { content },
      }),
      invalidatesTags: ['Comments'],
    }),
    deleteReaction: build.mutation({
      query: (reactionId) => ({
        url: `/reactions/${reactionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reactions'],
    }),
    editReaction: build.mutation({
      query: ({ reactionId, type }) => ({
        url: `/reactions/${reactionId}`,
        method: 'PUT',
        body: { type },
      }),
      invalidatesTags: ['Reactions'],
    }),
  }),
})

export const {
  useCreateAuthorMutation,
  useFetchAllTopicsQuery,
  useCreateTopicMutation,
  useFetchTopicQuery,
  useEditTopicMutation,
  useDeleteTopicMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useCreateReactionMutation,
  useEditReactionMutation,
  useDeleteReactionMutation,
} = ForumAPI
