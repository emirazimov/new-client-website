import style from "./PaymentForm.module.scss"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import {
//   loadUserPaymentDetailsInfo,
//   setUserPaymentBillingInformation,
// } from "../redux/sagas/paymentFormSaga"
import { setUsersPaymentDetails } from "../pages/api/getUsersPaymentDetails"
import Cleave from "cleave.js/react"
import Modal from "@mui/material/Modal"
import {
  setIsSendFailed,
  setIsSendingBillingInformation,
  setUserBillingInformation,
  setUserInputsValues,
} from "../reduxToolkit/slices/paymentFormSlice"
import {
  useGetUsersPaymentDetailsQuery,
  useSetUsersPaymentDetailsMutation,
} from "../reduxToolkit/services/paymentFormApi"
import ReactInputMask from "react-input-mask"

// const Cleave = dynamic(() => import("cleave.js"), {
//   ssr: false,
// })

const PaymentForm = () => {
  const dispatch = useDispatch()

  const paymentData = useSelector((state) => state.paymentForm.entities)

  const [gotError, setGorError] = useState(0)

  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const paymentId = urlParams.get("paymentId")
  console.log(paymentId)

  console.log(gotError)

  useEffect(() => {
    // loadUserPaymentDetailsInfo(paymentId)
    dispatch({ type: "GET_PAYMENT_DETAILS_INFO", payload: paymentId })
  }, [])
  const [firstName, setFirsName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [cvc, setCvc] = useState("")
  const [grativityAmount, setGrativityAmount] = useState(0)
  const [cardType, setCardType] = useState("")
  const [isGrativityEnabled, setIsGrativityEnabled] = useState(false)

  const handleCardNumber = (e) => {
    // setCreditCardNum(e.target.rawValue)
    // setCardForPaymentSubmit(e.target.value)
    // console.log(e.target.value)
    // console.log(e.target.value);
    setCardNumber(e.target.value)
  }

  const handleType = (type) => {
    setCardType(type)
    // console.log(type)
  }

  const [setPaymentDetails, resultOfSetPaymentDetails] =
    useSetUsersPaymentDetailsMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    handleOpen()
    dispatch(setIsSendingBillingInformation(true))
    dispatch(
      setUserBillingInformation({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber,
        address: address,
        city: city,
        state: state,
        zip: zip,
        cardNumber: cardNumber.replace(/\s/g, ""),
        month: month,
        year: year,
        cvc: cvc,
        tipAmount: grativityAmount,
        paymentId: parseInt(paymentId),
      })
    )

    setPaymentDetails({
      paymentId,
      inputsValue: {
        ...paymentData,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber,
        address: address,
        city: city,
        state: state,
        zip: zip,
        cardNumber: cardNumber.replace(/\s/g, ""),
        month: month,
        year: year,
        cvc: cvc,
        tipAmount: grativityAmount,
        paymentId: parseInt(paymentId),
      },
    })
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // default value 10 you can change this

  function handleMonth(e) {
    if (e <= 12) {
      setMonth(e)
    } else {
      return
    }
    // else set the input value
  }

  const result = useGetUsersPaymentDetailsQuery(paymentId)

  useEffect(() => {
    dispatch(setUserInputsValues(result.data))
    console.log(result)
    console.log(paymentData)
  }, [result])

  useEffect(() => {
    resultOfSetPaymentDetails.isSuccess &&
      dispatch(setIsSendingBillingInformation(false))
    resultOfSetPaymentDetails.isSuccess && dispatch(setIsSuccefullySended(true))
    resultOfSetPaymentDetails.isError &&
      dispatch(setIsSendingBillingInformation(false))
    resultOfSetPaymentDetails.isError && dispatch(setIsSendFailed(true))
  }, [resultOfSetPaymentDetails])

  return (
    <>
      {/* <button
        onClick={() => {
          dispatch(setUserInputsValues(result.data))
          console.log(paymentData)
        }}
      >
        Click me
      </button> */}
      <Modal open={open} onClose={handleClose}>
        {paymentData.isSendingBillingInformation == true ? (
          // <div
          // style={{
          //   width: "100%",
          //   height: "100vh",
          //   position: "absolute",
          //   // top: "50%",
          //   // left: "50%",
          //   background: "white",
          //   // opacity: "0.5",
          // }}
          // >

          <div
            style={{
              width: "300px",
              height: "280px",
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              top: "33%",
              left: "40%",
              background: "white",
              textAlign: "center",
              // opacity: "0.5",
            }}
          >
            <h3>...Loading</h3>
          </div>
        ) : (
          <>
            {paymentData.successfullySended && (
              <div
                style={{
                  width: "300px",
                  height: "280px",
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  top: "33%",
                  left: "40%",
                  background: "white",
                  // opacity: "0.5",
                }}
              >
                <h1 style={{ color: "black", textAlign: "center" }}>Success</h1>
                <svg
                  // className={style.successIcon}
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="check-circle"
                  style={{ color: "#44c26d", width: "30px", height: "70px" }}
                  // class="svg-inline--fa fa-check-circle fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"
                  ></path>
                </svg>
              </div>
            )}

            {paymentData.failedSent && (
              <div
                style={{
                  width: "300px",
                  height: "280px",
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  top: "33%",
                  left: "40%",
                  background: "white",
                  // opacity: "0.5",
                }}
              >
                <h1 style={{ color: "black", textAlign: "center" }}>
                  Something went wrong
                </h1>
                <svg
                  // classNamne={style.errorIcon}
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="times"
                  style={{ color: "#a8a5a5", width: "30px", height: "70px" }}
                  // class="svg-inline--fa fa-times fa-w-11"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 352 512"
                >
                  <path
                    fill="currentColor"
                    d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                  ></path>
                </svg>
              </div>
            )}
          </>
        )}
      </Modal>
      <form className={style.wrapper} onSubmit={handleSubmit}>
        <div className={style.wrapperWithLeftAndRightBorders}>
          <div className={style.contentContainer}>
            <div
              className={
                style.imageAndCompanyAndReservationInformationContainer
              }
            >
              <img
                src={paymentData?.invoiceCompanyInfo?.companyLogo}
                className={style.image}
              ></img>
              <span className={style.companyTitle}>
                {paymentData?.invoiceCompanyInfo?.companyName}
              </span>
              <span className={style.reservationInformationTitle}>
                Reservation information
              </span>
            </div>
            <div className={style.reservationInformationDetails}>
              <div className={style.invoiceDetailContainer}>
                <span className={style.invoiceTitle}>Invoice:</span>
                <span className={style.invoiceValue}>
                  {paymentData?.invoiceReservationInfo?.paymentId}
                </span>
              </div>
              <div className={style.fromToDetailsContainer}>
                <div className={style.fromContainer}>
                  <b className={style.fromTitle}>From:</b>
                  <p className={style.fromValue}>
                    {paymentData?.invoiceReservationInfo?.addressFrom}
                  </p>
                </div>
                <div className={style.toContainer}>
                  <b className={style.toTitle}>To:</b>
                  <p className={style.toValue}>
                    {paymentData?.invoiceReservationInfo?.addressTo}
                  </p>
                </div>
              </div>
              <div className={style.personsDetailContainer}>
                <span className={style.personsTitle}>Persons:</span>
                <span className={style.personsValue}>
                  {paymentData?.invoiceReservationInfo?.personsQty}
                </span>
              </div>
              <div className={style.dateAndTimeDetailsContainer}>
                <div className={style.dateContainer}>
                  <span className={style.dateTitle}>Date:</span>
                  <span className={style.dateValue}>
                    {new Date(
                      paymentData?.invoiceReservationInfo?.date
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className={style.timeContainer}>
                  <span className={style.timeTitle}>Time:</span>
                  <span className={style.timeValue}>
                    {new Date(
                      paymentData?.invoiceReservationInfo?.date
                    ).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>
              <div className={style.totalDetailContainer}>
                <span className={style.totalTitle}>Total:</span>
                <span className={style.totalValue}>
                  ${paymentData?.invoiceReservationInfo?.total}
                </span>
              </div>
            </div>
            <div className={style.billingInformationContainer}>
              <span className={style.billingInformationTitle}>
                Billing information
              </span>
              <div className={style.firstNameAndLastNameContainer}>
                <input
                  className={style.firstNameInput}
                  placeholder="First Name"
                  required
                  onChange={(event) => {
                    setFirsName(event.target.value)
                  }}
                />
                <input
                  className={style.lastNameInput}
                  placeholder="Last Name"
                  required
                  onChange={(event) => {
                    setLastName(event.target.value)
                  }}
                />
              </div>
              <div className={style.emailContainer}>
                <input
                  className={style.emailInput}
                  placeholder="Email"
                  type="email"
                  required
                  onChange={(event) => {
                    setEmail(event.target.value)
                  }}
                />
              </div>
              <div className={style.phoneNumberContainer}>
                <input
                  type="number"
                  className={style.phoneNumberInput}
                  placeholder="Phone Number"
                  required
                  onChange={(event) => {
                    setPhoneNumber(event.target.value)
                  }}
                />
              </div>
              <div className={style.addressContainer}>
                <input
                  className={style.addressInput}
                  placeholder="Address"
                  onChange={(event) => {
                    setAddress(event.target.value)
                  }}
                />
              </div>
              <div className={style.cityAndStateContainer}>
                <input
                  className={style.cityInput}
                  placeholder="City"
                  onChange={(event) => {
                    setCity(event.target.value)
                  }}
                />
                <input
                  className={style.stateInput}
                  placeholder="State"
                  onChange={(event) => {
                    setState(event.target.value)
                  }}
                />
              </div>
              <div className={style.zipContainer}>
                <input
                  className={style.zipInput}
                  placeholder="Zip"
                  onChange={(event) => {
                    setZip(event.target.value)
                  }}
                />
              </div>
              <div className={style.cardNumberContainer}>
                {/* <input
                  className={style.cardNumberInput}
                  placeholder="Card Number"
                  required
                  onChange={(event) => {
                    setCardNumber(event.target.value)
                  }}
                /> */}
                <Cleave
                  delimiter="-"
                  options={{
                    creditCard: true,
                    onCreditCardTypeChanged: handleType,
                  }}
                  required
                  name="paymentInfo.cardNumber"
                  //   error={errors.paymentInfo?.cardNumber ? true : false}
                  onChange={handleCardNumber}
                  placeholder="Card number"
                  //   className="credit-card-input-by-bookinglane"
                  className={style.cardNumberInput}
                />
              </div>
              <div className={style.monthAndYearAndCvcContainer}>
                <ReactInputMask
                  name="paymentInfoMonth"
                  // ref={register}
                  mask="99"
                  autoComplete="off"
                  onChange={(event) => {
                    handleMonth(event.target.value)
                  }}
                >
                  {() => (
                    <input
                      // type="number"
                      className={style.monthInput}
                      placeholder="Month"
                      required
                    />
                  )}
                </ReactInputMask>

                <ReactInputMask
                  name="paymentInfoMonth"
                  // ref={register}
                  mask="99"
                  autoComplete="off"
                  onChange={(event) => {
                    setYear(event.target.value)
                  }}
                >
                  {() => (
                    <input
                      // type="number"
                      className={style.yearInput}
                      placeholder="Year"
                      required
                    />
                  )}
                </ReactInputMask>

                <ReactInputMask
                  name="paymentInfoCvc"
                  // ref={register}
                  mask={cardType == "amex" ? "9999" : "999"}
                  autoComplete="off"
                  onChange={(event) => {
                    console.log(cardType)
                    setCvc(event.target.value)
                  }}
                  // defaultValue={formSummary.paymentInfo.cvc}
                >
                  {() => {
                    return (
                      <input
                        // type="number"
                        className={style.cvcInput}
                        placeholder="Cvc"
                        required
                      />
                    )
                  }}
                </ReactInputMask>
              </div>
              {paymentData?.allowTip && (
                <div className={style.addTip}>
                  <label className={style.switch}>
                    <input
                      type="checkbox"
                      onClick={() => {
                        setIsGrativityEnabled(!isGrativityEnabled)
                      }}
                    />
                    <span className={style.slider}></span>
                  </label>

                  <p className={style.addGrativityTitle}>Grativity</p>
                </div>
              )}

              {isGrativityEnabled && (
                <div className={style.tipContainer}>
                  <input
                    type="number"
                    className={style.tipInput}
                    placeholder="Grativity"
                    required
                    value={grativityAmount}
                    onChange={(event) => {
                      setGrativityAmount(event.target.value)
                    }}
                  />
                </div>
              )}

              <input
                type="submit"
                value={`Pay $${paymentData?.invoiceReservationInfo?.total}`}
                className={style.payButton}
                // onClick={(e) => {
                //   e.preventDefault()

                //   dispatch({
                //     type: "SET_PAYMENT_DETAILS_INFO",
                //     payload: {
                //       paymentId,
                //       inputsValue: {
                //         ...paymentData,
                //         firstName: firstName,
                //         lastName: lastName,
                //         email: email,
                //         phone: phoneNumber,
                //         address: address,
                //         city: city,
                //         state: state,
                //         zip: zip,
                //         cardNumber: cardNumber,
                //         month: month,
                //         year: year,
                //         cvc: cvc,
                //         paymentId: parseInt(paymentId),
                //       },
                //     },
                //   })

                //   // setGorError(
                //   //   setUsersPaymentDetails(paymentId, {
                //   //     ...paymentData,
                //   //     firstName: firstName,
                //   //     lastName: lastName,
                //   //     email: email,
                //   //     phone: phoneNumber,
                //   //     address: address,
                //   //     city: city,
                //   //     state: state,
                //   //     zip: zip,
                //   //     cardNumber: cardNumber,
                //   //     month: month,
                //   //     year: year,
                //   //     cvc: cvc,
                //   //     paymentId: paymentId,
                //   //   })
                //   // )
                // }}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default PaymentForm
