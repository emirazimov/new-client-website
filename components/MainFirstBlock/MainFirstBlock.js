import { Header } from "../Header/Header"
import style from "./MainFirstBlock.module.scss"
import { WidgetFirstPage } from "../WidgetFirstPage/WidgetFirstPage"

import React, { useEffect, useState } from "react"
import { WidgetSecondPage } from "../WidgetSecondPage/WidgetSecondPage"
import { WidgetThirdPage } from "../WidgetThirdPage/WidgetThirdPage"
import { useSelector, useDispatch } from "react-redux"
import { decrement, increment } from "../../reduxToolkit/slices/counterSlice"
import { WidgetFourthPage } from "../WidgetFourthPage/WidgetFourthPage"
import WidgetFifthPage from "../WidgetFifthPage/WidgetFifthPage"
import ReCAPTCHA from "react-google-recaptcha"
import { Modal } from "../Helpers/Modal"
import {
  setCaptcha,
  setOrderDateTime,
} from "../../reduxToolkit/slices/formData"
import { WidgetSixthPage } from "../WidgetSixthPage/WidgetSixthPage"
import { useGetFleetMutation } from "../../reduxToolkit/services/fleetApi"
import { setCars } from "../../reduxToolkit/slices/fleetSlice"
import { useCreateReservationMutation } from "../../reduxToolkit/services/createReservation"
import { Preloader } from "../Helpers/Preloader"
import { useMediaQuery } from "@mui/material"

// almost on finish line, need to create redux toolkit store, and synchronize with ui

const MainFirstBlock = () => {
  const [activeStep, setActiveStep] = React.useState(1)

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  const formData = useSelector((state) => state.formData)
  const cars = useSelector((state) => state.fleet.cars)

  const [redBorderErrorForFromAddress, setRedBorderErrorForFromAddress] =
    useState(false)
  const [redBorderErrorForToAddress, setRedBorderErrorForToAddress] =
    useState(false)

  const [redBorderErrorForDate, setRedBorderErrorForDate] = useState(false)
  const [redBorderErrorForTime, setRedBorderErrorForTime] = useState(false)

  const [redBorderErrorForAMPM, setRedBorderErrorForAMPM] = useState(false)

  const [
    redBorderErrorForNumberOfPassengers,
    setRedBorderErrorForNumberOfPassengers,
  ] = useState(false)

  function onChangeRecaptcha(value) {
    // console.log('Captcha value:', value)
    // window.localStorage.setItem("captcha", value)
    dispatch(setCaptcha(value))
  }

  const [showRecaptcha, setShowRecaptcha] = useState(false)

  const [termsAndPrivacyPolicyChecked, setTermsAndPrivacyPolicyChecked] =
    useState(false)
  const [
    iAgreeWithTransactionFeeNonrefundableChecked,
    setIAgreeWithTransactionFeeNonrefundableChecked,
  ] = useState(false)

  // const [disableNextButton, setDisableNextButton] = useState(true)

  const [getFleet, result] = useGetFleetMutation()

  const ifFirstPageAddressDetailsDateAndTimeFilled = () => {
    const checkIfAddressDetailsFilled = () => {
      if (
        formData.orderAddressDetails[0].placeId &&
        formData.orderAddressDetails[1].placeId &&
        formData.dateValue &&
        formData.timeValue &&
        formData.timeForDefaultValueAMPMalignment.ampm &&
        formData.passengersQuantity
      ) {
        return true
      } else {
        return false
      }
    }

    if (checkIfAddressDetailsFilled()) {
      setActiveStep(activeStep + 1)
    } else {
      !formData.orderAddressDetails[0].placeId &&
        setRedBorderErrorForFromAddress(true)

      !formData.orderAddressDetails[1].placeId &&
        setRedBorderErrorForToAddress(true)

      !formData.dateValue && setRedBorderErrorForDate(true)

      !formData.timeValue && setRedBorderErrorForTime(true)

      !formData.timeForDefaultValueAMPMalignment.ampm &&
        setRedBorderErrorForAMPM(true)
      !formData.passengersQuantity &&
        setRedBorderErrorForNumberOfPassengers(true)
    }
  }

  // const ifSecondPageNumberOfPassengersFilled = () => {
  //   const checkIfNumberOfPassengersFilled = () => {
  //     if (formData.passengersQuantity) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   }

  //   if (checkIfNumberOfPassengersFilled()) {
  //     setActiveStep(activeStep + 1)
  //   } else {
  //     !formData.passengersQuantity &&
  //       setRedBorderErrorForNumberOfPassengers(true)
  //   }
  // }

  useEffect(() => {
    dispatch(setCars(result.data))
    // console.log(result.success)
    // console.log(result)
    // console.log(cars)
  }, [result])

  useEffect(() => {
    formData.orderAddressDetails[0].placeId &&
      setRedBorderErrorForFromAddress(false)
    formData.orderAddressDetails[1].placeId &&
      setRedBorderErrorForToAddress(false)

    formData.dateValue && setRedBorderErrorForDate(false)

    formData.timeValue && setRedBorderErrorForTime(false)
    formData.timeForDefaultValueAMPMalignment.ampm &&
      setRedBorderErrorForAMPM(false)
  }, [
    formData.orderAddressDetails[0].placeId,
    formData.orderAddressDetails[1].placeId,
    formData.dateValue,
    formData.timeValue,
    formData.timeForDefaultValueAMPMalignment.ampm,
  ])

  const [createReservationInteractive, setCreateReservationInteractive] =
    useState(false)

  // useEffect(() => {
  //   // if (
  //   //   formData.orderAddressDetails[0].rideCheckpoint &&
  //   //   formData.orderAddressDetails[1].rideCheckpoint
  //   // ) {
  //   //   setDisableNextButton(false)
  //   // }
  //   checkIfAddressDetailsFilled()
  // }, [
  //   formData.orderAddressDetails[0].rideCheckpoint,
  //   formData.orderAddressDetails[1].rideCheckpoint,
  // ])

  const [createReservation, resultOfCreateReservation] =
    useCreateReservationMutation()

  const isMobile = useMediaQuery("(max-width: 900px)")

  const whichPage = () => {
    switch (activeStep) {
      case 1:
        return (
          <WidgetFirstPage
            redBorderErrorForFromAddress={redBorderErrorForFromAddress}
            redBorderErrorForToAddress={redBorderErrorForToAddress}
            redBorderErrorForDate={redBorderErrorForDate}
            redBorderErrorForTime={redBorderErrorForTime}
            redBorderErrorForAMPM={redBorderErrorForAMPM}
            redBorderErrorForNumberOfPassengers={
              redBorderErrorForNumberOfPassengers
            }
          />
        )
      case 2:
        return (
          <WidgetSecondPage
            resultOfCreateReservation={resultOfCreateReservation}
            termsAndPrivacyPolicyChecked={termsAndPrivacyPolicyChecked}
            setTermsAndPrivacyPolicyChecked={setTermsAndPrivacyPolicyChecked}
            iAgreeWithTransactionFeeNonrefundableChecked={
              iAgreeWithTransactionFeeNonrefundableChecked
            }
            setIAgreeWithTransactionFeeNonrefundableChecked={
              setIAgreeWithTransactionFeeNonrefundableChecked
            }
            createReservationInteractive={createReservationInteractive}
            setCreateReservationInteractive={setCreateReservationInteractive}
          />
        )

      // case 3:
      //   return <WidgetThirdPage />
      // case 4:
      //   if (result.isLoading) {
      //     return (
      //       <div
      //         style={{
      //           width: "400px",
      //           height: "440.5px",
      //           display: "flex",
      //           justifyContent: "center",
      //           alignItems: "center",
      //         }}
      //       >
      //         <Preloader />
      //       </div>
      //     )
      //   }
      //   if (cars) {
      //     return <WidgetFourthPage />
      //   }
      //   return <WidgetFourthPage />
      // case 5:
      //   return <WidgetFifthPage />
      // case 6:
      //   return (
      //     <WidgetSixthPage
      //       resultOfCreateReservation={resultOfCreateReservation}
      //       termsAndPrivacyPolicyChecked={termsAndPrivacyPolicyChecked}
      //       setTermsAndPrivacyPolicyChecked={setTermsAndPrivacyPolicyChecked}
      //     />
      //   )
      default:
        break
    }
  }

  const whichPageMobile = () => {
    switch (activeStep) {
      case 1:
        return (
          <WidgetFirstPage
            redBorderErrorForFromAddress={redBorderErrorForFromAddress}
            redBorderErrorForToAddress={redBorderErrorForToAddress}
            redBorderErrorForDate={redBorderErrorForDate}
            redBorderErrorForTime={redBorderErrorForTime}
            redBorderErrorForAMPM={redBorderErrorForAMPM}
            redBorderErrorForNumberOfPassengers={
              redBorderErrorForNumberOfPassengers
            }
          />
        )
      case 2:
        if (result.isLoading) {
          return (
            <div
              style={{
                width: "400px",
                height: "440.5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Preloader />
            </div>
          )
        }
        if (cars) {
          return <WidgetFourthPage />
        }
        return <WidgetFourthPage />

      case 3:
        return <WidgetFifthPage />
      case 4:
        return (
          <WidgetSixthPage
            resultOfCreateReservation={resultOfCreateReservation}
            termsAndPrivacyPolicyChecked={termsAndPrivacyPolicyChecked}
            setTermsAndPrivacyPolicyChecked={setTermsAndPrivacyPolicyChecked}
            iAgreeWithTransactionFeeNonrefundableChecked={
              iAgreeWithTransactionFeeNonrefundableChecked
            }
            setIAgreeWithTransactionFeeNonrefundableChecked={
              setIAgreeWithTransactionFeeNonrefundableChecked
            }
            createReservationInteractive={createReservationInteractive}
            setCreateReservationInteractive={setCreateReservationInteractive}
          />
        )
      //  case 5:
      //    return <WidgetFifthPage />
      //  case 6:

      default:
        break
    }
  }

  return (
    <div className={style.wrapper}>
      <Header />
      {/* <button
        onClick={() => {
          dispatch(increment())
        }}
      >
        Click me
      </button>
      <h2>{count}</h2> */}

      <main className={style.wrapperToLimitContentWidth}>
        <h1 className={style.findExecutiveCar}>
          Find executive car & chauffeur service
        </h1>
        <div className={style.letsGetStartedAndMainTextContainer}>
          <h1 className={style.mainText}>
            We provide a simple way to book the local executive car service with
            our automated technology
          </h1>
          <div className={style.letsGetStartedContainer}>
            <p className={style.letsGetStartedTitle}>Let???s get started:</p>
            {/* <Modal onClose={() => setShowRecaptcha(false)} show={showRecaptcha}> */}

            {/* </Modal> */}
            {!isMobile ? whichPage() : whichPageMobile()}
            {/* {showRecaptcha && (
              <div style={{ marginBottom: "21px" }}>
                <ReCAPTCHA
                  sitekey="6LeuP3weAAAAAHoe3aaP27xmYorD1s1vXK7XdlPk"
                  onChange={onChangeRecaptcha}
                />
              </div>
            )} */}
            {!isMobile ? (
              <>
                {formData.orderAddressDetails[0].rideCheckPoint && (
                  <div className={style.buttonsContainer}>
                    {activeStep == 2 ? (
                      <>
                        <button
                          className={style.backButton}
                          onClick={() => {
                            if (activeStep == 1) {
                              return
                            }
                            setActiveStep(activeStep - 1)
                          }}
                        >
                          BACK
                        </button>
                        <button
                          className={
                            termsAndPrivacyPolicyChecked &&
                            iAgreeWithTransactionFeeNonrefundableChecked
                              ? style.payButton
                              : style.payButtonDisabled
                          }
                          onClick={() => {
                            createReservation(formData)
                            setCreateReservationInteractive(true)
                          }}
                        >
                          PAY
                        </button>
                      </>
                    ) : (
                      <button
                        className={
                          activeStep == 1 && formData.carInfo.id == 0
                            ? style.nextButtonDisabled
                            : style.nextButton
                        }
                        disabled={
                          activeStep == 1 && formData.carInfo.id == 0
                            ? true
                            : false
                        }
                        onClick={() => {
                          // if (
                          //   formData.orderAddressDetails[0].rideCheckpoint &&
                          //   formData.orderAddressDetails[1].rideCheckpoint
                          // ) {
                          //   setDisableNextButton(false)
                          // }
                          if (activeStep == 1) {
                            ifFirstPageAddressDetailsDateAndTimeFilled()
                            // ifSecondPageNumberOfPassengersFilled()
                            dispatch(
                              setOrderDateTime(
                                `${formData.dateValue} ${formData.timeValue} ${formData.timeForDefaultValueAMPMalignment.ampm}`
                              )
                            )
                          }
                          // if (activeStep == 2) {
                          // }

                          // if (activeStep == 3) {
                          //   setShowRecaptcha(true)
                          //   formData.captcha && setActiveStep(activeStep + 1)
                          //   !cars &&
                          //     getFleet({
                          //       captcha: formData.captcha,
                          //       hours: formData.hours,
                          //       isGateMeeting: formData.isGateMeeting,
                          //       airlines: formData.airlines,
                          //       orderAddressDetails: formData.orderAddressDetails,
                          //       page: formData.page,
                          //       typeId: formData.typeId,
                          //       bookingType: formData.bookingType,
                          //       passengersQuantity: formData.passengersQuantity,
                          //       isAirportPickupIncluded:
                          //         formData.isAirportPickupIncluded,
                          //       boosterSeatCount: formData.boosterSeatCount,
                          //       safetySeatCount: formData.safetySeatCount,
                          //       luggageCount: formData.luggageCount,
                          //     })
                          //   // result.success && dispatch(setCars(result.data))

                          //   // console.log(formData.captcha)
                          // }
                          // if (activeStep == 4) {
                          //   setActiveStep(activeStep + 1)
                          // }
                          // if (activeStep == 5) {
                          //   setActiveStep(activeStep + 1)
                          // }
                          // formData.captcha && setShowRecaptcha(false)
                          // else {
                          //   if (
                          //     formData.orderAddressDetails[0].placeId &&
                          //     formData.orderAddressDetails[1].placeId
                          //   ) {
                          //     setActiveStep(activeStep + 1)
                          //   } else {
                          //     !formData.orderAddressDetails[0].placeId &&
                          //       setRedBorderErrorForFromAddress(true)

                          //     !formData.orderAddressDetails[1].placeId &&
                          //       setRedBorderErrorForToAddress(true)
                          //   }
                          // }

                          // setActiveStep(activeStep + 1)
                        }}
                      >
                        NEXT
                      </button>
                    )}

                    {/* <button
                onClick={() => {
                  dispatch(setCars(result.data))
                  console.log(cars)

                  console.log(result.data)
                }}
              >
                Click me
              </button> */}
                  </div>
                )}
              </>
            ) : (
              <>
                {showRecaptcha && (
                  <div style={{ marginBottom: "21px" }}>
                    <ReCAPTCHA
                      sitekey="6LeuP3weAAAAAHoe3aaP27xmYorD1s1vXK7XdlPk"
                      onChange={onChangeRecaptcha}
                    />
                  </div>
                )}
                {formData.orderAddressDetails[0].rideCheckPoint && (
                  <div className={style.buttonsContainer}>
                    {activeStep >= 2 && (
                      <button
                        className={style.backButton}
                        onClick={() => {
                          if (activeStep == 1) {
                            return
                          }
                          setActiveStep(activeStep - 1)
                        }}
                      >
                        BACK
                      </button>
                    )}

                    {activeStep == 4 ? (
                      <button
                        className={
                          termsAndPrivacyPolicyChecked &&
                          iAgreeWithTransactionFeeNonrefundableChecked
                            ? style.payButton
                            : style.payButtonDisabled
                        }
                        onClick={() => {
                          createReservation(formData)
                          setCreateReservationInteractive(true)
                        }}
                      >
                        PAY
                      </button>
                    ) : (
                      <button
                        className={
                          activeStep == 4 && formData.carInfo.id == 0
                            ? style.nextButtonDisabled
                            : style.nextButton
                        }
                        // style={{ width: isMobile && "269px" }}
                        disabled={
                          activeStep == 4 && formData.carInfo.id == 0
                            ? true
                            : false
                        }
                        style={{ width: activeStep >= 2 && "125px" }}
                        onClick={() => {
                          // if (
                          //   formData.orderAddressDetails[0].rideCheckpoint &&
                          //   formData.orderAddressDetails[1].rideCheckpoint
                          // ) {
                          //   setDisableNextButton(false)
                          // }
                          if (activeStep == 1) {
                            ifFirstPageAddressDetailsDateAndTimeFilled()
                            dispatch(
                              setOrderDateTime(
                                `${formData.dateValue} ${formData.timeValue} ${formData.timeForDefaultValueAMPMalignment.ampm}`
                              )
                            )
                          }
                          if (activeStep == 2) {
                            // setShowRecaptcha(true)
                            // formData.captcha &&
                            setActiveStep(activeStep + 1)
                            // !cars &&
                            //   getFleet({
                            //     captcha: formData.captcha,
                            //     hours: formData.hours,
                            //     isGateMeeting: formData.isGateMeeting,
                            //     airlines: formData.airlines,
                            //     orderAddressDetails:
                            //       formData.orderAddressDetails,
                            //     page: formData.page,
                            //     typeId: formData.typeId,
                            //     bookingType: formData.bookingType,
                            //     passengersQuantity: formData.passengersQuantity,
                            //     isAirportPickupIncluded:
                            //       formData.isAirportPickupIncluded,
                            //     boosterSeatCount: formData.boosterSeatCount,
                            //     safetySeatCount: formData.safetySeatCount,
                            //     luggageCount: formData.luggageCount,
                            //   })
                          }

                          if (activeStep == 3) {
                            setActiveStep(activeStep + 1)
                            // result.success && dispatch(setCars(result.data))

                            // console.log(formData.captcha)
                          }
                          if (activeStep == 4) {
                            setActiveStep(activeStep + 1)
                          }
                          // if (activeStep == 5) {

                          // }
                          // formData.captcha && setShowRecaptcha(false)
                          // else {
                          //   if (
                          //     formData.orderAddressDetails[0].placeId &&
                          //     formData.orderAddressDetails[1].placeId
                          //   ) {
                          //     setActiveStep(activeStep + 1)
                          //   } else {
                          //     !formData.orderAddressDetails[0].placeId &&
                          //       setRedBorderErrorForFromAddress(true)

                          //     !formData.orderAddressDetails[1].placeId &&
                          //       setRedBorderErrorForToAddress(true)
                          //   }
                          // }

                          // setActiveStep(activeStep + 1)
                        }}
                      >
                        NEXT
                      </button>
                    )}

                    {/* <button
                onClick={() => {
                  dispatch(setCars(result.data))
                  console.log(cars)

                  console.log(result.data)
                }}
              >
                Click me
              </button> */}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default MainFirstBlock
