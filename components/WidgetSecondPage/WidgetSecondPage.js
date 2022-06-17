import style from "./WidgetSecondPage.module.scss"
import { useState, useRef, useEffect } from "react"
import {
  MinusIcon,
  NumberOfPassengersIcon,
  PlusIcon,
  MeetAndGreetIcon,
  LuggageIcon,
  PlaneIcon,
  Ticket,
} from "../../public/Assets"
import { useDispatch, useSelector } from "react-redux"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete"
import Autocomplete from "@mui/material/Autocomplete"
import { getAirlines } from "../../pages/api/getAirlines"
import {
  setAirlinesId,
  setFlightNumber,
  setLuggageCount,
  setNumberOfPassenger,
} from "../../reduxToolkit/slices/formData"

export const WidgetSecondPage = ({ redBorderErrorForNumberOfPassengers }) => {
  // const [luggageCount, setLuggageCount] = useState(0)
  const dispatch = useDispatch()
  const [meetAndGreetLuggageAssistSwitch, setMeetAndGreetLuggageAssistSwitch] =
    useState(false)

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

    dispatch(setAirlinesId(res.id))
    // setAirlineNAme(name)
    // console.log(res)
  }

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

  const formData = useSelector((state) => state.formData)

  const [toDestinations, setToDestinations] = useState([
    {
      rideCheckPoint: "",
      latitude: 0,
      longitude: 0,
      placeType: 0,
      placeId: "",
    },
  ])
  const [isAirline, setIsAirline] = useState(false)
  // const [bookingType, setBookingType] = useState(1)
  let firstAirline =
    toDestinations[0]?.rideCheckPoint.match(/(^|\W)Airport($|\W)/)

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

  return (
    <>
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
                className={style.inputsBackgroundWithOpacityAirlines}
                style={{ position: "relative" }}
                ref={params.InputProps.ref}
              >
                <PlaneIcon />
                <input
                  {...params.inputProps}
                  placeholder="Airlines"
                  className={style.airlinesInput}
                />
              </div>
            )}
          />
          <div
            className={style.inputsBackgroundWithOpacityFlightNumber}
            style={{ position: "relative" }}
          >
            <Ticket />
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
        className={style.inputsBackgroundWithOpacityNumberOfPassengers}
        style={{ position: "relative" }}
      >
        <NumberOfPassengersIcon />
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

      <div
        className={style.inputsBackgroundWithOpacityMeetAndGreetLuggageAssist}
        style={{ position: "relative" }}
      >
        <MeetAndGreetIcon />
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
                setMeetAndGreetLuggageAssistSwitch(
                  !meetAndGreetLuggageAssistSwitch
                )
              }}
            />
            <label for={`switchMeetAndGreetLuggageAssist`}></label>
          </div>
        </div>
      </div>

      <div
        className={style.inputsBackgroundWithOpacityLuggageCount}
        style={{ position: "relative" }}
      >
        <LuggageIcon />
        <div className={style.luggageCountInput}>
          <p className={style.luggageCountPlaceholder}>Luggage Count</p>
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
  )
}
