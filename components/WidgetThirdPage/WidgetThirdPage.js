import style from "./WidgetThirdPage.module.scss"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

import { MinusIcon, PlusIcon } from "../../public/Assets"
import { useDispatch, useSelector } from "react-redux"
import {
  setBoosterSeatCount,
  setHourlySwitch,
  setHoursCount,
  setSafetySeatCount,
  setSafetySeatSwitch,
} from "../../reduxToolkit/slices/formData"

export const WidgetThirdPage = () => {
  const [youthBoosterSeat, setYouthBoosterSeat] = useState(0)
  const [infantChildSafetySeat, setInfantChildSafetySeat] = useState(0)
  const [hours, setHours] = useState(0)

  // const [safetySeatSwitch, setSafetySeatSwitch] = useState(false)
  // const [hourlySwitch, setHourlySwitch] = useState(false)

  const formData = useSelector((state) => state.formData)

  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (formData.hourly) {
  //     if (firstAirline) {
  //       setBookingType(3)
  //     } else {
  //       setBookingType(2)
  //     }
  //     // setDisableHourly(true)
  //   } else {
  //     if (firstAirline) {
  //       setBookingType(3)
  //     } else {
  //       setBookingType(1)
  //     }
  //   }
  // })

  return (
    <>
      <div className={style.inputsBackgroundWithOpacitySafetySeat}>
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
                dispatch(setSafetySeatSwitch(!formData.showCarsWithSafetySeat))
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
                if (formData.boosterSeatCount === 0) {
                  return
                }
                dispatch(setBoosterSeatCount(formData.boosterSeatCount - 1))
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
                dispatch(setBoosterSeatCount(formData.boosterSeatCount + 1))
                // setYouthBoosterSeat((youthBoosterSeat) => youthBoosterSeat + 1)
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
                if (formData.safetySeatCount === 0) {
                  return
                }
                dispatch(setSafetySeatCount(formData.safetySeatCount - 1))
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

                dispatch(setSafetySeatCount(formData.safetySeatCount + 1))

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

      <div className={style.inputsBackgroundWithOpacityHourly}>
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
                if (formData.hours === 0) {
                  return
                }
                dispatch(setHoursCount(formData.hours - 1))
                // setHours((hours) => hours - 1)
              }}
            >
              <MinusIcon />
            </div>
            <input className={style.counterInput} value={formData.hours} />
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
    </>
  )
}
