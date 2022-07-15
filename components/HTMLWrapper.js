import Head from "next/head"
import Script from "next/script"
import dynamic from "next/dynamic"

export const HTMLWrapper = ({ children, keywords }) => {
  return (
    <div>
      <Head>
        <title>
          Bookinglane: Business Management and Booking Platform for Executive
          Car Service | Limo Companies
        </title>
        <meta charset="utf-8" />
        <meta
          name="facebook-domain-verification"
          content="ezyvtf65id5zk3ndcmxa0sar41b2xk"
        />
        <link
          rel="icon"
          href="https://landing-page-nextjs.s3.us-east-2.amazonaws.com/logo.png"
        />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="sXoQ0wujmmEqIdYfFi3cG_IzxzjqABXKgDAVMKMXObI"
        />

        <meta
          name="keywords"
          content="booking,book,bookinglane,trasnport,transportation,limo software,crm mobile,moile crm,Affiliate Network, Daily Business Management, Website Integration, Online Booking Tools, Instant Invoicing, No Office Required, Run Your Business on the Go, Increased Earnings, Limo Dispatch System,  Flight Tracker, Driver Tracker, Limo Dispatching System, Livery Software, Limo Service Scheduling Software, Best Limo Software, online reservations, friendly limo software"
          //   keywords={
          //     "booking,book,bookinglane,trasnport,transportation,book transport,booking transport,crm mobile, moile crm" +
          //     keywords
          //   }
        ></meta>
        <link
          rel="apple-touch-icon"
          href="https://landing-page-nextjs.s3.us-east-2.amazonaws.com/logo.png"
        />
        <link rel="canonical" href="https://bookinglane.com/" />
        <meta
          name="description"
          content="Bookinglane provides solutions that connect your business with clients and affiliates, and support your business in the long run - all in your smartphone"
        ></meta>

        <meta name="robots" content="all"></meta>
        <meta name="robots" content="max-snippet:-1"></meta>
        <meta name="robots" content="max-image-preview:large"></meta>
        <meta name="robots" content="index, follow"></meta>
        <meta name="robots" content="max-video-preview:-1"></meta>
        <meta
          name="googlebot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        ></meta>
        <meta
          name="bingbot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        ></meta>

        {/* OG  */}
        <meta property="og:locale" content="en_US"></meta>
        <meta
          property="og:title"
          content="Bookinglane: Business Management and Booking Platform for Executive
          Car Service | Limo Companies"
        />
        <meta property="og:url" content="https://bookinglane.com/"></meta>
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:site_name"
          content="Bookinglane: Business Management and Booking Platform for Executive
          Car Service | Limo Companies"
        ></meta>
        <meta
          property="og:description"
          content="Bookinglane provides solutions that connect your business with clients and affiliates, and support your business in the long run - all in your smartphone."
        ></meta>
        <meta
          property="og:image"
          content="https://landing-page-nextjs.s3.us-east-2.amazonaws.com/CompanyImageForSocialNetworkPreview.jpg"
        ></meta>

        {/*TWITTER*/}
        <meta
          property="twitter:title"
          content="Bookinglane: Business Management and Booking Platform for Executive
          Car Service | Limo Companies"
        ></meta>
        <meta
          property="twitter:description"
          content="Bookinglane provides solutions that connect your business with clients and affiliates, and support your business in the long run - all in your smartphone."
        ></meta>
        {/* <meta
          property="twitter:image"
          content="https://landing-page-nextjs.s3.us-east-2.amazonaws.com/CompanyImageForSocialNetworkPreview.jpg"
        ></meta> */}
        <meta property="twitter:card" content="summary_large_image"></meta>

        {/* <script>
          {`
      var chatbox = document.getElementById('fb-customer-chat');
      chatbox.setAttribute("page_id", "100117945015631");
      chatbox.setAttribute("attribution", "biz_inbox");
      `}
        </script>

        <script>
          {`
      window.fbAsyncInit = function() {
        FB.init({
          xfbml            : true,
          version          : 'v13.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));`}
        </script> */}
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      </Head>
      <div>{children}</div>
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAubahwwVBkFEkRdwxgIU-EejzAOWGtEnU&libraries=places"
        strategy="beforeInteractive"
      />
    </div>
  )
}
