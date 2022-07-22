import { GoogleApiWrapper, Map } from "google-maps-react"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DropDownArrowIcon } from "../../public/Assets"
import {
  setNotes,
  setOrderSum,
  setTips,
} from "../../reduxToolkit/slices/formData"
import { CarInformationComponent } from "../WidgetFourthPage/CarInformationComponent"
import style from "./WidgetFifthPage.module.scss"

const WidgetFifthPage = (props) => {
  const formData = useSelector((state) => state.formData)
  const cars = useSelector((state) => state.fleet.cars)

  const dispatch = useDispatch()

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

  const selectedCarArr = cars?.filter((car) => car.id == formData.carInfo.id)
  const selectedCar = selectedCarArr[0]
  // var str = selectedCar?.imageUrls[0]?.path
  // var n = str?.lastIndexOf("/")
  // var result = str?.substring(n + 1)
  // console.log(result)

  const carsLocal = [
    {
      img: "sedan-min.png",
      type: "sedan",
      price: "0",
      capacity: "6",
      luggage: "2",
      id: "243",
    },
    {
      img: "suv-min.png",
      type: "suv",
      price: "0",
      capacity: "6",
      luggage: "2",
      id: "108",
    },
    {
      img: "mini-bus-min.png",
      type: "mini-bus",
      price: "",
      capacity: "6",
      luggage: "2",
      id: "286",
    },
    {
      img: "limousine-min.png",
      type: "limousine",
      price: "",
      capacity: "6",
      luggage: "2",
      id: "309",
    },
  ]

  const selectedCarArrLocal = carsLocal?.filter(
    (car) => car.id == formData.carInfo.id
  )
  const selectedCarLocal = selectedCarArrLocal[0]

  const round = (n, dp) => {
    const h = +"1".padEnd(dp + 1, "0") // 10 or 100 or 1000 or etc
    return Math.round(n * h) / h
  }

  const [showTipsDropdown, setShowTipsDropdown] = useState(false)

  const [tipsDropdownValue, setTipsDropdownValue] = useState("")

  useEffect(() => {
    dispatch(setOrderSum(selectedCar?.price + selectedCar?.transactionFee))
  }, [formData])

  return (
    <div className={style.wrapperWithBlackBorders}>
      <div className={style.wrapper}>
        <div className={style.mapContainer}>
          <Map
            google={props.google}
            // styles={MapStyles}
            disableDefaultUI={false}
            className={"map"}
            onReady={handleMapReady}
          ></Map>
        </div>
        {/* <button onClick={() => console.log(selectedCar[0])}></button> */}
        <div className={style.carWrapper}>
          {/* <CarInformationComponent /> */}
          <CarInformationComponent
            imageUrl={selectedCarLocal.img}
            altTypeOfVehicle={selectedCarLocal?.type}
            carPrice={selectedCar?.price}
            carCapacity={selectedCar?.capacity}
            carLuggage={selectedCarLocal?.luggage}
            carId={selectedCarLocal?.id}
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
              {`$${round(selectedCar?.price + selectedCar?.transactionFee, 2)}`}
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
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCmKhi_5V_pulQtm6DFJ8teDZpR9I5hJoM",
  libraries: ["geometry"],
})(WidgetFifthPage)
