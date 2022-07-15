// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define a service using a base URL and expected endpoints
export const paymentFormApi = createApi({
  reducerPath: "paymentFormApi ",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.bookinglane.com/api/" }),
  endpoints: (builder) => ({
    getUsersPaymentDetails: builder.query({
      query: (paymentId) => {
        return {
          url: `invoice/checkout/${paymentId}`,
          headers: {
            "Content-Type": "application/json",
            "App-Version": "1.2.36",
          },
        }
      },

      //   async setFleet({ dataForm }, { dispatch, queryFulfilled }) {
      //     const { data } = await queryFulfilled
      //     dispatch(fleetApi.util.updateQueryData)
      //   },
    }),

    setUsersPaymentDetails: builder.mutation({
      query: ({ paymentId, ...body }) => {
        // const { captcha, ...body } = dataForm
        return {
          url: `invoice/checkout/${paymentId}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "App-Version": "1.2.36",
          },
          body: body.inputsValue,
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
  useGetUsersPaymentDetailsQuery,
  useSetUsersPaymentDetailsMutation,
} = paymentFormApi
