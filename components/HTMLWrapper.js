import Head from "next/head"
import Script from "next/script"
import dynamic from "next/dynamic"

export const HTMLWrapper = ({ children, keywords }) => {
  return (
    <div>
      <Head>
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAubahwwVBkFEkRdwxgIU-EejzAOWGtEnU&libraries=places"></script> */}
        {/* we provide executive car & chauffeur service */}
      </Head>
      <div>{children}</div>
      <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAubahwwVBkFEkRdwxgIU-EejzAOWGtEnU&libraries=places" />
    </div>
  )
}
