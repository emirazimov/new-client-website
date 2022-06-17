import React from "react"
import { Modal } from "./Modal"
import styles from "./PrivacyPolicy.module.scss"

export default function PrivacyPolicy() {
  const [open, setOpen] = React.useState(false)
  const [privacyPolicy, setPrivacyPolicy] = React.useState("")

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  const [show, setShow] = React.useState(false)

  return (
    <>
      <span
        onClick={(event) => setShow(true)}
        className={styles.privacyPolicyOpenButton}
        // style={{ color: fontColor }}
      >
        / Privacy Policy
      </span>
      <Modal onClose={() => setShow(false)} show={show}>
        {/* <DialogTitle
          id='scroll-dialog-title'
          style={{ height: '55px', backgroundColor: 'black' }}
        > */}
        <div
          // style={{ width: "600px", height: "100%" }}
          className={styles.privacyPolicyContainer}
        >
          <span>Privacy Policy</span>
          {/* </DialogTitle> */}
          {/* <DialogContent style={{ backgroundColor: 'black' }}>
          <DialogContentText
            id='scroll-dialog-description'
            ref={descriptionElementRef}
            tabIndex={-1}
            style={{ backgroundColor: 'black' }}
          > */}
          <p>Privacy Policy of Bookinglane</p>
          <p>Bookinglane collects some Personal Data from its Users.</p>
          <p>
            Personal Data collected for the following purposes and using the
            following services:
          </p>
          <p>Analytics</p>
          <p>
            <span style={{ marginRight: "7px" }}>&#9679;</span>Google Analytics
            <br />
            <span style={{ marginRight: "7px" }}>&#9679;</span>Personal Data:
            Tracker; Usage Data
          </p>
          <p>Beta Testing</p>
          <p>
            <span style={{ marginRight: "7px" }}>&#9679;</span>App Center
            <br />
            <span style={{ marginRight: "7px" }}>&#9679;</span>Personal Data:
            Data communicated while using the service; email address; various
            types of Data as specified in the privacy policy of the service
            <br />
          </p>
          <p>Displaying content from external platforms</p>
          <p>
            <span style={{ marginRight: "7px" }}>&#9679;</span>Google Maps
            widget and Instagram widget
            <br />
            <span style={{ marginRight: "7px" }}>&#9679;</span>Personal Data:
            Tracker; Usage Data
          </p>
          <p>Handling payments</p>
          <p>
            <span style={{ marginRight: "7px" }}>&#9679;</span>Stripe
            <br />
            Personal Data: billing address; email address; first name; last
            name; purchase history; various types of Data as specified in the
            privacy policy of the service Apple Pay Personal Data: billing
            address; email address; first name; last name; payment info; phone
            number; purchase history; various types of Data as specified in the
            privacy policy of the service
          </p>
          <p>Payments processed via the Google Play Store</p>
          <p>
            Personal Data: billing address; email address; first name; last
            name; payment info; phone number; purchase history
          </p>
          <p>Hosting and backend infrastructure</p>
          <p>
            Amazon Web Services (AWS) Personal Data: various types of Data as
            specified in the privacy policy of the service
          </p>
          <p>Interaction with external social networks and platforms</p>
          <p>
            <span style={{ marginRight: "7px" }}>&#9679;</span>LinkedIn button
            and social widgets and Twitter Tweet button and social widgets
            Personal Data: Tracker; Usage Data <br />
            <span style={{ marginRight: "7px" }}>&#9679;</span>Buffer button and
            social widgets Personal Data:Usage Data
          </p>
          <p>Interaction with live chat platforms</p>
          <p>
            <span style={{ marginRight: "7px" }}>&#9679;</span>ClickDesk Widget{" "}
            <br />
            Personal Data: Data communicated while using the service; Tracker;
            Usage Data
          </p>
          <p>Platform services and hosting</p>
          <p>
            <span style={{ marginRight: "7px" }}>&#9679;</span>Apple App Store
            and Google Play Store <br />
            Personal Data: Usage Data
          </p>
          <p>Contact information</p>
          <p>
            <span style={{ marginRight: "7px" }}>&#9679;</span>Owner and Data
            Controller <br />
            Bookinglane LLC 1905 Concord Blvd, Concord, 94520, CA, USA
          </p>
          <p>Owner contact email: info@bookinglane.com</p>
          {/* </DialogContentText>
        </DialogContent> */}
          {/* <DialogActions> */}
          {/* <button
            onClick={handleClose}
            style={{ position: 'fixed', bottom: '0' }}
          >
            OK
          </button> */}
          {/* </DialogActions> */}
        </div>
      </Modal>
    </>
  )
}
