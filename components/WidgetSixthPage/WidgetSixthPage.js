import { Autocomplete } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  useCreateReservationMutation,
  useGetCitiesQuery,
  useGetStatesQuery,
} from "../../reduxToolkit/services/createReservation"
import Cleave from "cleave.js/react"
import ReactInputMask from "react-input-mask"
import style from "./WidgetSixthPage.module.scss"
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
} from "../../reduxToolkit/slices/formData"
import { Preloader } from "../Helpers/Preloader"
import { ErroIcon, SuccessIcon } from "../../public/Assets"
import TermsOfUse from "../Helpers/TermsOfUse"
import PrivacyPolicy from "../Helpers/PrivacyPolicy"

export const WidgetSixthPage = ({
  resultOfCreateReservation,
  termsAndPrivacyPolicyChecked,
  setTermsAndPrivacyPolicyChecked,
  iAgreeWithTransactionFeeNonrefundableChecked,
  setIAgreeWithTransactionFeeNonrefundableChecked,
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

  const result = useGetCitiesQuery(statesId)

  useEffect(() => {
    console.log(result)
    setCities(result.data)
  }, [result, statesId, isSuccess])

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

  return (
    <div className={style.wrapperWithBlackBorders}>
      <div className={style.wrapper}>
        {resultOfCreateReservation.isLoading && <Preloader />}
        {resultOfCreateReservation.isSuccess && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SuccessIcon />
            <p style={{ marginTop: "20px", textAlign: "center" }}>
              Your reservation was successfully submitted
            </p>
          </div>
        )}
        {resultOfCreateReservation.isError && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ErroIcon />
            <p style={{ marginTop: "20px", textAlign: "center" }}>
              Something went wrong
            </p>
          </div>
        )}
        {!resultOfCreateReservation.isLoading &&
          !resultOfCreateReservation.isSuccess &&
          !resultOfCreateReservation.isError && (
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
                        htmlFor="input"
                        className={style.checkboxInput}
                      />
                      <span className={style.checkboxSpan}></span>
                    </label>
                    <div className={style.iAgreeWithContainer}>
                      I agree that the transaction fee is non-refundable in case
                      of cancellation
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
      </div>
    </div>
  )
}
