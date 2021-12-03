import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/v1/' }),
  tagTypes: ['Annotation'],
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
    getAnnotations: builder.query({
      query: (snapshotId) => `snapshots/${snapshotId}/annotations`,
      providesTags: ['Annotation'],
    }),
    addAnnotation: builder.mutation({
      query: ({ snapshotId, newAnnotation }) => ({
        url: `snapshots/${snapshotId}/annotations`,
        method: 'POST',
        body: newAnnotation,
      }),
      invalidatesTags: ['Annotation'],
    }),
    updateAnnotation: builder.mutation({
      query: ({ snapshotId, annotationId, newFields }) => ({
        url: `snapshots/${snapshotId}/annotations/${annotationId}`,
        method: 'PATCH',
        body: newFields,
      }),
      invalidatesTags: ['Annotation'],
    }),
  }),
})

// Hooks
export const {
  useGetPrinciplesQuery,
  useGetGuidelinesQuery,
  useGetSuccessCriteriaQuery,
  useGetAnnotationsQuery,
  useAddAnnotationMutation,
  useUpdateAnnotationMutation,
} = api
