import { apiSlice } from "../api/apiSlice"

export const fieldApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getFields: builder.query({
      query: () => '/admin/get-challenge-fields',
    }),
    getField: builder.query({
      query: (fieldID) => `/admin/get-challenge-field/${fieldID}`,
    }),
    
  })
})

export const {
  useGetFieldsQuery,
  useGetFieldQuery
} = fieldApiSlice