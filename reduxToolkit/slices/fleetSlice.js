import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cars: [],
  pageSize: 1,
  isFetching: false,
  error: "",
}

export const fleetSlice = createSlice({
  name: "fleetSlice",
  initialState,
  reducers: {
    // setFromOrderAddressDetails: (state, action) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.orderAddressDetails[0] = action.payload
    // },
    setCars: (state, action) => {},
  },
})

// Action creators are generated for each case reducer function
export const { setCars } = fleetSlice.actions

export default fleetSlice.reducer
