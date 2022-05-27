import Head from "next/head"
import Image from "next/image"
import { AboutUsBlock } from "../components/AboutUsBlock/AboutUsBlock"
import { ContactUsBlock } from "../components/ContactUsBlock/ContactUsBlock"
import { Footer } from "../components/Footer/Footer"
import { Header } from "../components/Header/Header"
import { HTMLWrapper } from "../components/HTMLWrapper"
// import { MainFirstBlock } from "../components/MainFirstBlock/MainFirstBlock"
import { SolutionsBlock } from "../components/SolutionsBlock/SolutionsBlock"
import styles from "../styles/Home.module.css"
import dynamic from "next/dynamic"
import { store } from "../reduxToolkit/store"
import { Provider } from "react-redux"

const MainFirstBlock = dynamic(
  () => import("../components/MainFirstBlock/MainFirstBlock"),
  { ssr: false }
)

export default function Home() {
  return (
    <Provider store={store}>
      <HTMLWrapper>
        <div className={styles.container}>
          <MainFirstBlock />
          <SolutionsBlock />
          <AboutUsBlock />
          <ContactUsBlock />
          <Footer />
        </div>
      </HTMLWrapper>
    </Provider>
  )
}
