import { GoogleApiWrapper, Map } from "google-maps-react"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CarInformationComponent } from "../WidgetFourthPage/CarInformationComponent"
import { Autocomplete } from "@mui/material"
import {
  useCreateReservationMutation,
  useGetCitiesQuery,
  useGetStatesQuery,
} from "../../reduxToolkit/services/createReservation"
import Cleave from "cleave.js/react"
import ReactInputMask from "react-input-mask"

import {
  setAddress,
  setCardNumber,
  setCityId,
  setCvc,
  setEmail,
  setFirstName,
  setLastName,
  setMonth,
  setPhoneNumber,
  setStateId,
  setYear,
  setZip,
  setNotes,
  setOrderSum,
  setTips,
} from "../../reduxToolkit/slices/formData"
import { Preloader } from "../Helpers/Preloader"
import { ErroIcon, SuccessIcon, DropDownArrowIcon } from "../../public/Assets"
import TermsOfUse from "../Helpers/TermsOfUse"
import PrivacyPolicy from "../Helpers/PrivacyPolicy"
import style from "./WidgetSecondPage.module.scss"

export const WidgetSecondPage = ({
  redBorderErrorForNumberOfPassengers,
  resultOfCreateReservation,
  termsAndPrivacyPolicyChecked,
  setTermsAndPrivacyPolicyChecked,
  iAgreeWithTransactionFeeNonrefundableChecked,
  setIAgreeWithTransactionFeeNonrefundableChecked,
  createReservationInteractive,
  setCreateReservationInteractive,
  ...props
}) => {
  const dispatch = useDispatch()

  // const [termsAndPrivacyPolicyChecked, setTermsAndPrivacyPolicyChecked] =
  //   useState(false)

  const [riderDetails, setRiderDetails] = useState(true)

  const [stateName, setStateName] = useState("")
  const [cityName, setCityName] = useState("")

  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [statesId, setStatesId] = useState(0)
  const [citiesId, setCitiesId] = useState(0)

  const paymentInfo = useSelector((state) => state.formData.paymentInfo)
  const clientInfo = useSelector((state) => state.formData.client)

  const formData = useSelector((state) => state.formData)

  const [cardType, setCardType] = useState("")
  const [creditCardNum, setCreditCardNum] = useState("#### #### #### ####")

  const { data, error, isLoading, isSuccess } = useGetStatesQuery()

  useEffect(() => {
    console.log(isSuccess)
    isSuccess && setStates(data)
  }, [isSuccess])

  const resultCities = useGetCitiesQuery(statesId)

  useEffect(() => {
    console.log(resultCities)
    setCities(resultCities.data)
  }, [resultCities, statesId, isSuccess])

  const handleNum = (e) => {
    setCreditCardNum(e.target.rawValue)
    dispatch(setCardNumber(e.target.rawValue))
    // setCardForPaymentSubmit(e.target.value)
    // console.log(e.target.value)
    // console.log(e.target.value);
  }

  const handleType = (type) => {
    setCardType(type)
    // console.log(type)
  }

  const extractStateId = (name) => {
    setStateName(name)
    const res = states.find((element, index, array) => {
      return element.name == name
    })
    res ? setStatesId(res.id) : setStatesId(null)

    dispatch(setStateId(res.id))
    // console.log(res)
  }
  const extractCityId = (name) => {
    setCityName(name)
    const res = cities.find((element, index, array) => {
      return element.name == name
    })
    res ? setCitiesId(res.id) : setCitiesId(null)
    dispatch(setCityId(res.id))
    // console.log(res)
  }

  const round = (n, dp) => {
    const h = +"1".padEnd(dp + 1, "0") // 10 or 100 or 1000 or etc
    return Math.round(n * h) / h
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(e)
    createReservation(formData)
  }

  //   const [createReservation, resultOfCreateReservation] =
  //     useCreateReservationMutation()

  //   useEffect(() => {
  //     getStates()
  //   }, [])

  const cars = useSelector((state) => state.fleet.cars)

  const selectedCarArr = cars.filter((car) => car.id == formData.carInfo.id)
  const selectedCar = selectedCarArr[0]
  // var str = selectedCar?.imageUrls[0]?.path
  // var n = str?.lastIndexOf("/")
  // var result = str?.substring(n + 1)
  // console.log(result)

  const [distance, setDistance] = useState(0)

  const handleMapReady = (mapProps, map) => {
    calculateAndDisplayRoute(map)
  }

  const calculateAndDisplayRoute = (map) => {
    const directionsService = new window.google.maps.DirectionsService()
    const directionsDisplay = new window.google.maps.DirectionsRenderer()

    directionsDisplay.setMap(map)
    const waypoints = []
    formData.orderAddressDetails.map((item) => {
      console.log(item)
      waypoints.push({
        location: { lat: item.latitude, lng: item.longitude },
        stopover: true,
      })
    })
    const origin = waypoints.shift().location
    const destination = waypoints.pop().location

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK") {
          directionsDisplay.setDirections(response)
          let distance = 0
          response.routes[0].legs.forEach((element) => {
            distance += element.distance.value
          })
          const miles = (distance / 1000) * 0.621371
          setDistance(miles.toFixed(2))
        } else {
          window.alert("Directions request failed due to " + status)
        }
      }
    )
  }

  const carsLocal = [
    {
      img: "sedan-min.png",
      type: "Sedan",
      price: "0",
      capacity: "6",
      luggage: "2",
      id: "1",
    },
    {
      img: "suv-min.png",
      type: "SUV",
      price: "0",
      capacity: "6",
      luggage: "2",
      id: "2",
    },
    {
      img: "mini-bus-min.png",
      type: "Mini bus",
      price: "",
      capacity: "6",
      luggage: "2",
      id: "3",
    },
    {
      img: "limousine-min.png",
      type: "Limousine",
      price: "",
      capacity: "6",
      luggage: "2",
      id: "4",
    },
  ]

  const selectedCarArrLocal = carsLocal?.filter(
    (car, index) => car.type == selectedCar.type
  )
  const selectedCarLocal = selectedCarArrLocal[0]
  // const round = (n, dp) => {
  //   const h = +"1".padEnd(dp + 1, "0") // 10 or 100 or 1000 or etc
  //   return Math.round(n * h) / h
  // }

  const [showTipsDropdown, setShowTipsDropdown] = useState(false)

  const [tipsDropdownValue, setTipsDropdownValue] = useState("")

  const [customTipsInput, setCustomTipsInput] = useState(false)

  useEffect(() => {
    dispatch(setOrderSum(selectedCar?.price + selectedCar?.transactionFee))
  }, [formData])
  return (
    <div className={style.inputsAndPreviewBlockContainer}>
      <div
        className={style.inputsBlock}
        style={{
          border:
            // formData.captcha &&
            formData.orderAddressDetails[0].rideCheckPoint &&
            "2px solid #2096eb",
        }}
      >
        {/* <button
          onClick={() => {
            console.log(formData.carInfo.id)
            console.log(cars)
            console.log({ ...selectedCarArr })
          }}
        >
          Click me
        </button> */}
        {/* <div className={style.wrapperWithBlackBorders}> */}
        <div className={style.wrapperInputs}>
          {createReservationInteractive && resultOfCreateReservation.isLoading && (
            <div
              style={{
                width: "399px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Preloader />
            </div>
          )}
          {createReservationInteractive && resultOfCreateReservation.isSuccess && (
            <div
              style={{
                width: "399px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SuccessIcon />
              <p
                style={{
                  marginTop: "20px",
                  marginBottom: "30px",
                  textAlign: "center",
                }}
              >
                Your reservation was successfully submitted
              </p>
              <button
                style={{
                  width: "65px",
                  height: "35px",
                  cursor: "pointer",
                  border: "none",
                  borderRadius: "6px",
                }}
                onClick={() => {
                  setCreateReservationInteractive(false)
                  setTermsAndPrivacyPolicyChecked(false)
                  setIAgreeWithTransactionFeeNonrefundableChecked(false)
                }}
              >
                Close
              </button>
            </div>
          )}
          {createReservationInteractive && resultOfCreateReservation.isError && (
            <div
              style={{
                width: "399px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ErroIcon />
              <p
                style={{
                  marginTop: "20px",
                  marginBottom: "30px",
                  textAlign: "center",
                }}
              >
                Something went wrong
              </p>
              <button
                style={{
                  width: "65px",
                  height: "35px",
                  cursor: "pointer",
                  border: "none",
                  borderRadius: "6px",
                }}
                onClick={() => {
                  setCreateReservationInteractive(false)
                  setTermsAndPrivacyPolicyChecked(false)
                  setIAgreeWithTransactionFeeNonrefundableChecked(false)
                }}
              >
                Close
              </button>
            </div>
          )}
          {!createReservationInteractive && (
            <form
              onSubmit={handleSubmit}
              className={style.formWrapper}
              // style={{ background: ThemeProviderAppBackgroundColor }}
            >
              {/* <button
            onClick={() => {
              console.log(data)
              console.log(result)
              //   console.log(statesId)
            }}
          >
            {" "}
            CLick MEE
          </button> */}
              <div className={style.paymentWrapper}>
                <div className={style.paymentContainer}>
                  <div className={style.paymentTitleContainer}>
                    <span
                      className={style.paymentTitleSelf}
                      // style={{ color: fontColor }}
                    >
                      Payment
                    </span>
                  </div>
                  <div className={style.isPassengerCardholderContainer}>
                    <div className={style.isPassengerCardholderTitleContainer}>
                      <span
                        className={
                          riderDetails
                            ? style.isPassengerCardholderTitleWhiteSelf
                            : style.isPassengerCardholderTitleGreySelf
                        }
                        //   style={{
                        //     color: fontColor,
                        //     opacity: riderDetails ? "1" : "0.3",
                        //   }}
                      >
                        Is passenger a cardholder?
                      </span>
                    </div>
                    <div className={style.isPassengerCardholderSwitchContainer}>
                      <div className={style.switchWrapper}>
                        <input
                          type="checkbox"
                          name={`swithDetails`}
                          className={style.switchSelf}
                          id={`swithDetails`}
                          defaultChecked={riderDetails}
                          onClick={() => {
                            setRiderDetails(!riderDetails)
                          }}
                        />
                        <label htmlFor={`swithDetails`}></label>
                      </div>
                    </div>
                  </div>
                  {!riderDetails && (
                    <div className={style.passengerDetailWrapper}>
                      <div className={style.passengerDetailTitleContainer}>
                        <span
                          className={style.passengerDetailTitleSelf}
                          // style={{ color: fontColor }}
                        >
                          Passenger Detail
                        </span>
                      </div>
                      <div className={style.cardholderInformationInputsWrapper}>
                        <div
                          className={
                            style.cardholderInformationInputSelfContainer
                          }
                          style={{ width: "50%" }}
                        >
                          <div
                            className={
                              style.cardholderInformationInputSelfContainerJustForFirstAndLastName
                            }
                            style={{ width: "100%" }}
                            //   inputsFontColor={inputsFontColor}
                          >
                            <input
                              name="greetClientInfo.firstName"
                              autoComplete="off"
                              placeholder="First Name"
                              // value={formSummary.greetClientInfo.firstName}
                              className={style.inputFirstAndLastName}
                              style={{
                                width: "100%",
                                borderRight: "none",
                                borderTopRightRadius: "0",
                                borderBottomRightRadius: "0",
                              }}
                              //   onChange={(event) => {
                              //     dispatch(setFirstName(event.target.value))
                              //   }}
                              // style={{
                              //   color: inputsFontColor,
                              //   borderLeft: `1px solid ${borderColorForInnerElements}`,
                              //   borderTop: `1px solid ${borderColorForInnerElements}`,
                              //   borderBottom: `1px solid ${borderColorForInnerElements}`,
                              //   background: inputsBackground,
                              //   borderTopLeftRadius: borderRadiusesForInnerElements,
                              //   borderBottomLeftRadius:
                              //     borderRadiusesForInnerElements,
                              // }}
                              // ref={register}
                              // inputsFontColor={inputsFontColor}
                            />
                          </div>
                        </div>
                        <div
                          className={
                            style.cardholderInformationInputSelfContainer2
                          }
                          style={{ width: "50%" }}
                        >
                          <input
                            name="greetClientInfo.lastName"
                            autoComplete="off"
                            //   value={formSummary.greetClientInfo.lastName}
                            placeholder="Last Name"
                            className={style.inputFirstAndLastName}
                            style={{
                              width: "100%",
                              borderLeft: "none",
                              borderTopLeftRadius: "0",
                              borderBottomLeftRadius: "0",
                            }}
                            // onChange={(event) => {
                            //   dispatch(setLastName(event.target.value))
                            // }}
                            //   style={{
                            //     color: inputsFontColor,
                            //     borderRight: `1px solid ${borderColorForInnerElements}`,
                            //     borderTop: `1px solid ${borderColorForInnerElements}`,
                            //     borderBottom: `1px solid ${borderColorForInnerElements}`,
                            //     background: inputsBackground,
                            //     borderTopRightRadius: borderRadiusesForInnerElements,
                            //     borderBottomRightRadius: borderRadiusesForInnerElements,
                            //   }}
                            //   ref={register}
                            //   inputsFontColor={inputsFontColor}
                          />
                        </div>
                      </div>
                      <div className={style.cardholderInformationInputsWrapper}>
                        <div
                          className={
                            style.cardholderInformationInputSelfContainer1
                          }
                        >
                          <input
                            name="greetClientInfo.email"
                            autoComplete="off"
                            placeholder="Email"
                            //   value={formSummary.greetClientInfo.email}
                            className={style.inputsDivided}
                            // onChange={(event) => {
                            //   dispatch(setEmail(event.target.value))
                            // }}
                            //   style={{
                            //     color: inputsFontColor,
                            //     border: `1px solid ${borderColorForInnerElements}`,

                            //     background: inputsBackground,
                            //     borderRadius: borderRadiusesForInnerElements,
                            //   }}
                            //   ref={register}
                            //   inputsFontColor={inputsFontColor}
                          />
                        </div>
                        <div
                          className={
                            style.cardholderInformationInputSelfContainer2
                          }
                        >
                          <input
                            name="greetClientInfo.phoneNumber"
                            autoComplete="off"
                            //   value={formSummary.greetClientInfo.phoneNumber}
                            placeholder="Phone Number"
                            className={style.inputsDivided}
                            // onChange={(event) => {
                            //   dispatch(setPhoneNumber(event.target.value))
                            // }}
                            //   style={{
                            //     color: inputsFontColor,
                            //     border: `1px solid ${borderColorForInnerElements}`,

                            //     background: inputsBackground,
                            //     borderRadius: borderRadiusesForInnerElements,
                            //   }}
                            //   ref={register}
                            //   inputsFontColor={inputsFontColor}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className={style.cardholderInformationWrapper}>
                    <div className={style.cardholderInformationTitleContainer}>
                      <span
                        className={style.cardholderInformationTitleSelf}
                        //   style={{ color: fontColor }}
                      >
                        Cardholder Information
                      </span>
                    </div>
                    <div className={style.cardholderInformationInputsWrapper}>
                      <div
                        className={
                          style.cardholderInformationInputSelfContainer
                        }
                        style={{ width: "50%" }}
                      >
                        <div
                          className={
                            style.cardholderInformationInputSelfContainerJustForFirstAndLastName
                          }
                          // inputsFontColor={inputsFontColor}
                          style={{ width: "100%" }}
                        >
                          <input
                            name="client.firstName"
                            autoComplete="off"
                            value={clientInfo.firstName}
                            placeholder="First Name"
                            //   error={errors.client?.firstName ? true : false}
                            className={style.inputFirstAndLastName}
                            //   ref={register}
                            style={{
                              width: "100%",
                              borderRight: "none",
                              borderTopRightRadius: "0",
                              borderBottomRightRadius: "0",
                              // color: inputsFontColor,
                              // borderLeft: `1px solid ${borderColorForInnerElements}`,
                              // borderTop: `1px solid ${borderColorForInnerElements}`,
                              // borderBottom: `1px solid ${borderColorForInnerElements}`,
                              // background: inputsBackground,
                              // borderTopLeftRadius: borderRadiusesForInnerElements,
                              // borderBottomLeftRadius: borderRadiusesForInnerElements,
                            }}
                            onChange={(event) => {
                              dispatch(setFirstName(event.target.value))
                            }}
                            //   inputsFontColor={inputsFontColor}
                          />
                        </div>
                        {/* {errors.client?.firstName && (
                    <p className={style.errorInputs}>
                      {errors.client?.firstName.message}
                    </p>
                  )} */}
                      </div>
                      <div
                        className={
                          style.cardholderInformationInputSelfContainer
                        }
                        style={{ width: "50%" }}
                      >
                        <input
                          name="client.lastName"
                          autoComplete="off"
                          placeholder="Last Name"
                          value={clientInfo.lastName}
                          // error={errors.client?.lastName ? true : false}
                          className={style.inputFirstAndLastName}
                          // ref={register}
                          style={{
                            width: "100%",
                            borderLeft: "none",
                            borderTopLeftRadius: "0",
                            borderBottomLeftRadius: "0",
                            //   color: inputsFontColor,
                            //   borderRight: `1px solid ${borderColorForInnerElements}`,
                            //   borderTop: `1px solid ${borderColorForInnerElements}`,
                            //   borderBottom: `1px solid ${borderColorForInnerElements}`,
                            //   background: inputsBackground,
                            //   borderTopRightRadius: borderRadiusesForInnerElements,
                            //   borderBottomRightRadius: borderRadiusesForInnerElements,
                          }}
                          onChange={(event) => {
                            dispatch(setLastName(event.target.value))
                          }}
                          // inputsFontColor={inputsFontColor}
                        />
                        {/* {errors.client?.lastName && (
                    <p className={style.errorInputs}>
                      {errors.client?.lastName.message}
                    </p>
                  )} */}
                      </div>
                    </div>

                    <div className={style.cardholderInformationInputsWrapper}>
                      <div
                        className={
                          style.cardholderInformationInputSelfContainer1
                        }
                      >
                        <input
                          name="client.email"
                          autoComplete="off"
                          placeholder="Email"
                          value={clientInfo.email}
                          // error={errors.client?.email ? true : false}
                          className={style.inputsDivided}
                          onChange={(event) => {
                            dispatch(setEmail(event.target.value))
                          }}
                          // style={{
                          //   color: inputsFontColor,
                          //   border: `1px solid ${borderColorForInnerElements}`,
                          //   background: inputsBackground,
                          //   borderRadius: borderRadiusesForInnerElements,
                          // }}
                          // ref={register}
                          // inputsFontColor={inputsFontColor}
                        />
                        {/* {errors.client?.email && (
                    <p className={style.errorInputs}>
                      {errors.client?.email.message}
                    </p>
                  )} */}
                      </div>
                      <div
                        className={
                          style.cardholderInformationInputSelfContainer2
                        }
                      >
                        <input
                          name="client.phoneNumber"
                          autoComplete="off"
                          value={clientInfo.phoneNumber}
                          placeholder="Phone Number"
                          // error={errors.client?.phoneNumber ? true : false}
                          className={style.inputsDivided}
                          onChange={(event) => {
                            dispatch(setPhoneNumber(event.target.value))
                          }}
                          // style={{
                          //   color: inputsFontColor,
                          //   border: `1px solid ${borderColorForInnerElements}`,
                          //   background: inputsBackground,
                          //   borderRadius: borderRadiusesForInnerElements,
                          // }}
                          // ref={register}
                          // inputsFontColor={inputsFontColor}
                        />
                        {/* {errors.client?.phoneNumber && (
                    <p className={style.errorInputs}>
                      {errors.client?.phoneNumber.message}
                    </p>
                  )} */}
                      </div>
                    </div>
                    <div className={style.cardholderInformationInputsWrapper}>
                      {/* <div
                        className={
                          style.cardholderInformationInputsContainerForPositionErrorMessage
                        }
                      > */}
                      <input
                        name="client.address"
                        autoComplete="off"
                        placeholder="Address"
                        value={clientInfo.address}
                        // ref={register}
                        // error={errors.client?.address ? true : false}
                        className={style.inputFullWidth}
                        style={{
                          width: "100%",
                          paddingRight: "0",
                          //   color: inputsFontColor,
                          //   border: `1px solid ${borderColorForInnerElements}`,
                          //   background: inputsBackground,
                          //   borderRadius: borderRadiusesForInnerElements,
                        }}
                        onChange={(event) => {
                          dispatch(setAddress(event.target.value))
                        }}
                        // inputsFontColor={inputsFontColor}
                      />
                      {/* {errors.client?.address && (
                    <p className={style.errorInputs}>
                      {errors.client?.address.message}
                    </p>
                  )} */}
                      {/* </div> */}
                    </div>

                    <div className={style.cardholderInformationInputsWrapper}>
                      <div
                        className={
                          style.cardholderInformationInputsContainerForStateDropdownIcon
                        }
                        //   style={{ color: inputsFontColor }}
                      >
                        <Autocomplete
                          disablePortal
                          onChange={(event, newValue) => {
                            // console.log(newValue)
                            newValue
                              ? extractStateId(newValue)
                              : setStatesId(null)
                          }}
                          options={states.map((state) => state.name)}
                          renderInput={(params) => (
                            <div ref={params.InputProps.ref}>
                              <input
                                type="text"
                                {...params.inputProps}
                                placeholder="State"
                                className={style.inputFullWidth}
                                style={{
                                  width: "100%",
                                  paddingRight: "0",
                                  // color: inputsFontColor,
                                  // border: `1px solid ${borderColorForInnerElements}`,
                                  // background: inputsBackground,
                                  // borderRadius: borderRadiusesForInnerElements,
                                }}
                                //   inputsFontColor={inputsFontColor}
                              />
                            </div>
                          )}
                        />

                        {/* {statesIdError && (
                    <p className={style.errorInputs}>Required</p>
                  )} */}
                      </div>
                    </div>
                    <div className={style.cardholderInformationInputsWrapper}>
                      <div
                        className={
                          style.cardholderInformationInputSelfContainer1City
                        }
                        //   style={{ color: inputsFontColor }}
                      >
                        <Autocomplete
                          disablePortal
                          onChange={(event, newValue) => {
                            // console.log(cities)
                            newValue
                              ? extractCityId(newValue)
                              : setCitiesId(null)
                          }}
                          options={cities?.map((city) => city.name)}
                          renderInput={(params) => (
                            <div ref={params.InputProps.ref}>
                              <input
                                type="text"
                                {...params.inputProps}
                                className={style.inputsDivided}
                                placeholder="City"
                                style={{
                                  width: "100%",
                                  paddingRight: "25px",
                                  boxSizing: "border-box",
                                  // color: inputsFontColor,
                                  // border: `1px solid ${borderColorForInnerElements}`,
                                  // background: inputsBackground,
                                  // borderRadius: borderRadiusesForInnerElements,
                                }}
                                //   inputsFontColor={inputsFontColor}
                              />
                            </div>
                          )}
                        />

                        {/* {citiesIdError && (
                    <p className={style.errorInputs}>Required</p>
                  )} */}
                      </div>
                      <div
                        className={
                          style.cardholderInformationInputSelfContainer2
                        }
                      >
                        <input
                          name="client.zip"
                          autoComplete="off"
                          placeholder="ZIP"
                          // ref={register}
                          value={clientInfo.zip}
                          // error={errors.client?.address ? true : false}
                          className={style.inputsDivided}
                          onChange={(event) => {
                            dispatch(setZip(event.target.value))
                          }}
                          // style={{
                          //   color: inputsFontColor,
                          //   border: `1px solid ${borderColorForInnerElements}`,
                          //   background: inputsBackground,
                          //   borderRadius: borderRadiusesForInnerElements,
                          // }}
                          // inputsFontColor={inputsFontColor}
                        />
                        {/* {errors.client?.zip && (
                    <p className={style.errorInputs}>
                      {errors.client?.zip.message}
                    </p>
                  )} */}
                      </div>
                    </div>
                  </div>
                  <div className={style.cardInformationWrapper}>
                    <div className={style.cardInformationTitleContainer}>
                      <span
                        className={style.cardInformationTitleSelf}
                        //   style={{ color: fontColor }}
                      >
                        Card information
                      </span>
                    </div>
                    <div className={style.cardholderInformationInputsWrapper}>
                      <div
                        className={
                          style.cardholderInformationInputsContainerForPositionErrorMessage
                        }
                      >
                        <Cleave
                          delimiter="-"
                          options={{
                            creditCard: true,
                            onCreditCardTypeChanged: handleType,
                          }}
                          name="paymentInfo.cardNumber"
                          // error={errors.paymentInfo?.cardNumber ? true : false}
                          value={paymentInfo.cardNumber}
                          onChange={handleNum}
                          placeholder="Card number"
                          className={
                            style.cardholderInformationInputWithFullWidthSelf
                          }
                          // style={{
                          //   color: inputsFontColor,
                          //   border: `1px solid ${borderColorForInnerElements}`,
                          //   background: inputsBackground,
                          //   borderRadius: borderRadiusesForInnerElements,
                          // }}
                        />

                        {/* {cardForPaymentSubmitError && (
                    <p className={style.errorInputs}>Required</p>
                  )} */}
                      </div>
                    </div>
                    <div className={style.cardholderInformationInputsWrapper}>
                      <div
                        className={
                          style.cardholderInformationInputSelfContainer1
                        }
                      >
                        <ReactInputMask
                          name="paymentInfo.month"
                          // ref={register}
                          mask="99/99"
                          autoComplete="off"
                          value={`${paymentInfo.month}/${paymentInfo.year}`}
                          onChange={(event) => {
                            let extractedMonthValue =
                              event.target.value.substring(
                                0,
                                event.target.value.lastIndexOf("/")
                              )

                            dispatch(setMonth(extractedMonthValue))

                            var str = event.target.value
                            var n = str?.lastIndexOf("/")
                            var extractedYearValue = str?.substring(n + 1)
                            dispatch(setYear(extractedYearValue))
                            console.log(extractedMonthValue)
                          }}
                        >
                          {() => (
                            <input
                              placeholder="mm/yy"
                              autoComplete="off"
                              // error={errors.paymentInfo?.month ? true : false}
                              className={style.cardholderInformationInputSelf}

                              // style={{
                              //   color: inputsFontColor,
                              //   border: `1px solid ${borderColorForInnerElements}`,
                              //   background: inputsBackground,
                              //   borderRadius: borderRadiusesForInnerElements,
                              // }}
                            />
                          )}
                        </ReactInputMask>
                        {/* {errors.paymentInfo?.month && (
                    <p className={style.errorInputs}>
                      {errors.paymentInfo?.month.message}
                    </p>
                  )} */}
                      </div>
                      <div
                        className={
                          style.cardholderInformationInputSelfContainer2
                        }
                      >
                        <ReactInputMask
                          name="paymentInfo.cvc"
                          // ref={register}
                          mask={cardType == "amex" ? "9999" : "999"}
                          autoComplete="off"
                          value={paymentInfo.cvc}
                          onChange={(event) => {
                            dispatch(setCvc(event.target.value))
                          }}
                        >
                          {() => (
                            <input
                              placeholder="CVV/CVC"
                              autoComplete="off"
                              // error={errors.paymentInfo?.cvc ? true : false}
                              className={style.inputsDivided}

                              // style={{
                              //   color: inputsFontColor,
                              //   border: `1px solid ${borderColorForInnerElements}`,
                              //   background: inputsBackground,
                              //   borderRadius: borderRadiusesForInnerElements,
                              // }}
                              // inputsFontColor={inputsFontColor}
                            />
                          )}
                        </ReactInputMask>
                        {/* {errors.paymentInfo?.cvc && (
                    <p className={style.errorInputs}>
                      {errors.paymentInfo?.cvc.message}
                    </p>
                  )} */}
                      </div>
                    </div>
                  </div>
                  <div className={style.checkboxWrapper}>
                    <label id="input" className={style.checkboxLabel}>
                      <input
                        type="checkbox"
                        onClick={() =>
                          setTermsAndPrivacyPolicyChecked(
                            !termsAndPrivacyPolicyChecked
                          )
                        }
                        // defaultValue={false}
                        // value={termsAndPrivacyPolicyChecked}
                        htmlFor="input"
                        className={style.checkboxInput}
                      />
                      <span className={style.checkboxSpan}></span>
                    </label>
                    <div className={style.termsAndPrivacyPolicyContainer}>
                      <TermsOfUse />
                      <PrivacyPolicy />
                    </div>
                    {/* <TermsOfUse />
              <PrivacyPolicy /> */}
                  </div>
                  <div className={style.checkboxWrapper}>
                    <label id="input" className={style.checkboxLabel}>
                      <input
                        type="checkbox"
                        onClick={() =>
                          setIAgreeWithTransactionFeeNonrefundableChecked(
                            !iAgreeWithTransactionFeeNonrefundableChecked
                          )
                        }
                        // defaultValue={false}
                        // value={iAgreeWithTransactionFeeNonrefundableChecked}
                        htmlFor="input"
                        className={style.checkboxInput}
                      />
                      <span className={style.checkboxSpan}></span>
                    </label>
                    <div className={style.iAgreeWithContainer}>
                      I agree that the transaction fee is non-refundable
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
        {/* </div> */}
      </div>
      <div className={style.previewBlock}>
        {/* <div className={style.wrapperWithBlackBorders}> */}
        <div className={style.wrapper}>
          {/* <div className={style.mapContainer}>
            <Map
              google={props.google}
              // styles={MapStyles}
              disableDefaultUI={false}
              className={"map"}
              onReady={handleMapReady}
            ></Map>
          </div> */}
          {/* <button onClick={() => console.log(selectedCar[0])}></button> */}
          <div className={style.carWrapper}>
            {/* <CarInformationComponent /> */}
            <CarInformationComponent
              imageUrl={selectedCarLocal?.img}
              altTypeOfVehicle={selectedCarLocal?.type}
              carPrice={selectedCar?.price}
              carCapacity={selectedCar?.capacity}
              carLuggage={selectedCarLocal?.luggage}
              // carId={selectedCar?.id}
              disableClickOnCardClick={true}
              // selectedCar={selectedCar}
              // setSelectedCar={setSelectedCar}
            />
          </div>
          <div className={style.pickUpDateContainer}>
            <span
              className={style.pickUpDateTitle}
              style={{
                color: "black",
              }}
            >
              Pick Up Date
            </span>
            <div className={style.reservationDetailsItemPointedLineContainer}>
              <div
                className={style.reservationDetailsItemPointedLineSelf}
                // style={{
                //   borderBottom: `2px dotted ${dotsLineColor}`,
                // }}
              />
            </div>
            <div className={style.pickUpDateValueContainer}>
              <span
                className={style.pickUpDateValue}
                style={{
                  color: "black",
                }}
              >
                {formData.dateValue}
              </span>
            </div>
          </div>
          <div className={style.pickUpTimeContainer}>
            <span
              className={style.pickUpTimeTitle}
              style={{
                color: "black",
              }}
            >
              Pick Up Time
            </span>
            <div className={style.reservationDetailsItemPointedLineContainer}>
              <div
                className={style.reservationDetailsItemPointedLineSelf}
                // style={{
                //   borderBottom: `2px dotted ${dotsLineColor}`,
                // }}
              />
            </div>
            <div className={style.pickUpTimeValueContainer}>
              <span
                className={style.pickUpTimeValue}
                style={{
                  color: "black",
                }}
              >
                {formData.timeValue}{" "}
                {formData.timeForDefaultValueAMPMalignment.ampm}
              </span>
            </div>
          </div>
          <div className={style.fromContainer}>
            <span
              className={style.fromTitle}
              style={{
                color: "black",
              }}
            >
              From
            </span>
            <div className={style.reservationDetailsItemPointedLineContainer}>
              <div
                className={style.reservationDetailsItemPointedLineSelf}
                // style={{
                //   borderBottom: `2px dotted ${dotsLineColor}`,
                // }}
              />
            </div>
            <div className={style.fromValueContainer}>
              <span
                className={style.fromValue}
                style={{
                  color: "black",
                }}
              >
                {formData.orderAddressDetails[0].rideCheckPoint}
              </span>
            </div>
          </div>
          <div className={style.toContainer}>
            <span
              className={style.toTitle}
              style={{
                color: "black",
              }}
            >
              To
            </span>
            <div className={style.reservationDetailsItemPointedLineContainer}>
              <div
                className={style.reservationDetailsItemPointedLineSelf}
                // style={{
                //   borderBottom: `2px dotted ${dotsLineColor}`,
                // }}
              />
            </div>
            <div className={style.toValueContainer}>
              <span
                className={style.toValue}
                style={{
                  color: "black",
                }}
              >
                {formData.orderAddressDetails[1].rideCheckPoint}
              </span>
            </div>
          </div>
          <div className={style.personsContainer}>
            <span
              className={style.personsTitle}
              style={{
                color: "black",
              }}
            >
              Persons
            </span>
            <div className={style.reservationDetailsItemPointedLineContainer}>
              <div
                className={style.reservationDetailsItemPointedLineSelf}
                // style={{
                //   borderBottom: `2px dotted ${dotsLineColor}`,
                // }}
              />
            </div>
            <div className={style.personsValueContainer}>
              <span
                className={style.personsValue}
                style={{
                  color: "black",
                }}
              >
                {formData.passengersQuantity}
              </span>
            </div>
          </div>
          {formData.showCarsWithSafetySeat && formData.boosterSeatCount > 0 && (
            <div className={style.youthBoosterSeatContainer}>
              <span
                className={style.personsTitle}
                style={{
                  color: "black",
                }}
              >
                Youth Booster Seat
              </span>
              <div className={style.reservationDetailsItemPointedLineContainer}>
                <div
                  className={style.reservationDetailsItemPointedLineSelf}
                  // style={{
                  //   borderBottom: `2px dotted ${dotsLineColor}`,
                  // }}
                />
              </div>
              <div className={style.youthBoosterSeatValueContainer}>
                <span
                  className={style.youthBoosterSeatValue}
                  style={{
                    color: "black",
                  }}
                >
                  ${selectedCar?.boosterSeatPrice}
                </span>
              </div>
            </div>
          )}
          {formData.showCarsWithSafetySeat && formData.safetySeatCount > 0 && (
            <div className={style.infantAndChildSafetySeatContainer}>
              <span
                className={style.infantAndChildSafetySeatTitle}
                style={{
                  color: "black",
                }}
              >
                Infant & Child Safety Seat
              </span>
              <div className={style.reservationDetailsItemPointedLineContainer}>
                <div
                  className={style.reservationDetailsItemPointedLineSelf}
                  // style={{
                  //   borderBottom: `2px dotted ${dotsLineColor}`,
                  // }}
                />
              </div>
              <div className={style.infantAndChildSafetySeatValueContainer}>
                <span
                  className={style.infantAndChildSafetySeatValue}
                  style={{
                    color: "black",
                  }}
                >
                  ${selectedCar?.safetySeatPrice}
                </span>
              </div>
            </div>
          )}
          {formData.isGateMeeting && (
            <div className={style.meetAndGreetLuggageAssistContainer}>
              <span
                className={style.meetAndGreetLuggageAssistTitle}
                style={{
                  color: "black",
                }}
              >
                Meet & Great/Luggage Assist
              </span>
              <div className={style.reservationDetailsItemPointedLineContainer}>
                <div
                  className={style.reservationDetailsItemPointedLineSelf}
                  // style={{
                  //   borderBottom: `2px dotted ${dotsLineColor}`,
                  // }}
                />
              </div>
              <div className={style.meetAndGreetLuggageAssistValueContainer}>
                <span
                  className={style.meetAndGreetLuggageAssistValue}
                  style={{
                    color: "black",
                  }}
                >
                  ${selectedCar?.greetAndMeetPrice}
                </span>
              </div>
            </div>
          )}

          {/* <div className={style.preferenceContainer}>
          <span
            className={style.preferenceTitle}
            style={{
              color: "black",
            }}
          >
            Preference
          </span>
          <div className={style.reservationDetailsItemPointedLineContainer}>
            <div
              className={style.reservationDetailsItemPointedLineSelf}
              // style={{
              //   borderBottom: `2px dotted ${dotsLineColor}`,
              // }}
            />
          </div>
          <div className={style.preferenceValueContainer}>
            <span
              className={style.preferenceValue}
              style={{
                color: "black",
              }}
            >
            
            </span>
          </div>
        </div> */}
          {/* <div className={style.tipsContainer}>
            <span
              className={style.tipsTitle}
              style={{
                color: "black",
              }}
            >
              Tips
            </span>
            <div className={style.reservationDetailsItemPointedLineContainer}>
              <div
                className={style.reservationDetailsItemPointedLineSelf}
                // style={{
                //   borderBottom: `2px dotted ${dotsLineColor}`,
                // }}
              />
            </div>
            <div className={style.tipsValueContainer}>
              
              {customTipsInput ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <input
                    className={style.tipsValueInput}
                    type="number"
                    onChange={(event) => {
                      // if (event.target.value == Number){
                      dispatch(setTips(event.target.value))
                      // }
                    }}
                  />
                  <span>%</span>
                </div>
              ) : (
                <>
                  <div
                    className={style.tipsValueInput}
                    onClick={() => {
                      setShowTipsDropdown(!showTipsDropdown)
                    }}
                  >
                    <span className={style.tipsValue}>{tipsDropdownValue}</span>
                    <DropDownArrowIcon />
                  </div>
                  {showTipsDropdown && (
                    <div className={style.dropDownContainer}>
                      <span
                        onClick={(event) => {
                          setTipsDropdownValue(event.target.innerText)
                          dispatch(setTips(event.target.innerText))
                          console.log(event.target.innerText)
                        }}
                      >
                        0%
                      </span>
                      <span
                        onClick={(event) => {
                          setTipsDropdownValue(event.target.innerText)
                          dispatch(setTips(event.target.innerText))
                          console.log(event.target.innerText)
                        }}
                      >
                        5%
                      </span>
                      <span
                        onClick={(event) => {
                          setTipsDropdownValue(event.target.innerText)
                          dispatch(setTips(event.target.innerText))
                          console.log(event.target.innerText)
                        }}
                      >
                        10%
                      </span>
                      <span
                        onClick={(event) => {
                          setTipsDropdownValue(event.target.innerText)
                          dispatch(setTips(event.target.innerText))
                          console.log(event.target.innerText)
                        }}
                      >
                        15%
                      </span>
                      <span
                        onClick={(event) => {
                          // setTipsDropdownValue(event.target.innerText)
                          // dispatch(setTips(event.target.innerText))
                          // console.log(event.target.innerText)
                          setCustomTipsInput(true)
                        }}
                      >
                        Custom
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div> */}
          <div className={style.transactionFeeContainer}>
            <span
              className={style.transactionFeeTitle}
              style={{
                color: "black",
              }}
            >
              Transaction Fee
            </span>
            <div className={style.reservationDetailsItemPointedLineContainer}>
              <div
                className={style.reservationDetailsItemPointedLineSelf}
                // style={{
                //   borderBottom: `2px dotted ${dotsLineColor}`,
                // }}
              />
            </div>
            <div className={style.transactionFeeValueContainer}>
              <span
                className={style.transactionFeeValue}
                style={{
                  color: "black",
                }}
              >
                ${selectedCar?.transactionFee}
              </span>
            </div>
          </div>
          <div className={style.totalContainer}>
            <span
              className={style.totalTitle}
              style={{
                color: "black",
              }}
            >
              Total
            </span>

            <div className={style.reservationDetailsItemPointedLineContainer}>
              <div
                className={style.reservationDetailsItemPointedLineSelf}
                // style={{
                //   borderBottom: `2px dotted ${dotsLineColor}`,
                // }}
              />
            </div>
            <div className={style.totalValueContainer}>
              <span
                className={style.totalValue}
                style={{
                  color: "black",
                }}
              >
                {`$${round(
                  selectedCar?.price + selectedCar?.transactionFee,
                  2
                )}`}
              </span>
            </div>
          </div>
          <div className={style.notesContainer}>
            <textarea
              className={style.notesTextArea}
              onChange={(event) => {
                dispatch(setNotes(event.target.value))
              }}
              placeholder="Notes"
            ></textarea>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}
