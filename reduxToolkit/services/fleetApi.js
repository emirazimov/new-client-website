// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define a service using a base URL and expected endpoints
export const fleetApi = createApi({
  reducerPath: "fleetApi ",
  baseQuery: fetchBaseQuery({ baseUrl: "https://apidev.bookinglane.com/api/" }),
  endpoints: (builder) => ({
    getFleet: builder.mutation({
      query: ({ captcha, ...body }) => {
        // const { captcha, ...body } = dataForm
        return {
          url: `widget/cars-with-price/14862f6b-0e7a-47d0-810a-06a348fd9ec1`,
          method: `POST`,
          headers: {
            captcha: `${captcha}`,
          },
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
export const { useGetFleetMutation } = fleetApi
