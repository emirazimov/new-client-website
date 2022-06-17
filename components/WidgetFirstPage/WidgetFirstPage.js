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
} from "../../reduxToolkit/slices/formData"

export const WidgetFirstPage = ({
  redBorderErrorForFromAddress,
  redBorderErrorForToAddress,
  redBorderErrorForDate,
  redBorderErrorForTime,
  redBorderErrorForAMPM,
}) => {
  const [showHoursInput, setshowHoursInput] = useState(false)
  const [showLuggageCountInput, setShowLuggageCountInput] = useState(false)
  const [showGreetTheSamePerson, setShowGreetTheSamePerson] = useState(false)
  const [showYouthBoosterAndSafetySeat, setShowYouthBoosterAndSafetySeat] =
    useState(false)
  const [editAmountMode, setEditAmountMode] = useState(false)

  const [selectedClientItem, setSelectedClientItem] = useState(null)
  const [selectedVehicleItem, setSelectedVehicleItem] = useState(null)
  const [selectedDriverItem, setSelectedDriverItem] = useState(null)

  const [showAddClientBlock, setShowAddClientBlock] = useState(false)

  const [showUpDatePicker, setShowUpDatePicker] = useState(false)

  const [typeOfList, setTypeOfList] = useState("")
  const [showTypeOfVehicleDropdown, setShowTypeOfVehicleDropdown] =
    useState(false)

  const [inputValueTypeOfVehicle, setInputValueTypeOfVehicle] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const [dateToDatePicker, setDateToDatePicker] = useState(new Date())
  const [valueForInputAppearence, setValueForInputAppearence] = useState(null)

  const amountInputRef = useRef(null)

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

  const [
    showSuccessfullyCreatedReservation,
    setShowSuccessfullyCreatedReservation,
  ] = useState(false)

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

  console.log(formData.orderAddressDetails)

  // console.log()

  return (
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
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          console.log(suggestions)
          return (
            <>
              <div
                className={style.inputsBackgroundWithOpacity}
                style={{ position: "relative" }}
              >
                <StartLocationIcon />
                <input
                  {...getInputProps()}
                  placeholder="Enter a Pickup Location"
                  className={style.pickUpLocationInput}
                  style={{
                    border: redBorderErrorForFromAddress
                      ? "1px solid red"
                      : "1px solid transparent",
                  }}
                />
                <div
                  // className={styles.dropDown}
                  className={style.dropDownForGoogleSearchSuggestionContainer}
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
      {formData.orderAddressDetails && (
        <>
          {toLocations.map((toDestination, index) => {
            return (
              <PlacesAutocomplete
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
                          style.inputsBackgroundWithOpacityToDestination
                        }
                      >
                        <EndLocationIcon />
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
            className={style.inputsBackgroundWithOpacityPickUpDateAndTime}
            style={{ position: "relative" }}
          >
            <DateIcon />
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
            className={style.inputsBackgroundWithOpacityRoundTrip}
            style={{ marginBottom: roundTripSwitch ? "" : "21px" }}
          >
            <div className={style.roundTripInput}>
              <p className={style.roundTripPlaceholder}>Round Trip</p>
              <div className={style.switchWrapper}>
                <input
                  type="checkbox"
                  name={`switchMeetAndGreetLuggageAssist`}
                  className={style.switchSelf}
                  id={`switchMeetAndGreetLuggageAssist`}
                  defaultChecked={roundTripSwitch}
                  onClick={() => {
                    setRoundTripSwitch(!roundTripSwitch)
                  }}
                />
                <label for={`switchMeetAndGreetLuggageAssist`}></label>
              </div>
            </div>
          </div>

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
                      <div className={style.inputsBackgroundWithOpacity}>
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
              {toLocations.map((toDestination, index) => {
                return (
                  <PlacesAutocomplete
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
                              style.inputsBackgroundWithOpacityToDestination
                            }
                          >
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
                className={style.inputsBackgroundWithOpacityPickUpDateAndTime}
              >
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
                          formData.timeForDefaultValueAMPMalignment.ampm0 ==
                          "AM"
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
                        handleChangeAMPMInRoundTripSecondField(e)
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
            </>
          )}
        </>
      )}
    </>
  )
}
