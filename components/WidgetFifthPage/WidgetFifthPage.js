import { GoogleApiWrapper, Map } from "google-maps-react"
import React from "react"
import { useSelector } from "react-redux"
import style from "./WidgetFifthPage.module.scss"

const WidgetFifthPage = (props) => {
  const formData = useSelector((state) => state.formData)

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

  return (
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
            {/* {selectedCar.color} */}
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
            {/* {selectedCar.color} */}
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
            {/* {selectedCar.color} */}
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
            {/* {selectedCar.color} */}
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
            {/* {selectedCar.color} */}
          </span>
        </div>
      </div>

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
            {/* {selectedCar.color} */}
          </span>
        </div>
      </div>

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
            {/* {selectedCar.color} */}
          </span>
        </div>
      </div>

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
            {/* {selectedCar.color} */}
          </span>
        </div>
      </div>

      <div className={style.preferenceContainer}>
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
            {/* {selectedCar.color} */}
          </span>
        </div>
      </div>

      <div className={style.tipsContainer}>
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
          <span
            className={style.tipsValue}
            style={{
              color: "black",
            }}
          >
            {/* {selectedCar.color} */}
          </span>
        </div>
      </div>

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
            {/* {selectedCar.color} */}
          </span>
        </div>
      </div>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCmKhi_5V_pulQtm6DFJ8teDZpR9I5hJoM",
  libraries: ["geometry"],
})(WidgetFifthPage)
