import style from "./WidgetSecondPage.module.scss"
import { useState, useRef, useEffect } from "react"
import { MinusIcon, PlusIcon } from "../../public/Assets"

export const WidgetSecondPage = () => {
  const [luggageCount, setLuggageCount] = useState(0)

  const [youthBoosterSeat, setYouthBoosterSeat] = useState(0)
  const [infantChildSafetySeat, setInfantChildSafetySeat] = useState(0)
  const [hours, setHours] = useState(0)

  const [meetAndGreetLuggageAssistSwitch, setMeetAndGreetLuggageAssistSwitch] =
    useState(false)
  const [safetySeatSwitch, setSafetySeatSwitch] = useState(false)
  const [hourlySwitch, setHourlySwitch] = useState(false)

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

  const [passengersQuantity, setPassengersQuantity] = useState(0)

  const onDecrease = () => {
    if (passengersQuantity === 0) {
      return
    }
    // let progress = passengersQuantityForBackStep - 1
    setPassengersQuantity((passengersQuantity) => passengersQuantity - 1)
    // setPassengersQuantityForBackStep(progress)
  }
  const onIncrease = (e) => {
    if (passengersQuantity === 14) {
      return
    }
    // let progress = passengersQuantityForBackStep + 1
    setPassengersQuantity((passengersQuantity) => passengersQuantity + 1)
    // setPassengersQuantityForBackStep(progress)
  }

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
  const [bookingType, setBookingType] = useState(1)
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
    if (hourly) {
      if (firstAirline) {
        setBookingType(3)
      } else {
        setBookingType(2)
      }

      // setDisableHourly(true)
    } else {
      if (firstAirline) {
        setBookingType(3)
      } else {
        setBookingType(1)
      }
    }
  })

  return (
    <>
      {isAirline && bookingType === 3 && (
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
      )}

      <div className={style.inputsBackgroundWithOpacityNumberOfPassengers}>
        <div
          placeholder="Number of Passengers"
          className={style.numberOfPassengersInput}
          type="number"
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
            <input className={style.counterInput} value={passengersQuantity} />
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
      >
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

      <div className={style.inputsBackgroundWithOpacityLuggageCount}>
        <div className={style.luggageCountInput}>
          <p className={style.luggageCountPlaceholder}>Luggage Count</p>
          <div className={style.counterContainer}>
            <div
              className={style.minusButton}
              onClick={() => {
                if (luggageCount === 0) {
                  return
                }

                setLuggageCount((luggageCount) => luggageCount - 1)
              }}
            >
              <MinusIcon />
            </div>
            <input className={style.counterInput} value={luggageCount} />
            <div
              className={style.plusButton}
              onClick={() => {
                if (luggageCount === 14) {
                  return
                }

                setLuggageCount((luggageCount) => luggageCount + 1)
              }}
            >
              <PlusIcon />
            </div>
          </div>
        </div>
      </div>

      <div className={style.inputsBackgroundWithOpacitySafetySeat}>
        <div className={style.safetySeatSwitchInput}>
          <p className={style.safetySeatPlaceholder}>Safety Seat</p>
          <div className={style.switchWrapper}>
            <input
              type="checkbox"
              name={`switchSafetySeat`}
              className={style.switchSelf}
              id={`switchSafetySeat`}
              defaultChecked={safetySeatSwitch}
              onClick={() => {
                setSafetySeatSwitch(!safetySeatSwitch)
              }}
            />
            <label for={`switchSafetySeat`}></label>
          </div>
        </div>
      </div>

      <div className={style.inputsBackgroundWithOpacityYouthBoosterSeat}>
        <div className={style.youthBoosterSeatCountInput}>
          <p className={style.youthBoosterSeatPlaceholder}>
            Youth Booster Seat
          </p>
          <div className={style.counterContainer}>
            <div
              className={style.minusButton}
              onClick={() => {
                if (youthBoosterSeat === 0) {
                  return
                }

                setYouthBoosterSeat((youthBoosterSeat) => youthBoosterSeat - 1)
              }}
            >
              <MinusIcon />
            </div>
            <input className={style.counterInput} value={youthBoosterSeat} />
            <div
              className={style.plusButton}
              onClick={() => {
                if (youthBoosterSeat === 14) {
                  return
                }

                setYouthBoosterSeat((youthBoosterSeat) => youthBoosterSeat + 1)
              }}
            >
              <PlusIcon />
            </div>
          </div>
        </div>
      </div>
      <div className={style.inputsBackgroundWithOpacityInfantChildSafetySeat}>
        <div className={style.infantChildSafetySeatCountInput}>
          <p className={style.infantChildSafetySeatPlaceholder}>
            Infant & Child Safety Seat
          </p>
          <div className={style.counterContainer}>
            <div
              className={style.minusButton}
              onClick={() => {
                if (infantChildSafetySeat === 0) {
                  return
                }

                setInfantChildSafetySeat(
                  (infantChildSafetySeat) => infantChildSafetySeat - 1
                )
              }}
            >
              <MinusIcon />
            </div>
            <input
              className={style.counterInput}
              value={infantChildSafetySeat}
            />
            <div
              className={style.plusButton}
              onClick={() => {
                if (infantChildSafetySeat === 14) {
                  return
                }

                setInfantChildSafetySeat(
                  (infantChildSafetySeat) => infantChildSafetySeat + 1
                )
              }}
            >
              <PlusIcon />
            </div>
          </div>
        </div>
      </div>

      <div className={style.inputsBackgroundWithOpacityHourly}>
        <div className={style.hourlySwitchInput}>
          <p className={style.hourlyPlaceholder}>Hourly</p>
          <div className={style.switchWrapper}>
            <input
              type="checkbox"
              name={`switchHourly`}
              className={style.switchSelf}
              id={`switchHourly`}
              defaultChecked={hourlySwitch}
              onClick={() => {
                setHourlySwitch(!hourlySwitch)
              }}
            />
            <label for={`switchHourly`}></label>
          </div>
        </div>
      </div>

      <div className={style.inputsBackgroundWithOpacityHoursCount}>
        <div className={style.hoursCountInput}>
          <p className={style.hoursPlaceholder}>Hours</p>
          <div className={style.counterContainer}>
            <div
              className={style.minusButton}
              onClick={() => {
                if (hours === 0) {
                  return
                }

                setHours((hours) => hours - 1)
              }}
            >
              <MinusIcon />
            </div>
            <input className={style.counterInput} value={hours} />
            <div
              className={style.plusButton}
              onClick={() => {
                if (hours === 14) {
                  return
                }

                setHours((hours) => hours + 1)
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
