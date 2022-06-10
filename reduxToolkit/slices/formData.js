import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  orderAddressDetails: [
    {
      rideCheckPoint: "",
      latitude: 0,
      longitude: 0,
      placeType: 0,
      placeId: "",
    },
    {
      rideCheckPoint: "",
      latitude: 0,
      longitude: 0,
      placeType: 0,
      placeId: "",
    },
  ],
  bookingType: 0,
  isAirportPickupIncluded: false,
  passengersQuantity: 0,
  orderStartDateTime: "",
  dateValue: "",
  timeValue: "",
  timeForDefaultValueAMPMalignment: {
    ampm: "",
    alignment: "web",
  },
  carInfo: {
    id: 0,
  },
  hours: 0,
  paymentInfo: {
    cardNumber: "",
    month: null,
    year: null,
    cvc: "",
    amount: 0,
  },
  client: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    zip: "",
    cityId: 0,
    stateId: 0,
  },
  isAirportPickupIncluded: false,
  flightNumber: "",
  airlines: {
    id: 0,
  },
  showCarsWithSafetySeat: false,
  safetySeatCount: 0,
  boosterSeatCount: 0,
  luggageCount: 0,
  isGateMeeting: false,
  page: 1,
  typeId: 0,
  greetClientInfo: {},
  orderNotes: "",
  orderSum: 0,
  orderType: 3,
  hourly: false,
}

export const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setFromOrderAddressDetails: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.orderAddressDetails[0] = action.payload
    },
    setToOrderAddressDetails: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //   const [firstElement, ...toLocations] = state.orderAddressDetails
      //   //   console.log(state.orderAddressDetails.shift())
      //   toLocations = action.payload
      //   console.log(action.payload.index)
      if (action.payload.index == 0) {
        // state.orderAddressDetails.shift()
        state.orderAddressDetails[1] = action.payload.selectedRideCheckPoint
      } else {
        const [fromLocation, toLocation, ...restToLocations] =
          state.orderAddressDetails

        // restToLocations.push(action.payload.selectedRideCheckPoint)

        restToLocations[action.payload.index - 1] =
          action.payload.selectedRideCheckPoint

        state.orderAddressDetails = [
          fromLocation,
          toLocation,
          ...restToLocations,
        ]
      }
    },
    setFromRideCheckpoint: (state, action) => {
      state.orderAddressDetails[0].rideCheckPoint = action.payload
    },
    setToRideCheckpoint: (state, action) => {
      //   const withoutFirstElement = state.orderAddressDetails.shift()
      //   state.orderAddressDetails.shift()
      //   const [firstElement, ...toLocations] = state.orderAddressDetails
      //   console.log(state.orderAddressDetails.shift())

      //   state.orderAddressDetails[1].rideCheckPoint = action.payload

      state.orderAddressDetails[action.payload.index + 1].rideCheckPoint =
        action.payload.address

      //   toLocations[index].rideCheckPoint = action.payload
    },
    // setToAdditionalRideCheckpoints: (state, action) => {
    //   //   const withoutFirstElement = state.orderAddressDetails.shift()
    //   //   state.orderAddressDetails.shift()
    //   //   const [firstElement, ...toLocations] = state.orderAddressDetails
    //   //   console.log(state.orderAddressDetails.shift())

    //   // const [fromLocation, toLocation, ...toAdditionalLocations] = state.orderAddressDetails

    //   state.orderAddressDetails[action.payload.index].rideCheckPoint =
    //     action.payload.address

    //   //   toLocations[index].rideCheckPoint = action.payload
    // },
    addToLocation: (state, action) => {
      const arr = [...state.orderAddressDetails]
      arr.push(action.payload)

      state.orderAddressDetails = arr
    },
    removeToLocation: (state, action) => {
      const arr = [...state.orderAddressDetails]
      arr.splice(action.index, 1)

      state.orderAddressDetails = arr
    },
    setBookingType: (state, action) => {
      state.bookingType = action.payload
    },
    setOrderDate: (state, action) => {
      state.dateValue = action.payload
    },
    setOrderTime: (state, action) => {
      state.timeValue = action.payload
    },
    setAMPM: (state, action) => {
      state.timeForDefaultValueAMPMalignment.ampm = action.payload
    },
    setOrderDateTime: (state, action) => {
      state.orderStartDateTime = action.payload
    },
    setNumberOfPassenger: (state, action) => {
      state.passengersQuantity = action.payload
    },
    setFlightNumber: (state, action) => {
      state.flightNumber = action.payload
    },
    setLuggageCount: (state, action) => {
      state.luggageCount = action.payload
    },
    setSafetySeatSwitch: (state, action) => {
      state.showCarsWithSafetySeat = action.payload
    },
    setSafetySeatCount: (state, action) => {
      state.safetySeatCount = action.payload
    },
    setBoosterSeatCount: (state, action) => {
      state.boosterSeatCount = action.payload
    },
    setHourlySwitch: (state, action) => {
      state.hourly = action.payload
    },
    setHoursCount: (state, action) => {
      state.hours = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setFromOrderAddressDetails,
  setToOrderAddressDetails,
  setFromRideCheckpoint,
  setToRideCheckpoint,
  //   setToAdditionalRideCheckpoints,
  addToLocation,
  removeToLocation,
  setBookingType,
  setOrderDate,
  setOrderTime,
  setAMPM,
  setOrderDateTime,
  setNumberOfPassenger,
  setFlightNumber,
  setLuggageCount,
  setSafetySeatSwitch,
  setSafetySeatCount,
  setBoosterSeatCount,
  setHourlySwitch,
  setHoursCount,
} = formDataSlice.actions

export default formDataSlice.reducer
