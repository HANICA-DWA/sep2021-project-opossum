import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/v1/' }),
  endpoints: (builder) => ({
    getPrinciples: builder.query({
      query: () => '/wcag/principles',
    }),
    getGuidelines: builder.query({
      query: () => '/wcag/guidelines',
    }),
    getSuccessCriteria: builder.query({
      query: () => '/wcag/successcriteria',
    }),
  }),
})

// Hooks
export const { useGetPrinciplesQuery, useGetGuidelinesQuery, useGetSuccessCriteriaQuery } = api
