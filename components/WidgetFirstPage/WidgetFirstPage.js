import style from "./WidgetFirstPage.module.scss"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete"
import { useState, useRef, useEffect } from "react"
import Autocomplete from "@mui/material/Autocomplete"
import { getAirlines } from "../../pages/api/getAirlines"
import { Modal } from "../Helpers/Modal"
import CalendarPicker from "@mui/lab/CalendarPicker"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import {
  EndLocationIcon,
  MinusIcon,
  PlusIcon,
  StartLocationIcon,
  DateIcon,
  ReferalCodeIcon,
  RoundTripIcon,
  NumberOfPassengersIcon,
  MeetAndGreetIcon,
  LuggageIcon,
  PlaneIcon,
  Ticket,
  SafetySeatIcon,
  HourlyIcon,
  StartLocationIconMobile,
  EndLocationIconMobile,
  DateIconMobile,
  RoundTripIconMobile,
  PlaneIconMobile,
  TicketMobile,
  NumberOfPassengersIconMobile,
  MeetAndGreetIconMobile,
  LuggageIconMobile,
  SafetySeatIconMobile,
  HourlyIconMobile,
  ReferalCodeIconMobile,
} from "../../public/Assets"
import { useDispatch, useSelector } from "react-redux"
import {
  addToLocation,
  removeToLocation,
  setAMPM,
  setBookingType,
  setFromOrderAddressDetails,
  setFromRideCheckpoint,
  setOrderAddressDetails,
  setOrderDate,
  setOrderDateTime,
  setOrderTime,
  // setToAdditionalRideCheckpoints,
  setToOrderAddressDetails,
  setToRideCheckpoint,
  setAirlinesId,
  setFlightNumber,
  setLuggageCount,
  setNumberOfPassenger,
  setBoosterSeatCount,
  setHourlySwitch,
  setHoursCount,
  setSafetySeatCount,
  setSafetySeatSwitch,
  setCaptcha,
  setIsGateMeeting,
} from "../../reduxToolkit/slices/formData"

import {
  useGetFleetMutation,
  useGetFleetQuery,
} from "../../reduxToolkit/services/fleetApi"
import { CarInformationComponent } from "../WidgetFourthPage/CarInformationComponent"
import ReCAPTCHA from "react-google-recaptcha"
import { setCars } from "../../reduxToolkit/slices/fleetSlice"
import { useMediaQuery } from "@mui/material"

export const WidgetFirstPage = ({
  redBorderErrorForFromAddress,
  redBorderErrorForToAddress,
  redBorderErrorForDate,
  redBorderErrorForTime,
  redBorderErrorForAMPM,
  redBorderErrorForNumberOfPassengers,
}) => {
  // const [showHoursInput, setshowHoursInput] = useState(false)
  // const [showLuggageCountInput, setShowLuggageCountInput] = useState(false)
  // const [showGreetTheSamePerson, setShowGreetTheSamePerson] = useState(false)
  // const [showYouthBoosterAndSafetySeat, setShowYouthBoosterAndSafetySeat] =
  //   useState(false)
  // const [editAmountMode, setEditAmountMode] = useState(false)

  // const [selectedClientItem, setSelectedClientItem] = useState(null)
  // const [selectedVehicleItem, setSelectedVehicleItem] = useState(null)
  // const [selectedDriverItem, setSelectedDriverItem] = useState(null)

  // const [showAddClientBlock, setShowAddClientBlock] = useState(false)

  // const [showUpDatePicker, setShowUpDatePicker] = useState(false)

  // const [typeOfList, setTypeOfList] = useState("")
  // const [showTypeOfVehicleDropdown, setShowTypeOfVehicleDropdown] =
  //   useState(false)

  // const [inputValueTypeOfVehicle, setInputValueTypeOfVehicle] = useState("")
  // const [searchTerm, setSearchTerm] = useState("")

  // const [dateToDatePicker, setDateToDatePicker] = useState(new Date())
  // const [valueForInputAppearence, setValueForInputAppearence] = useState(null)

  // const amountInputRef = useRef(null)

  const refForMaskedTimeInput = useRef()

  const [endteredTime, setEndteredTime] = useState("")

  const timeInputHandler = () => {
    const timeNumberAfterColon = ":"

    const setZeroOrNot = (timeValue1) => {
      if (timeValue1 > 1) {
        return 0
      }
      return timeValue1
    }
    const timeValue = refForMaskedTimeInput.current.value
      .replace(/\D/g, "")
      .match(/(\d{0,1})(\d{0,1})(\d{0,1})(\d{0,1})/)
    refForMaskedTimeInput.current.value = timeValue[4]
      ? `${setZeroOrNot(timeValue[1])}${timeValue[2]}${
          (timeValue[3] || timeValue[2]) && timeNumberAfterColon
        }${timeValue[3]}${timeValue[4]}`
      : `${timeValue[1]}${
          (timeValue[3] || timeValue[2]) && timeNumberAfterColon
        }${timeValue[2]}${timeValue[3]}`

    setEndteredTime(refForMaskedTimeInput.current.value)
    // setTimeForDefaultValue(inputCard.current.value)
    console.log(refForMaskedTimeInput.current.value)
  }

  // const [
  //   showSuccessfullyCreatedReservation,
  //   setShowSuccessfullyCreatedReservation,
  // ] = useState(false)

  //   const { isHourlyCheckboxEnabled } = useAppSelector(
  //     (state) => state.createReservationReducer
  //   )
  //   const { toggleIsHourlyCheckboxEnabled } = createReservationSlice.actions

  const [fromAddress, setFromAddress] = useState([])
  const [toAddress, setToAddress] = useState("")
  const [toDestinations, setToDestinations] = useState([
    {
      rideCheckPoint: "",
      latitude: 0,
      longitude: 0,
      placeType: 0,
      placeId: "",
    },
  ])

  const formData = useSelector((state) => state.formData)

  const [fromLocation, ...toLocations] = formData.orderAddressDetails
  const [isAirline, setIsAirline] = useState(false)

  const handleSelectFromLocation = async (address, index) => {
    let selectedArray = null
    setFromAddress(address, index)
    const results = await geocodeByAddress(address)
    const latLng = await getLatLng(results[0])
    const placeId = results[0].place_id
    let placeType = 0
    if (results[0].types.some((types) => types === "airport")) {
      placeType = 2
    }
    selectedArray = fromLocation
    selectedArray = {
      // ...selectedArray[index],
      rideCheckPoint: address,
      latitude: latLng.lat,
      longitude: latLng.lng,
      placeId: placeId,
      placeType: placeType,
    }
    setFromAddress(selectedArray)
    dispatch(setFromOrderAddressDetails(selectedArray))
    let firstAirline =
      fromLocation?.rideCheckPoint?.match(/(^|\W)Airport($|\W)/)

    if (firstAirline) {
      setIsAirline(true)
      // setBookingType(3)
      dispatch(setBookingType(3))
      // fetchAirlines()
      // setDisableHourly(true)
    } else {
      setIsAirline(false)
      //   setDisableHourly(false)
    }
  }

  const addToDestination = () => {
    let newArrWithAddedToDestination = [
      ...toLocations,
      {
        rideCheckPoint: "",
        latitude: 0,
        longitude: 0,
        placeType: 0,
        placeId: "",
      },
    ]
    setToDestinations(newArrWithAddedToDestination)
  }

  const setToAddressHandler = (adress, index) => {
    // let newArr = [...toLocations]
    // newArr[index].rideCheckPoint = adress
    // setToDestinations(newArr)
  }

  const handleSelectToDestination = async (address, index) => {
    let selectedArray = null
    setToAddressHandler(address, index)
    const results = await geocodeByAddress(address)
    const latLng = await getLatLng(results[0])
    const placeId = results[0].place_id
    let placeType = 0
    if (results[0].types.some((types) => types === "airport")) {
      placeType = 2
    }

    // selectedArray = [...toLocations]
    selectedArray = {
      // ...selectedArray[index],
      rideCheckPoint: address,
      latitude: latLng.lat,
      longitude: latLng.lng,
      placeId: placeId,
      placeType: placeType,
    }
    setToDestinations(selectedArray)
    dispatch(
      setToOrderAddressDetails({
        selectedRideCheckPoint: selectedArray,
        index: index,
      })
    )
  }

  const removeToDestination = (index) => {
    let newArrayWithRemovedDestination = [...toLocations]
    newArrayWithRemovedDestination.splice(index, 1)
    setToDestinations(newArrayWithRemovedDestination)
  }

  const [airlines, setAirlines] = useState([])

  const fetchAirlines = async () => {
    const data = await getAirlines()

    const res = data.map((airline) => {
      return {
        id: `${airline.id}`,
        name: `${airline.code} ` + `${airline.name}`,
      }
    })

    setAirlines(res)
    // console.log(airlines)
  }

  const [airlineId, setAirlineId] = useState(0)

  const extractAirlineId = (name) => {
    const res = airlines.find((element, index, array) => {
      return element.name == name
    })
    res ? setAirlineId(res.id) : setAirlineId(null)
    // setAirlineNAme(name)
    // console.log(res)
  }
  const [date, setDate] = useState(null)
  const [time, setTime] = useState("")
  const [AMPMLocal, setAMPMLocal] = useState("")

  const inputCard = useRef()
  const startsWithTwo = time[0] === "2"

  const handleChangeTime = () => {
    const timeNumberAfterColon = ":"

    const setZeroOrNot = (timeValue1) => {
      if (timeValue1 > 1) {
        return 0
      }
      return timeValue1
    }
    const timeValue = inputCard?.current?.value
      .replace(/\D/g, "")
      .match(/(\d{0,1})(\d{0,1})(\d{0,1})(\d{0,1})/)
    inputCard.current.value = timeValue[4]
      ? `${setZeroOrNot(timeValue[1])}${timeValue[2]}${
          (timeValue[3] || timeValue[2]) && timeNumberAfterColon
        }${timeValue[3]}${timeValue[4]}`
      : `${timeValue[1]}${
          (timeValue[3] || timeValue[2]) && timeNumberAfterColon
        }${timeValue[2]}${timeValue[3]}`

    setTime(inputCard.current.value)
    dispatch(setOrderTime(inputCard.current.value))
    // setTimeForDefaultValue(inputCard.current.value)
    // console.log(timeValue)
  }

  const handleChangeTimeInRoundTripSecondField = () => {
    const timeNumberAfterColon = ":"

    const setZeroOrNot = (timeValue1) => {
      if (timeValue1 > 1) {
        return 0
      }
      return timeValue1
    }
    const timeValue = inputCard.current.value
      .replace(/\D/g, "")
      .match(/(\d{0,1})(\d{0,1})(\d{0,1})(\d{0,1})/)
    inputCard.current.value = timeValue[4]
      ? `${setZeroOrNot(timeValue[1])}${timeValue[2]}${
          (timeValue[3] || timeValue[2]) && timeNumberAfterColon
        }${timeValue[3]}${timeValue[4]}`
      : `${timeValue[1]}${
          (timeValue[3] || timeValue[2]) && timeNumberAfterColon
        }${timeValue[2]}${timeValue[3]}`

    setTime(inputCard.current.value)
    // setTimeForDefaultValue(inputCard.current.value)
    console.log(timeValue)
  }

  const [show, setShow] = useState(false)

  const handleChangeAMPM = (event, newAlignment) => {
    if (newAlignment !== null) {
      //   setTimeForDefaultValueAMPM(event.target.textContent)
      // setAMPMLocal(event.target.textContent)
      dispatch(setAMPM(event.target.textContent))
    }
    // setAMPM(event.target.textContent)

    // setTimeForDefaultValueAMPM(event.target.textContent)
    console.log(formData.timeForDefaultValueAMPMalignment.ampm)
  }

  const handleChangeAMPMInRoundTripSecondField = (event, newAlignment) => {
    if (newAlignment !== null) {
      //   setTimeForDefaultValueAMPM(event.target.textContent)
      // setAMPMLocal(event.target.textContent)
      dispatch(setAMPM(event.target.textContent))
    }
    // setAMPM(event.target.textContent)

    // setTimeForDefaultValueAMPM(event.target.textContent)
    console.log(event.target.textContent)
  }

  const [hourly, setHourly] = useState(false)
  // const [bookingType, setBookingType] = useState(1)
  let firstAirline = fromLocation?.rideCheckPoint?.match(/(^|\W)Airport($|\W)/)

  const [roundTripSwitch, setRoundTripSwitch] = useState(false)

  // const [date]

  const dispatch = useDispatch()

  useEffect(() => {
    fetchAirlines()
  }, [])

  useEffect(() => {
    // if (firstAirline) {
    //   setIsAirline(true)
    //   // setBookingType(3)
    //   dispatch(setBookingType(3))
    //   // fetchAirlines()
    //   // setDisableHourly(true)
    // } else {
    //   setIsAirline(false)
    //   //   setDisableHourly(false)
    // }
  }, [firstAirline])
  useEffect(() => {
    if (hourly) {
      if (firstAirline) {
        dispatch(setBookingType(3))
      } else {
        dispatch(setBookingType(2))
      }

      // setDisableHourly(true)
    } else {
      if (firstAirline) {
        dispatch(setBookingType(3))
      } else {
        dispatch(setBookingType(1))
      }
    }
  })

  const [meetAndGreetLuggageAssistSwitch, setMeetAndGreetLuggageAssistSwitch] =
    useState(false)

  const onDecrease = () => {
    if (formData.passengersQuantity === 0) {
      return
    }

    dispatch(setNumberOfPassenger(formData.passengersQuantity - 1))
  }
  const onIncrease = (e) => {
    if (formData.passengersQuantity === 14) {
      return
    }

    dispatch(setNumberOfPassenger(formData.passengersQuantity + 1))
  }

  // const [bookingType, setBookingType] = useState(1)
  useEffect(() => {
    fetchAirlines()
  }, [])

  useEffect(() => {
    if (firstAirline) {
      setIsAirline(true)
      setBookingType(3)
      // fetchAirlines()
      // setDisableHourly(true)
    } else {
      setIsAirline(false)
      //   setDisableHourly(false)
    }
  }, [firstAirline])
  useEffect(() => {
    // if (hourly) {
    //   if (firstAirline) {
    //     setBookingType(3)
    //   } else {
    //     setBookingType(2)
    //   }
    //   // setDisableHourly(true)
    // } else {
    //   if (firstAirline) {
    //     setBookingType(3)
    //   } else {
    //     setBookingType(1)
    //   }
    // }
  })

  console.log(formData.orderAddressDetails)

  const cars = [
    {
      img: "sedan-min.png",
      type: "sedan",
      price: "0",
      capacity: "6",
      luggage: "2",
      id: "1",
    },
    {
      img: "suv-min.png",
      type: "suv",
      price: "0",
      capacity: "6",
      luggage: "2",
      id: "2",
    },
    {
      img: "mini-bus-min.png",
      type: "mini-bus",
      price: "",
      capacity: "6",
      luggage: "2",
      id: "3",
    },
    {
      img: "limousine-min.png",
      type: "limousine",
      price: "",
      capacity: "6",
      luggage: "2",
      id: "4",
    },
  ]
  useEffect(() => {
    // var result = /[^/]*$/.exec()[0];
    // console.log(result)
    // getFleet({
    //   captcha: formData.captcha,
    //   hours: formData.hours,
    //   isGateMeeting: formData.isGateMeeting,
    //   airlines: formData.airlines,
    //   orderAddressDetails: formData.orderAddressDetails,
    //   page: formData.page,
    //   typeId: 1,
    //   bookingType: formData.bookingType,
    //   passengersQuantity: formData.passengersQuantity,
    //   isAirportPickupIncluded: formData.isAirportPickupIncluded,
    //   boosterSeatCount: formData.boosterSeatCount,
    //   safetySeatCount: formData.safetySeatCount,
    //   luggageCount: formData.luggageCount,
    // })
    // console.log(formData.captcha)
    // console.log(result)
  }, [cars.cars])

  const [selectedCar, setSelectedCar] = useState(0)
  // console.log()

  const [showRecaptcha, setShowRecaptcha] = useState(false)
  function onChangeRecaptcha(value) {
    // console.log('Captcha value:', value)
    // window.localStorage.setItem("captcha", value)
    dispatch(setCaptcha(value))
  }
  const carsFromStore = useSelector((state) => state.fleet)

  const [getFleet, result] = useGetFleetMutation()

  useEffect(() => {
    // var result = /[^/]*$/.exec()[0]

    // console.log(result)
    formData.orderAddressDetails[1].placeId &&
      !carsFromStore.cars &&
      getFleet({
        captcha: formData.captcha,
        hours: formData.hours,
        isGateMeeting: formData.isGateMeeting,
        airlines: formData.airlines,
        orderAddressDetails: formData.orderAddressDetails,
        page: formData.page,
        typeId: 1,
        bookingType: formData.bookingType,
        passengersQuantity: formData.passengersQuantity,
        isAirportPickupIncluded: formData.isAirportPickupIncluded,
        boosterSeatCount: formData.boosterSeatCount,
        safetySeatCount: formData.safetySeatCount,
        luggageCount: formData.luggageCount,
      })
    // console.log(formData.captcha)
    // console.log(result)
  }, [formData.orderAddressDetails[1].placeId])

  useEffect(() => {
    !carsFromStore.cars && dispatch(setCars(result.data))
    // console.log(result)
  }, [result])

  const isMobile = useMediaQuery("(max-width: 900px)")

  return (
    <div className={style.inputsAndFleetBlockContainer}>
      <div
        className={style.inputsBlockWithPaddingsToMakeScrollbarMoreVisible}
        style={{
          border:
            !isMobile &&
            formData.captcha &&
            formData.orderAddressDetails[0].rideCheckPoint &&
            "2px solid #2096eb",
          background:
            formData.captcha && formData.orderAddressDetails[0].rideCheckPoint
              ? "white"
              : "transparent",
        }}
      >
        <div
          className={!isMobile ? style.inputsBlock : style.inputsBlockMobile}
        >
          <PlacesAutocomplete
            value={formData.orderAddressDetails[0].rideCheckPoint}
            onChange={(address) => {
              setFromAddress(address)
              // dispatch(setOrderAddressDetails(address))
              dispatch(setFromRideCheckpoint(address))
              console.log(address)
            }}
            onSelect={(address, index) => {
              handleSelectFromLocation(address, index)
            }}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => {
              console.log(suggestions)
              return (
                <>
                  <div
                    className={
                      !isMobile
                        ? style.inputsBackgroundWithOpacity
                        : style.inputsBackgroundWithOpacityMobile
                    }
                    style={{
                      width:
                        !isMobile &&
                        !formData.captcha &&
                        !formData.orderAddressDetails[0].rideCheckPoint &&
                        "700px",
                      position: "relative",
                    }}
                    onClick={() => {
                      setShowRecaptcha(true)
                    }}
                  >
                    {!isMobile ? (
                      <StartLocationIcon />
                    ) : (
                      <StartLocationIconMobile />
                    )}
                    <input
                      {...getInputProps()}
                      placeholder="Enter a Pickup Location"
                      className={style.pickUpLocationInput}
                      style={{
                        border: redBorderErrorForFromAddress
                          ? "1px solid red"
                          : "1px solid transparent",

                        border:
                          !isMobile &&
                          !formData.captcha &&
                          !formData.orderAddressDetails[0].rideCheckPoint &&
                          "2px solid #2096eb",
                        // background:
                        //   formData.captcha && formData.orderAddressDetails[0].rideCheckPoint
                        //     ? "white"
                        //     : "transparent",
                      }}
                    />
                    <div
                      // className={styles.dropDown}
                      className={
                        style.dropDownForGoogleSearchSuggestionContainer
                      }
                    >
                      {loading && (
                        <div
                        // className={styles.dropDownLoadingText}
                        >
                          Loading...
                        </div>
                      )}
                      {suggestions.map((suggestion, id) => {
                        return (
                          <div
                            key={`${suggestion}`}
                            className={style.suggestionsResultsContainer}
                            // key={`${id}${suggestion.description}`}
                            {...getSuggestionItemProps(suggestion)}
                            // className={styles.itemInsideDropDown}
                          >
                            {suggestion.description}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              )
            }}
          </PlacesAutocomplete>
          {showRecaptcha && !formData.captcha && (
            <div style={{ marginBottom: "21px" }}>
              <ReCAPTCHA
                sitekey="6LeuP3weAAAAAHoe3aaP27xmYorD1s1vXK7XdlPk"
                onChange={onChangeRecaptcha}
              />
            </div>
          )}
          {formData.captcha && formData.orderAddressDetails[0].rideCheckPoint && (
            <>
              {toLocations.map((toDestination, index) => {
                return (
                  <PlacesAutocomplete
                    key={`${toDestination}`}
                    value={toDestination.rideCheckPoint}
                    onChange={(address) => {
                      setToAddressHandler(address, index)
                      dispatch(setToRideCheckpoint({ address, index }))
                      // if (index == 0) {
                      //   dispatch(setToRideCheckpoint(address, index))
                      // } else {
                      //   dispatch(
                      //     setToAdditionalRideCheckpoints({
                      //       address,
                      //       index,
                      //     })
                      //   )
                      // }
                    }}
                    onSelect={(address) => {
                      handleSelectToDestination(address, index)
                    }}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => {
                      console.log(suggestions)
                      return (
                        <>
                          <div
                            className={
                              !isMobile
                                ? style.inputsBackgroundWithOpacityToDestination
                                : style.inputsBackgroundWithOpacityToDestinationMobile
                            }
                          >
                            {!isMobile ? (
                              <EndLocationIcon />
                            ) : (
                              <EndLocationIconMobile />
                            )}
                            <input
                              {...getInputProps()}
                              placeholder={`To ${index + 1}`}
                              className={style.toLocationInput}
                              style={{
                                border: redBorderErrorForToAddress
                                  ? "1px solid red"
                                  : "1px solid transparent",
                              }}
                            />
                            {index === toLocations.length - 1 && (
                              <div
                                className={style.plusIcon}
                                onClick={() => {
                                  dispatch(
                                    addToLocation({
                                      rideCheckPoint: "",
                                      latitude: 0,
                                      longitude: 0,
                                      placeType: 0,
                                      placeId: "",
                                    })
                                  )
                                  // console.log(formData.orderAddressDetails)
                                }}
                              >
                                <PlusIcon />
                              </div>
                            )}
                            {console.log(formData.orderAddressDetails)}
                            {index < toLocations.length - 1 && (
                              <div
                                onClick={() => {
                                  dispatch(removeToLocation(index))
                                }}
                                className={style.minusIcon}
                              >
                                <MinusIcon />
                              </div>
                            )}
                            <div
                              // className={styles.dropDown}
                              className={
                                style.dropDownForGoogleSearchSuggestionContainer
                              }
                            >
                              {loading && (
                                <div
                                // className={styles.dropDownLoadingText}
                                >
                                  Loading...
                                </div>
                              )}
                              {suggestions.map((suggestion, id) => {
                                return (
                                  <div
                                    key={`${suggestion}`}
                                    className={
                                      style.suggestionsResultsContainer
                                    }
                                    // key={`${id}${suggestion.description}`}
                                    {...getSuggestionItemProps(suggestion)}
                                    // className={styles.itemInsideDropDown}
                                  >
                                    {suggestion.description}
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </>
                      )
                    }}
                  </PlacesAutocomplete>
                )
              })}
              {/* {formData.bookingType === 3 && (
            <>
              <Autocomplete
                disablePortal
                onChange={(event, newValue) => {
                  newValue ? extractAirlineId(newValue) : setAirlineId(null)
                }}
                //   style={{ width: "100%" }}
                options={airlines.map((airline) => airline.name)}
                renderInput={(params) => (
                  <div
                    className={style.inputsBackgroundWithOpacityAirlines}
                    ref={params.InputProps.ref}
                  >
                    <input
                      {...params.inputProps}
                      placeholder="Airlines"
                      className={style.airlinesInput}
                    />
                  </div>
                )}
              />
              <div className={style.inputsBackgroundWithOpacityFlightNumber}>
                <input
                  placeholder="Flight number"
                  className={style.flightNumberInput}
                  type="number"
                />
              </div>
            </>
          )} */}
              <div
                className={
                  !isMobile
                    ? style.inputsBackgroundWithOpacityPickUpDateAndTime
                    : style.inputsBackgroundWithOpacityPickUpDateAndTimeMobile
                }
                style={{ position: "relative" }}
              >
                {!isMobile ? <DateIcon /> : <DateIconMobile />}
                <input
                  onClick={() => setShow(true)}
                  placeholder="Pick Up Date"
                  className={style.pickUpDateInput}
                  value={formData.dateValue}
                  style={{
                    borderTop: redBorderErrorForDate
                      ? "1px solid red"
                      : "1px solid transparent",
                    borderLeft: redBorderErrorForDate
                      ? "1px solid red"
                      : "1px solid transparent",
                    borderBottom: redBorderErrorForDate
                      ? "1px solid red"
                      : "1px solid transparent",
                  }}
                  // type="number"
                />
                <Modal onClose={() => setShow(false)} show={show}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div>
                      <CalendarPicker
                        date={date}
                        onChange={(newDate) => {
                          console.log(newDate)
                          if (newDate instanceof Date) {
                            setShow(false)
                          }
                          // setDateForDefaultValue(
                          //   newDate.toLocaleDateString("en-US")
                          // )
                          dispatch(
                            setOrderDate(newDate?.toLocaleDateString("en-US"))
                          )
                          setDate(newDate)
                        }}
                      />
                    </div>
                  </LocalizationProvider>
                </Modal>
                <div className={style.timePickerContainer}>
                  <input
                    name="orderStartTime"
                    placeholder="hh:mm"
                    autoComplete="off"
                    className={style.timePickerInput}
                    setTime={setTime}
                    ref={inputCard}
                    value={formData.timeValue}
                    onClick={(event) => {
                      const { value } = event.target
                      const position = value.length
                      event.target.setSelectionRange(position, position)
                    }}
                    onChange={handleChangeTime}
                    style={{
                      borderTop:
                        redBorderErrorForTime || redBorderErrorForAMPM
                          ? "1px solid red"
                          : "1px solid transparent",
                      borderRight:
                        redBorderErrorForTime || redBorderErrorForAMPM
                          ? "1px solid red"
                          : "1px solid transparent",
                      borderBottom:
                        redBorderErrorForTime || redBorderErrorForAMPM
                          ? "1px solid red"
                          : "1px solid transparent",
                    }}

                    // style={{
                    //   color: inputsFontColor,
                    //   border:
                    //     redBorderOnSubmitForTime ||
                    //     redBorderOnSubmitForTime2 ||
                    //     redBorderOnSubmitForTime3 ||
                    //     redBorderOnSubmitForTime4 ||
                    //     redBorderOnSubmitForTime5 ||
                    //     redBorderOnSubmitForTime6
                    //       ? `1px solid red`
                    //       : `1px solid ${borderColorForInnerElements}`,
                    //   background: inputsBackground,
                    //   textAlign: "right",
                    //   paddingRight: "78px",
                    //   borderRadius: borderRadiusesForInnerElements,
                    // }}
                    // inputsFontColor={inputsFontColor}
                    // value={!resetInputs ? formData.timeForDefaultValue : null}
                  />
                  <div className={style.toggleButtonsContainer}>
                    <div
                      className={style.toggleButtonAM}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleChangeAMPM(e)
                      }}
                      style={{
                        color:
                          formData.timeForDefaultValueAMPMalignment.ampm == "AM"
                            ? `white`
                            : "black",
                        background:
                          formData.timeForDefaultValueAMPMalignment.ampm == "AM"
                            ? `black`
                            : "white",
                        opacity:
                          formData.timeForDefaultValueAMPMalignment.ampm == "AM"
                            ? "1"
                            : "0.5",
                        borderRadius: `3px`,
                      }}
                    >
                      AM
                    </div>
                    <div
                      className={style.toggleButtonPM}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleChangeAMPM(e)
                      }}
                      style={{
                        color:
                          formData.timeForDefaultValueAMPMalignment.ampm == "PM"
                            ? `white`
                            : "black",
                        background:
                          formData.timeForDefaultValueAMPMalignment.ampm == "PM"
                            ? `black`
                            : "white",
                        opacity:
                          formData.timeForDefaultValueAMPMalignment.ampm == "PM"
                            ? "1"
                            : "0.5",
                        borderRadius: `3px`,
                      }}
                    >
                      PM
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={
                  !isMobile
                    ? style.inputsBackgroundWithOpacityRoundTrip
                    : style.inputsBackgroundWithOpacityRoundTripMobile
                }
                style={{ position: "relative" }}
              >
                {!isMobile ? <RoundTripIcon /> : <RoundTripIconMobile />}
                <div className={style.roundTripInput}>
                  <p className={style.roundTripPlaceholder}>Round Trip</p>
                  <div className={style.switchWrapper}>
                    <input
                      type="checkbox"
                      name={`roundTrip`}
                      className={style.switchSelf}
                      id={`roundTrip`}
                      defaultChecked={roundTripSwitch}
                      onClick={() => {
                        setRoundTripSwitch(!roundTripSwitch)
                      }}
                    />
                    <label htmlFor={`roundTrip`}></label>
                  </div>
                </div>
              </div>
              {/* <div className={style.referalCode}> */}
              {/* </div> */}
              {roundTripSwitch && (
                <>
                  <PlacesAutocomplete
                    value={formData.orderAddressDetails[0].rideCheckPoint}
                    onChange={(address) => {
                      setFromAddress(address)
                      // dispatch(setOrderAddressDetails(address))
                      dispatch(setFromRideCheckpoint(address))
                      console.log(address)
                    }}
                    onSelect={(address, index) => {
                      handleSelectFromLocation(address, index)
                    }}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => {
                      console.log(suggestions)
                      return (
                        <>
                          <div
                            className={
                              !isMobile
                                ? style.inputsBackgroundWithOpacity
                                : style.inputsBackgroundWithOpacityMobile
                            }
                          >
                            {!isMobile ? (
                              <StartLocationIcon />
                            ) : (
                              <StartLocationIconMobile />
                            )}
                            <input
                              {...getInputProps()}
                              placeholder="Enter a Pickup Location"
                              className={style.pickUpLocationInput}
                            />
                            <div
                              // className={styles.dropDown}
                              className={
                                style.dropDownForGoogleSearchSuggestionContainer
                              }
                            >
                              {loading && (
                                <div
                                // className={styles.dropDownLoadingText}
                                >
                                  Loading...
                                </div>
                              )}
                              {suggestions.map((suggestion, id) => {
                                return (
                                  <div
                                    key={`${suggestion}`}
                                    className={
                                      style.suggestionsResultsContainer
                                    }
                                    // key={`${id}${suggestion.description}`}
                                    {...getSuggestionItemProps(suggestion)}
                                    // className={styles.itemInsideDropDown}
                                  >
                                    {suggestion.description}
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </>
                      )
                    }}
                  </PlacesAutocomplete>
                  {toLocations.map((toDestination, index) => {
                    return (
                      <PlacesAutocomplete
                        key={`${toDestination}`}
                        value={toDestination.rideCheckPoint}
                        onChange={(address) => {
                          setToAddressHandler(address, index)
                          dispatch(setToRideCheckpoint(address, index))
                        }}
                        onSelect={(address) => {
                          handleSelectToDestination(address, index)
                        }}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading,
                        }) => {
                          console.log(suggestions)
                          return (
                            <>
                              <div
                                className={
                                  !isMobile
                                    ? style.inputsBackgroundWithOpacityToDestination
                                    : style.inputsBackgroundWithOpacityToDestinationMobile
                                }
                              >
                                {!isMobile ? (
                                  <EndLocationIcon />
                                ) : (
                                  <EndLocationIconMobile />
                                )}
                                <input
                                  {...getInputProps()}
                                  placeholder={`To ${index + 1}`}
                                  className={style.toLocationInput}
                                />
                                {index === toLocations.length - 1 && (
                                  <div
                                    className={style.plusIcon}
                                    onClick={() =>
                                      dispatch(
                                        addToLocation({
                                          rideCheckPoint: "",
                                          latitude: 0,
                                          longitude: 0,
                                          placeType: 0,
                                          placeId: "",
                                        })
                                      )
                                    }
                                  >
                                    <PlusIcon />
                                  </div>
                                )}
                                {console.log(formData.orderAddressDetails)}
                                {index < toLocations.length - 1 && (
                                  <div
                                    onClick={() => {
                                      dispatch(removeToLocation(index))
                                    }}
                                    className={style.minusIcon}
                                  >
                                    <MinusIcon />
                                  </div>
                                )}
                                <div
                                  // className={styles.dropDown}
                                  className={
                                    style.dropDownForGoogleSearchSuggestionContainer
                                  }
                                >
                                  {loading && (
                                    <div
                                    // className={styles.dropDownLoadingText}
                                    >
                                      Loading...
                                    </div>
                                  )}
                                  {suggestions.map((suggestion, id) => {
                                    return (
                                      <div
                                        key={`${suggestion}`}
                                        className={
                                          style.suggestionsResultsContainer
                                        }
                                        // key={`${id}${suggestion.description}`}
                                        {...getSuggestionItemProps(suggestion)}
                                        // className={styles.itemInsideDropDown}
                                      >
                                        {suggestion.description}
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            </>
                          )
                        }}
                      </PlacesAutocomplete>
                    )
                  })}
                  <div
                    className={
                      !isMobile
                        ? style.inputsBackgroundWithOpacityPickUpDateAndTime
                        : style.inputsBackgroundWithOpacityPickUpDateAndTimeMobile
                    }
                  >
                    {!isMobile ? <DateIcon /> : <DateIconMobile />}
                    <input
                      onClick={() => setShow(true)}
                      placeholder="Pick Up Date"
                      className={style.pickUpDateInput}
                      value={date?.toLocaleDateString("en-US")}
                      // type="number"
                    />
                    <Modal onClose={() => setShow(false)} show={show}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div>
                          <CalendarPicker
                            date={date}
                            onChange={(newDate) => {
                              console.log(newDate)
                              if (newDate instanceof Date) {
                                setShow(false)
                              }
                              setDate(newDate)
                            }}
                          />
                        </div>
                      </LocalizationProvider>
                    </Modal>
                    <div className={style.timePickerContainer}>
                      <input
                        name="orderStartTime"
                        placeholder="hh:mm"
                        autoComplete="off"
                        className={style.timePickerInput}
                        setTime={setTime}
                        ref={inputCard}
                        onClick={(event) => {
                          const { value } = event.target
                          const position = value.length
                          event.target.setSelectionRange(position, position)
                        }}
                        onChange={handleChangeTimeInRoundTripSecondField}
                      />
                      <div className={style.toggleButtonsContainer}>
                        <div
                          className={style.toggleButtonAM}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleChangeAMPMInRoundTripSecondField(e)
                          }}
                          style={{
                            color:
                              formData.timeForDefaultValueAMPMalignment.ampm ==
                              "AM"
                                ? `white`
                                : "black",
                            background:
                              formData.timeForDefaultValueAMPMalignment.ampm ==
                              "AM"
                                ? `black`
                                : "white",
                            opacity:
                              formData.timeForDefaultValueAMPMalignment.ampm ==
                              "AM"
                                ? "1"
                                : "0.5",
                            borderRadius: `3px`,
                          }}
                        >
                          AM
                        </div>
                        <div
                          className={style.toggleButtonPM}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleChangeAMPMInRoundTripSecondField(e)
                          }}
                          style={{
                            color:
                              formData.timeForDefaultValueAMPMalignment.ampm ==
                              "PM"
                                ? `white`
                                : "black",
                            background:
                              formData.timeForDefaultValueAMPMalignment.ampm ==
                              "PM"
                                ? `black`
                                : "white",
                            opacity:
                              formData.timeForDefaultValueAMPMalignment.ampm ==
                              "PM"
                                ? "1"
                                : "0.5",
                            borderRadius: `3px`,
                          }}
                        >
                          PM
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {formData.bookingType === 3 && (
                <>
                  <Autocomplete
                    disablePortal
                    onChange={(event, newValue) => {
                      extractAirlineId(newValue)
                    }}
                    //   style={{ width: "100%" }}
                    options={airlines.map((airline) => airline.name)}
                    renderInput={(params) => (
                      <div
                        className={
                          !isMobile
                            ? style.inputsBackgroundWithOpacityAirlines
                            : style.inputsBackgroundWithOpacityAirlinesMobile
                        }
                        style={{ position: "relative" }}
                        ref={params.InputProps.ref}
                      >
                        {!isMobile ? <PlaneIcon /> : <PlaneIconMobile />}
                        <input
                          {...params.inputProps}
                          placeholder="Airlines"
                          className={style.airlinesInput}
                        />
                      </div>
                    )}
                  />
                  <div
                    className={
                      !isMobile
                        ? style.inputsBackgroundWithOpacityFlightNumber
                        : style.inputsBackgroundWithOpacityFlightNumberMobile
                    }
                    style={{ position: "relative" }}
                  >
                    {!isMobile ? <Ticket /> : <TicketMobile />}
                    <input
                      placeholder="Flight number"
                      className={style.flightNumberInput}
                      value={formData.flightNumber}
                      onChange={(event) => {
                        dispatch(setFlightNumber(event.target.value))
                      }}
                      type="number"
                    />
                  </div>
                </>
              )}
              <div
                className={
                  !isMobile
                    ? style.inputsBackgroundWithOpacityNumberOfPassengers
                    : style.inputsBackgroundWithOpacityNumberOfPassengersMobile
                }
                style={{ position: "relative" }}
              >
                {!isMobile ? (
                  <NumberOfPassengersIcon />
                ) : (
                  <NumberOfPassengersIconMobile />
                )}
                <div
                  placeholder="Number of Passengers"
                  className={style.numberOfPassengersInput}
                  type="number"
                  style={{
                    border: redBorderErrorForNumberOfPassengers
                      ? "1px solid red"
                      : "1px solid transparent",
                  }}
                >
                  <p>Number of Passengers</p>
                  <div className={style.counterContainer}>
                    <div
                      className={style.minusButton}
                      onClick={() => {
                        onDecrease()
                      }}
                    >
                      <MinusIcon />
                    </div>
                    <input
                      className={style.counterInput}
                      value={formData.passengersQuantity}
                    />
                    <div
                      className={style.plusButton}
                      onClick={() => {
                        onIncrease()
                      }}
                    >
                      <PlusIcon />
                    </div>
                  </div>
                </div>
              </div>
              {formData.bookingType == 3 && (
                <>
                  <div
                    className={
                      !isMobile
                        ? style.inputsBackgroundWithOpacityMeetAndGreetLuggageAssist
                        : style.inputsBackgroundWithOpacityMeetAndGreetLuggageAssistMobile
                    }
                    style={{ position: "relative" }}
                  >
                    {!isMobile ? (
                      <MeetAndGreetIcon />
                    ) : (
                      <MeetAndGreetIconMobile />
                    )}
                    <div className={style.MeetAndGreetLuggageAssistSwitchInput}>
                      <p className={style.meetAndGreetLuggageAssistPlaceholder}>
                        Meet & Greet/Luggage Assist
                      </p>
                      <div className={style.switchWrapper}>
                        <input
                          type="checkbox"
                          name={`switchMeetAndGreetLuggageAssist`}
                          className={style.switchSelf}
                          id={`switchMeetAndGreetLuggageAssist`}
                          defaultChecked={meetAndGreetLuggageAssistSwitch}
                          onClick={() => {
                            dispatch(setIsGateMeeting(!formData.isGateMeeting))
                            setMeetAndGreetLuggageAssistSwitch(
                              !meetAndGreetLuggageAssistSwitch
                            )
                          }}
                        />
                        <label
                          htmlFor={`switchMeetAndGreetLuggageAssist`}
                        ></label>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      !isMobile
                        ? style.inputsBackgroundWithOpacityLuggageCount
                        : style.inputsBackgroundWithOpacityLuggageCountMobile
                    }
                    style={{ position: "relative" }}
                  >
                    {!isMobile ? <LuggageIcon /> : <LuggageIconMobile />}
                    <div className={style.luggageCountInput}>
                      <p className={style.luggageCountPlaceholder}>
                        Luggage Count
                      </p>
                      <div className={style.counterContainer}>
                        <div
                          className={style.minusButton}
                          onClick={() => {
                            if (formData.luggageCount === 0) {
                              return
                            }

                            // setLuggageCount((luggageCount) => luggageCount - 1)
                            dispatch(setLuggageCount(formData.luggageCount - 1))
                          }}
                        >
                          <MinusIcon />
                        </div>
                        <input
                          className={style.counterInput}
                          value={formData.luggageCount}
                        />
                        <div
                          className={style.plusButton}
                          onClick={() => {
                            if (formData.luggageCount === 14) {
                              return
                            }

                            // setLuggageCount((luggageCount) => luggageCount + 1)
                            dispatch(setLuggageCount(formData.luggageCount + 1))
                          }}
                        >
                          <PlusIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div
                className={
                  !isMobile
                    ? style.inputsBackgroundWithOpacitySafetySeat
                    : style.inputsBackgroundWithOpacitySafetySeatMobile
                }
                style={{ position: "relative" }}
              >
                {!isMobile ? <SafetySeatIcon /> : <SafetySeatIconMobile />}
                <div className={style.safetySeatSwitchInput}>
                  <p className={style.safetySeatPlaceholder}>Safety Seat</p>
                  <div className={style.switchWrapper}>
                    <input
                      type="checkbox"
                      name={`switchSafetySeat`}
                      className={style.switchSelf}
                      id={`switchSafetySeat`}
                      defaultChecked={formData.showCarsWithSafetySeat}
                      onClick={() => {
                        dispatch(
                          setSafetySeatSwitch(!formData.showCarsWithSafetySeat)
                        )
                      }}
                    />
                    <label htmlFor={`switchSafetySeat`}></label>
                  </div>
                </div>
              </div>
              {formData.showCarsWithSafetySeat && (
                <>
                  <div
                    className={
                      !isMobile
                        ? style.inputsBackgroundWithOpacityYouthBoosterSeat
                        : style.inputsBackgroundWithOpacityYouthBoosterSeatMobile
                    }
                    style={{ position: "relative" }}
                  >
                    {!isMobile ? <SafetySeatIcon /> : <SafetySeatIconMobile />}
                    <div className={style.youthBoosterSeatCountInput}>
                      <p className={style.youthBoosterSeatPlaceholder}>
                        Youth Booster Seat
                      </p>
                      <div className={style.counterContainer}>
                        <div
                          className={style.minusButton}
                          onClick={() => {
                            if (formData.boosterSeatCount === 0) {
                              return
                            }
                            dispatch(
                              setBoosterSeatCount(formData.boosterSeatCount - 1)
                            )
                            // setYouthBoosterSeat((youthBoosterSeat) => youthBoosterSeat - 1)
                          }}
                        >
                          <MinusIcon />
                        </div>
                        <input
                          className={style.counterInput}
                          value={formData.boosterSeatCount}
                        />
                        <div
                          className={style.plusButton}
                          onClick={() => {
                            if (formData.boosterSeatCount === 14) {
                              return
                            }
                            dispatch(
                              setBoosterSeatCount(formData.boosterSeatCount + 1)
                            )
                            // setYouthBoosterSeat((youthBoosterSeat) => youthBoosterSeat + 1)
                          }}
                        >
                          <PlusIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      !isMobile
                        ? style.inputsBackgroundWithOpacityInfantChildSafetySeat
                        : style.inputsBackgroundWithOpacityInfantChildSafetySeatMobile
                    }
                    style={{ position: "relative" }}
                  >
                    {!isMobile ? <SafetySeatIcon /> : <SafetySeatIconMobile />}
                    <div className={style.infantChildSafetySeatCountInput}>
                      <p className={style.infantChildSafetySeatPlaceholder}>
                        Infant & Child Safety Seat
                      </p>
                      <div className={style.counterContainer}>
                        <div
                          className={style.minusButton}
                          onClick={() => {
                            if (formData.safetySeatCount === 0) {
                              return
                            }
                            dispatch(
                              setSafetySeatCount(formData.safetySeatCount - 1)
                            )
                            // setInfantChildSafetySeat(
                            //   (infantChildSafetySeat) => infantChildSafetySeat - 1
                            // )
                          }}
                        >
                          <MinusIcon />
                        </div>
                        <input
                          className={style.counterInput}
                          value={formData.safetySeatCount}
                        />
                        <div
                          className={style.plusButton}
                          onClick={() => {
                            if (formData.safetySeatCount === 14) {
                              return
                            }

                            dispatch(
                              setSafetySeatCount(formData.safetySeatCount + 1)
                            )

                            // setInfantChildSafetySeat(
                            //   (infantChildSafetySeat) => infantChildSafetySeat + 1
                            // )
                          }}
                        >
                          <PlusIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div
                className={
                  !isMobile
                    ? style.inputsBackgroundWithOpacityHourly
                    : style.inputsBackgroundWithOpacityHourlyMobile
                }
                style={{
                  position: "relative",
                }}
              >
                {!isMobile ? <HourlyIcon /> : <HourlyIconMobile />}
                <div className={style.hourlySwitchInput}>
                  <p className={style.hourlyPlaceholder}>Hourly</p>
                  <div className={style.switchWrapper}>
                    <input
                      type="checkbox"
                      name={`switchHourly`}
                      className={style.switchSelf}
                      id={`switchHourly`}
                      defaultChecked={formData.hourly}
                      onClick={() => {
                        // setHourlySwitch(!hourlySwitch)
                        dispatch(setHourlySwitch(!formData.hourly))
                      }}
                    />
                    <label htmlFor={`switchHourly`}></label>
                  </div>
                </div>
              </div>
              {formData.hourly && (
                <div
                  className={
                    !isMobile
                      ? style.inputsBackgroundWithOpacityHoursCount
                      : style.inputsBackgroundWithOpacityHoursCountMobile
                  }
                  style={{ position: "relative" }}
                >
                  {!isMobile ? <HourlyIcon /> : <HourlyIconMobile />}
                  <div className={style.hoursCountInput}>
                    <p className={style.hoursPlaceholder}>Hours</p>
                    <div className={style.counterContainer}>
                      <div
                        className={style.minusButton}
                        onClick={() => {
                          if (formData.hours === 0) {
                            return
                          }
                          dispatch(setHoursCount(formData.hours - 1))
                          // setHours((hours) => hours - 1)
                        }}
                      >
                        <MinusIcon />
                      </div>
                      <input
                        className={style.counterInput}
                        value={formData.hours}
                      />
                      <div
                        className={style.plusButton}
                        onClick={() => {
                          if (formData.hours === 14) {
                            return
                          }
                          dispatch(setHoursCount(formData.hours + 1))
                          // setHours((hours) => hours + 1)
                        }}
                      >
                        <PlusIcon />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div
                className={
                  !isMobile
                    ? style.inputsBackgroundWithOpacityReferalCode
                    : style.inputsBackgroundWithOpacityReferalCodeMobile
                }
                style={{
                  position: "relative",
                  // marginBottom: roundTripSwitch ? "" : "21px",
                }}
              >
                {!isMobile ? <ReferalCodeIcon /> : <ReferalCodeIconMobile />}
                {/* <EndLocationIcon /> */}
                <input
                  // {...getInputProps()}
                  placeholder="Referal Code"
                  className={style.referalCodeInput}
                  // style={{
                  //   border: redBorderErrorForToAddress
                  //     ? "1px solid red"
                  //     : "1px solid transparent",
                  // }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {formData.captcha && formData.orderAddressDetails[0].rideCheckPoint && (
        // <div className={style.fleetBlockWithPaddingsToMakeScrollbarMoreVisible}>
        <>
          {!isMobile && (
            <div
              className={style.fleetBlock}
              style={{
                borderTop:
                  formData.captcha &&
                  formData.orderAddressDetails[0].rideCheckPoint &&
                  "2px solid #2096eb",
                borderRight:
                  formData.captcha &&
                  formData.orderAddressDetails[0].rideCheckPoint &&
                  "2px solid #2096eb",
                borderBottom:
                  formData.captcha &&
                  formData.orderAddressDetails[0].rideCheckPoint &&
                  "2px solid #2096eb",
              }}
            >
              <div className={style.wrapperWithBlackBorder}>
                {/* <button
            onClick={() => {
              console.log(carsFromStore.cars)
            }}
          >
            Click meeee
          </button> */}

                <div className={style.wrapper}>
                  {/* <button
          onClick={() => {
            console.log(cars.cars)
            var str = cars.cars[0]?.imageUrls[0]?.path
            var n = str?.lastIndexOf("/")
            var result = str?.substring(n + 1)

            console.log(result)
          }}
        >
          Click me
        </button> */}
                  {cars.map((car, index) => {
                    // var str = cars?.cars[index]?.imageUrls[0]?.path
                    // var n = str?.lastIndexOf("/")
                    // var result = str?.substring(n + 1)
                    // console.log(result)
                    return (
                      // <div>{index}</div>
                      // <div className={style.carContainer}>
                      //   <div className={style.typeAndImageContainer}>
                      //     <p className={style.typeOfVehicle}>{car.typeOfVehicle}</p>
                      //     <div className={style.carImage}>
                      //       <Image
                      //         loader={imageLoader}
                      //         src={car.image}
                      //         alt={car.typeOfVehicle}
                      //         layout="fill"
                      //       ></Image>
                      //     </div>
                      //   </div>
                      //   <div className={style.detailsContainer}>
                      //     <p className={style.carPrice}>{car.price} USD</p>
                      //     <p className={style.carCapacity}>CAPACITY-{car.capacity}</p>
                      //     <p className={style.carLuggage}>LUGGAGE-{car.luggage}</p>
                      //   </div>
                      // </div>
                      <CarInformationComponent
                        key={car.type}
                        imageUrl={car.img}
                        altTypeOfVehicle={car.type}
                        carPrice={
                          carsFromStore?.cars
                            ? carsFromStore?.cars[index]?.price
                            : 0
                        }
                        carCapacity={car.capacity}
                        carLuggage={car?.luggage}
                        carId={
                          carsFromStore?.cars && carsFromStore?.cars[index]?.id
                        }
                        selectedCar={selectedCar}
                        setSelectedCar={setSelectedCar}
                      />
                    )
                  })}
                </div>
                {/* <button onClick={() => console.log(cars)}>asdfasdfasdfasd</button> */}
              </div>
            </div>
          )}
        </>
        // </div>
      )}
    </div>
  )
}
