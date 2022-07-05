import { createSlice } from "@reduxjs/toolkit"
// import { getUsersPaymentDetails } from "../../pages/api/getUsersPaymentDetails"

const initialState = {
  entities: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    cardNickname: "",
    month: "",
    year: "",
    cvc: "",
    isSendingBillingInformation: false,
    successfullySended: false,
    failedSent: false,
  },
}

export const paymentFormSlice = createSlice({
  name: "paymentFormSlice",
  initialState,
  reducers: {
    // setFromOrderAddressDetails: (state, action) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.orderAddressDetails[0] = action.payload
    // },
    setUserInputsValues: (state, action) => {
      console.log("iam here", action.payload)
      const dataFromBack = { ...state.entities, ...action.payload }
      state.entities = dataFromBack
    },

    setUserBillingInformation: (state, action) => {
      const filledData = { ...state.entities, ...action.payload }
      state.entities = filledData
    },
    setIsSendingBillingInformation: (state, action) => {
      state.entities.isSendingBillingInformation = action.payload
    },
    setIsSuccefullySended: (state, action) => {
      state.entities.successfullySended = action.payload
    },
    setIsSendFailed: (state, action) => {
      state.entities.failedSent = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setUserInputsValues,
  setUserBillingInformation,
  setIsSendingBillingInformation,
  setIsSuccefullySended,
  setIsSendFailed,
} = paymentFormSlice.actions

export default paymentFormSlice.reducer
