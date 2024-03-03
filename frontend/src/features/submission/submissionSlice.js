import { apiSlice } from "../api/apiSlice"

export const fieldApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMySubmissions: builder.query({
      query: ({challengeID}) => `/partic/get-my-submittions/${challengeID}`,
      transformResponse: res => res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      providesTags: ['Submissions']
    }),
    getSubmission: builder.query({
      query: (subID) => `/partic/get-submittion/${subID}`
    }),
    getSubmissions: builder.query({
      query: (challengeID) => `/partic/get-submittions/${challengeID}`
    }),
    createSubmission: builder.mutation({
      query: ({challengeID, submission}) => ({
        url: `/partic/add-submittion/${challengeID}`,
        method: 'POST', 
        body: {submittion: submission} 
      }),
      invalidatesTags: ['Submissions']
    }),
    evaluateSubmission: builder.mutation({
      query: ({subID, decision, points, hint}) => ({
        url: `/partic/evaluate-submittion/${subID}`,
        method: 'PATCH',
        body: {decision, points, hint}
      })
    })
    
    
  })
})

export const {
  useGetMySubmissionsQuery,
  useCreateSubmissionMutation, 
  useGetSubmissionQuery,
  useGetSubmissionsQuery,
  useEvaluateSubmissionMutation
} = fieldApiSlice