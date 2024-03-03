import { apiSlice } from "../api/apiSlice"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getChallenges: builder.query({
      query: (fieldID) => `/author/get-challenges/${fieldID}`,
      transformResponse: res => res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      providesTags: ['Challenges']
    }),
    getChallenge: builder.query({
      query: (challengeID) => `/author/get-challenge/${challengeID}`,
      providesTags: ['Challenge']

    }),
    downloadAssignment: builder.query({
      query: (challenge) => ({
        url: `/partic/download-assignment/${challenge.assignment}`,
        responseHandler: 'content-type'
      }) 
    }),
    createChallenge: builder.mutation({
      query: (challengeData) => ({
        url: `/author/create-challenge`,
        method: 'POST',
        body: challengeData
      }),
      invalidatesTags: ['Challenges']
    }),
    updateChallenge: builder.mutation({
      query: ({description, mark, maxSubmittions, challengeName, chaID}) => ({
        url: `/author/update-challenge/${chaID}`,
        method: 'PATCH',
        body: {description, mark, maxSubmittions, challengeName}
      }),
      invalidatesTags: ['Challenges', 'Challenge']

    }),
    
  })
})

export const {
  useGetChallengesQuery,
  useGetChallengeQuery,
  useDownloadAssignmentQuery,
  useCreateChallengeMutation,
  useUpdateChallengeMutation
} = authApiSlice