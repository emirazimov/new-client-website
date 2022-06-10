import { Header } from "../Header/Header"
import style from "./MainFirstBlock.module.scss"
import { WidgetFirstPage } from "../WidgetFirstPage/WidgetFirstPage"

import React from "react"
import { WidgetSecondPage } from "../WidgetSecondPage/WidgetSecondPage"
import { WidgetThirdPage } from "../WidgetThirdPage/WidgetThirdPage"
import { useSelector, useDispatch } from "react-redux"
import { decrement, increment } from "../../reduxToolkit/slices/counterSlice"
import { WidgetFourthPage } from "../WidgetFourthPage/WidgetFourthPage"
import WidgetFifthPage from "../WidgetFifthPage/WidgetFifthPage"

// almost on finish line, need to create redux toolkit store, and synchronize with ui

const MainFirstBlock = () => {
  const [activeStep, setActiveStep] = React.useState(1)

  const whickPage = () => {
    switch (activeStep) {
      case 1:
        return <WidgetFirstPage />
      case 2:
        return <WidgetSecondPage />
      case 3:
        return <WidgetThirdPage />
      case 4:
        return <WidgetFourthPage />
      case 5:
        return <WidgetFifthPage />
      default:
        break
    }
  }

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className={style.wrapperToLimitContentWidth}>
      <Header />
      {/* <button
        onClick={() => {
          dispatch(increment())
        }}
      >
        Click me
      </button>
      <h2>{count}</h2> */}
      <div className={style.wrapper}>
        <div className={style.letsGetStartedAndMainTextContainer}>
          <div className={style.letsGetStartedContainer}>
            <p className={style.letsGetStartedTitle}>Let’s get started:</p>

            {whickPage()}

            <div className={style.buttonsContainer}>
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
                className={style.nextButton}
                onClick={() => {
                  setActiveStep(activeStep + 1)
                }}
              >
                NEXT
              </button>
            </div>
          </div>
          <h1 className={style.mainText}>
            We provide a simple way to book the local executive car service with
            our automated technology.
          </h1>
        </div>
      </div>
    </div>
  )
}

export default MainFirstBlock
