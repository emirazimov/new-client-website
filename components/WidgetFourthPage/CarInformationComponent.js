import style from "./CarInformationComponent.module.scss"
import Image from "next/image"
import { setCarId } from "../../reduxToolkit/slices/formData"
import { useDispatch } from "react-redux"

export const CarInformationComponent = ({
  imageUrl,
  altTypeOfVehicle,
  carPrice,
  carCapacity,
  carLuggage,
  setSelectedCar,
  carId,
  selectedCar,
  selectable,
}) => {
  function imageLoader({ src, width, height }) {
    // const relativeSrc = (src) => src.split("/").pop()

    return `https://bookinglane-images.S3.us-east-2.amazonaws.com/${src}`
  }

  const dispatch = useDispatch()

  return (
    <div
      className={
        carId == selectedCar ? style.carContainerSelected : style.carContainer
      }
      onClick={() => {
        setSelectedCar(carId)
        dispatch(setCarId(carId))
      }}
    >
      <div className={style.typeAndImageContainer}>
        <p className={style.typeOfVehicle}>{altTypeOfVehicle}</p>
        <div className={style.carImage}>
          <Image
            loader={imageLoader}
            src={
              imageUrl
                ? imageUrl
                : "https://fl-1.cdn.flockler.com/embed/not-found.png"
            }
            alt={altTypeOfVehicle}
            style={{ borderRadius: "7.2px" }}
            layout="fill"
          ></Image>
        </div>
      </div>
      <div className={style.detailsContainer}>
        <p className={style.carPrice}>{carPrice} USD</p>
        <p className={style.carCapacity}>CAPACITY-{carCapacity}</p>
        <p className={style.carLuggage}>LUGGAGE-2</p>
      </div>
    </div>
  )
}
