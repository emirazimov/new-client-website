// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define a service using a base URL and expected endpoints
export const createReservationApi = createApi({
  reducerPath: "createReservationApi ",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.bookinglane.com/api/" }),
  endpoints: (builder) => ({
    getStates: builder.query({
      query: () => `place/states`,

      //   async setFleet({ dataForm }, { dispatch, queryFulfilled }) {
      //     const { data } = await queryFulfilled
      //     dispatch(fleetApi.util.updateQueryData)
      //   },
    }),
    getCities: builder.query({
      query: (id) => `place/cities/${id}`,
    }),

    createReservation: builder.mutation({
      query: ({ accessKeyFromWindow, ...body }) => {
        // const { captcha, ...body } = dataForm
        return {
          url: `reservation/web/14862f6b-0e7a-47d0-810a-06a348fd9ec1`,
          method: `POST`,
          //   headers: {
          //     captcha: `${captcha}`,
          //   },
          body: body,
        }
      },
      // async setFleet({ dataForm }, { dispatch, queryFulfilled }) {
      //   const { data } = await queryFulfilled
      //   dispatch(fleetApi.util.updateQueryData)
      // },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetStatesQuery,
  useGetCitiesQuery,
  useCreateReservationMutation,
} = createReservationApi
