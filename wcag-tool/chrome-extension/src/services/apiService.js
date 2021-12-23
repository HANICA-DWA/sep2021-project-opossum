import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '../../config.js'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: config.SERVER_URL }),
  tagTypes: ['Annotation', 'Snapshot'],
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
    createAnnotation: builder.mutation({
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
    deleteAnnotation: builder.mutation({
      query: ({ snapshotId, annotationId }) => ({
        url: `snapshots/${snapshotId}/annotations/${annotationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Annotation'],
    }),
    getSnapshots: builder.query({
      query: () => `snapshots/`,
      providesTags: ['Snapshot'],
    }),
  }),
})

// Hooks
export const {
  useGetPrinciplesQuery,
  useGetGuidelinesQuery,
  useGetSuccessCriteriaQuery,
  useGetAnnotationsQuery,
  useCreateAnnotationMutation,
  useUpdateAnnotationMutation,
  useDeleteAnnotationMutation,
  useGetSnapshotsQuery,
} = api
