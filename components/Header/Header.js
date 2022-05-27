import style from "./Header.module.scss"
// import logoHeader from "../../public/headerLogo.png"
import Image from "next/image"

function imageLoader({ src, width, height }) {
  // const relativeSrc = (src) => src.split("/").pop()

  return `https://new-client-website.s3.us-east-2.amazonaws.com/${src}`
}

export const Header = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.logo}>
        <Image
          loader={imageLoader}
          //   className={style.logo}
          src="headerLogo.png"
          alt="logo"
          // width="229.68px"
          // height="48.71px"
          //   style={{   }}
          layout="fill"
        />
      </div>
      {/* <div> */}

      <ul className={style.menuContainer}>
        <li>For B2B</li>
        <li>Solutions</li>
        <li>About Us</li>
        <li>Contact Us</li>
      </ul>
      {/* </div> */}
    </div>
  )
}
