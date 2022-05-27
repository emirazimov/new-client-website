import style from "./WidgetThirdPage.module.scss"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

export const WidgetThirdPage = () => {
  const carsList = [
    {
      typeOfVehicle: "SEDAN",
      image: "sedanImg.png",
      capacity: "3",
      luggage: "2",
      price: "140.30",
    },
    {
      typeOfVehicle: "SUV",
      image: "suvImg.png",
      capacity: "6",
      luggage: "2",
      price: "140.30",
    },
    {
      typeOfVehicle: "MINI BUS",
      image: "miniBus.png",
      capacity: "3",
      luggage: "2",
      price: "140.30",
    },
    {
      typeOfVehicle: "LIMOUSINE",
      image: "limousine.png",
      capacity: "3",
      luggage: "2",
      price: "140.30",
    },

    {
      typeOfVehicle: "LIMOUSINE",
      image: "limousine.png",
      capacity: "3",
      luggage: "2",
      price: "140.30",
    },
    {
      typeOfVehicle: "LIMOUSINE",
      image: "limousine.png",
      capacity: "3",
      luggage: "2",
      price: "140.30",
    },
    {
      typeOfVehicle: "LIMOUSINE",
      image: "limousine.png",
      capacity: "3",
      luggage: "2",
      price: "140.30",
    },
    {
      typeOfVehicle: "LIMOUSINE",
      image: "limousine.png",
      capacity: "3",
      luggage: "2",
      price: "140.30",
    },
  ]

  function imageLoader({ src, width, height }) {
    // const relativeSrc = (src) => src.split("/").pop()

    return `https://new-client-website.s3.us-east-2.amazonaws.com/${src}`
  }

  return (
    <div className={style.wrapperWithBlackBorder}>
      <div className={style.wrapper}>
        {carsList.map((car, index) => {
          return (
            <div className={style.carContainer}>
              <div className={style.typeAndImageContainer}>
                <p className={style.typeOfVehicle}>{car.typeOfVehicle}</p>
                <div className={style.carImage}>
                  <Image
                    loader={imageLoader}
                    src={car.image}
                    alt={car.typeOfVehicle}
                    layout="fill"
                  ></Image>
                </div>
              </div>
              <div className={style.detailsContainer}>
                <p className={style.carPrice}>{car.price} USD</p>
                <p className={style.carCapacity}>CAPACITY-{car.capacity}</p>
                <p className={style.carLuggage}>LUGGAGE-{car.luggage}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
