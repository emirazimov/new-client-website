import Image from "next/image"
import style from "./Footer.module.scss"

function imageLoader({ src, width, height }) {
  // const relativeSrc = (src) => src.split("/").pop()

  return `https://new-client-website.s3.us-east-2.amazonaws.com/${src}`
}
export const Footer = () => {
  return (
    <footer className={style.wrapper}>
      <div className={style.logoAndSocialmediaIconsContainer}>
        <div className={style.logo}>
          <Image
            loader={imageLoader}
            //   className={style.logo}
            src="footerLogo.png"
            alt="logoFooter"
            // width="229.68px"
            // height="48.71px"
            //   style={{   }}
            layout="fill"
          />
        </div>

        <div className={style.socialmediaIconsContainer}>
          <div className={style.facebook}>
            <a
              href="https://www.facebook.com/bookinglane"
              style={{ textDecoration: "none" }}
            >
              <Image
                loader={imageLoader}
                //   className={style.logo}
                src="facebook.png"
                alt="facebook"
                // width="229.68px"
                // height="48.71px"
                //   style={{   }}
                layout="fill"
              />
            </a>
          </div>
          <div className={style.twitter}>
            <a
              href="https://twitter.com/bookinglane"
              style={{ textDecoration: "none" }}
            >
              <Image
                loader={imageLoader}
                //   className={style.logo}
                src="twitter.png"
                alt="twitter"
                // width="229.68px"
                // height="48.71px"
                //   style={{   }}
                layout="fill"
              />
            </a>
          </div>
          <div className={style.instagram}>
            <a
              href="https://www.instagram.com/bookinglane/"
              style={{ textDecoration: "none" }}
            >
              <Image
                loader={imageLoader}
                //   className={style.logo}
                src="instagram.png"
                alt="instagram"
                // width="229.68px"
                // height="48.71px"
                //   style={{   }}
                layout="fill"
              />
            </a>
          </div>
          <div className={style.linkedin}>
            <a
              href="https://www.linkedin.com/company/bookinglane"
              style={{ textDecoration: "none" }}
            >
              <Image
                loader={imageLoader}
                //   className={style.logo}
                src="linkedin.png"
                alt="linkedin"
                // width="229.68px"
                // height="48.71px"
                //   style={{   }}
                layout="fill"
              />
            </a>
          </div>
        </div>
      </div>
      <div className={style.copyrightContainer}>
        <p>Copyright © 2022 Bookinglane LLC. All rights reserved.</p>
      </div>
    </footer>
  )
}
