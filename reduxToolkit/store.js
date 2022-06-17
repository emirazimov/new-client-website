import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import counterReducer from "./slices/counterSlice"
import formDataReducer from "./slices/formData"
import fleetReducer from "./slices/fleetSlice"
import { setupListeners } from "@reduxjs/toolkit/query"
import { fleetApi } from "./services/fleetApi"
import { createReservationApi } from "./services/createReservation"
// import { fleetApi } from "./services/pokemon"

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    // [pokemonApi.reducerPath]: pokemonApi.reducer,
    [fleetApi.reducerPath]: fleetApi.reducer,
    [createReservationApi.reducerPath]: createReservationApi.reducer,
    counter: counterReducer,
    formData: formDataReducer,
    fleet: fleetReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fleetApi.middleware,
      createReservationApi.middleware
    ),
})
