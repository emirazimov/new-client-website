import style from "./WidgetFourthPage.module.scss"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { CarInformationComponent } from "./CarInformationComponent"
import {
  useGetFleetMutation,
  useGetFleetQuery,
} from "../../reduxToolkit/services/fleetApi"
import { useSelector } from "react-redux"

export const WidgetFourthPage = () => {
  function imageLoader({ src, width, height }) {
    // const relativeSrc = (src) => src.split("/").pop()

    return `https://new-client-website.s3.us-east-2.amazonaws.com/${src}`
  }
  ;("https://bookinglane-images.S3.us-east-2.amazonaws.com/0a9fd748-defb-48a9-93e6-f1fbe63a8274")
  console.log("hey i am fleet")

  const formData = useSelector((state) => state.formData)

  const cars = useSelector((state) => state.fleet)

  const [getFleet, result] = useGetFleetMutation()

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

  return (
    <div className={style.wrapperWithBlackBorder}>
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
        {cars.cars &&
          cars.cars.map((car, index) => {
            var str = cars?.cars[index]?.imageUrls[0]?.path
            var n = str?.lastIndexOf("/")
            var result = str?.substring(n + 1)
            console.log(result)
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
                imageUrl={result ? result : ""}
                altTypeOfVehicle={car.type}
                carPrice={car.price}
                carCapacity={car.capacity}
                carLuggage={car?.luggage}
                carId={car?.id}
                selectedCar={selectedCar}
                setSelectedCar={setSelectedCar}
              />
            )
          })}
      </div>
      {/* <button onClick={() => console.log(cars)}>asdfasdfasdfasd</button> */}
    </div>
  )
}
