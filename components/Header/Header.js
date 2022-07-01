import style from "./Header.module.scss"
// import logoHeader from "../../public/headerLogo.png"
import Image from "next/image"
import { Drawer, useMediaQuery } from "@mui/material"
import { useState } from "react"
import { BurgerMenu } from "../../public/Assets"

function imageLoader({ src, width, height }) {
  // const relativeSrc = (src) => src.split("/").pop()

  return `https://new-client-website.s3.us-east-2.amazonaws.com/${src}`
}

export const Header = () => {
  const isMobile = useMediaQuery("(max-width: 760px)")

  const [openBurgerMenu, setOpenBurgerMenu] = useState(false)

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const closeBurgerMenu = () => {
    setOpenBurgerMenu(false)
  }

  return (
    <div className={style.wrapper}>
      {!isMobile ? (
        <div className={style.wrapperWithSideMargin}>
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
        </div>
      ) : (
        <>
          <div className={style.wrapperWithMarginsForBurgerMenu}>
            <div
              onClick={() => {
                setOpenBurgerMenu(true)
              }}
              className={style.burgerMenuIcon}
            >
              <BurgerMenu />
            </div>
          </div>
          {/* <button
            onClick={() => {
              setOpenBurgerMenu(true)
            }}
          >
            Click me
          </button> */}
          <Drawer
            // anchor={"left"}
            open={openBurgerMenu}
            onClose={closeBurgerMenu}
          >
            <nav className={style.burgerMenuBodyContainer}>
              <ul className={style.burgerMenuItemsListContainer}>
                <li>For B2B</li>
                <li>Solutions</li>
                <li>About Us</li>
                <li>Contact Us</li>
              </ul>
            </nav>
          </Drawer>
        </>
      )}

      {/* </div> */}
    </div>
  )
}
