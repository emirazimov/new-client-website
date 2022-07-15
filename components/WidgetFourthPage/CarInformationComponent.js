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
  disableClickOnCardClick,
  key,
}) => {
  function imageLoader({ src, width, height, key }) {
    return `https://new-client-website.s3.us-east-2.amazonaws.com/${src}`
  }
  const dispatch = useDispatch()

  // function imageLoaderForNoImage({ src }) {
  //   return `https://notarius-goncharov.ru/articles/${src}`
  // }

  return (
    <div
      key={`${key}`}
      className={
        carId == selectedCar ? style.carContainerSelected : style.carContainer
      }
      onClick={() => {
        if (!disableClickOnCardClick) {
          setSelectedCar(carId)
          dispatch(setCarId(carId))
        }
      }}
      style={{
        pointerEvents: disableClickOnCardClick ? "none" : "auto",
        background: disableClickOnCardClick && "fafafa",
      }}
    >
      <div className={style.orSimilar}>or similar</div>
      <div className={style.typeAndImageContainer}>
        <p className={style.typeOfVehicle}>{altTypeOfVehicle}</p>
        <div className={style.carImage} style={{ pointerEvents: "auto" }}>
          <Image
            loader={imageLoader}
            src={imageUrl}
            alt={altTypeOfVehicle}
            style={{ borderRadius: "7.2px" }}
            layout="fill"
          ></Image>
        </div>
      </div>
      <div className={style.detailsContainer}>
        <p className={style.carPrice}>
          {carPrice} USD
          {/* NEED TO SYNCHRONIZE REFERAL CODE WITH BACK */}
          {/* {doesClientHaveReferalCode && <span className={style.redLine}></span>} */}
        </p>
        {/* { doesClientHaveReferalCode && <p className={style.carPriceWithDiscount}>1 USD</p>} */}
        <p className={style.carCapacity}>CAPACITY-{carCapacity}</p>
        <p className={style.carLuggage}>LUGGAGE-2</p>
      </div>
    </div>
  )
}
