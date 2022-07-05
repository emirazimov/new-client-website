import { useEffect } from "react"
import { Provider, useDispatch } from "react-redux"
// import PaymentForm from "../components/PaymentForm"
import { store } from "../reduxToolkit/store"
import dynamic from "next/dynamic"

const PaymentForm = dynamic(() => import("../components/PaymentForm"), {
  ssr: false,
})

const Payment = () => {
  return (
    <Provider store={store}>
      <PaymentForm />
    </Provider>
  )
}

export default Payment
