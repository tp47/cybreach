import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ForumAPI = createApi({
  reducerPath: 'forumAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/forum' }),
  tagTypes: ['Topic', 'Comments'],
  endpoints: (build) => ({
    fetchAllTopics: build.query({
      query: () => ({
        url: '/topics',
      }),
      providesTags: (result) => ['Topic'],
    }),
    createTopic: build.mutation({
      query: (post) => ({
        url: '/topic',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Topic'],
    }),
    fetchTopic: build.query({
      query: (id) => ({
        url: '/topic/:id',
      }),
    }),
  }),
})
