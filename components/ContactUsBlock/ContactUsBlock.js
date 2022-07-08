import style from "./ContactUsBlock.module.scss"
import { useEffect, useState } from "react"
export const ContactUsBlock = () => {
  const [firstName, setFirstName] = useState("")

  return (
    <div className={style.wrapperToLimitContentWidth}>
      <div className={style.wrapper}>
        <div className={style.formContainer}>
          <div className={style.titlesContainer}>
            <p className={style.planningAnEventTitle}>
              Planning an event or a custom trip?
            </p>
            <h2 className={style.contactUsTitle}>Contact Us</h2>
          </div>
          {/* <div className={style.inputsAndButtonContainer}> */}
          <form className={style.inputsAndButtonContainer}>
            <div className={style.firstNameAndLastNameContainer}>
              <input
                className={style.firstNameFullWidth}
                style={{
                  width: firstName ? "50%" : "100%",
                  borderRight: firstName
                    ? "1px solid #2096eb"
                    : "2px solid #2096eb",
                  // borderBottom: firstName
                  //   ? "1px solid #2096eb"
                  //   : "2px solid #2096eb",
                  borderTopRightRadius: firstName ? "0px" : "8px",
                  borderBottomRightRadius: firstName ? "0px" : "8px",
                }}
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
              {firstName && (
                <>
                  <input
                    className={style.lastName}
                    placeholder="Last Name"
                    // style={{
                    //   borderBottom: firstName
                    //     ? "1px solid #2096eb"
                    //     : "2px solid #2096eb",
                    // }}
                  />
                </>
              )}
            </div>
            {firstName && (
              <>
                <div className={style.emailAndPhoneContainer}>
                  <input
                    className={style.email}
                    placeholder="Email"
                    // style={{
                    //   borderTop: firstName
                    //     ? "1px solid #2096eb"
                    //     : "2px solid #2096eb",
                    //   borderRight: firstName
                    //     ? "1px solid #2096eb"
                    //     : "2px solid #2096eb",
                    // }}
                  />
                  <input
                    className={style.phone}
                    placeholder="Phone"
                    // style={{
                    //   borderTop: firstName
                    //     ? "1px solid #2096eb"
                    //     : "2px solid #2096eb",
                    //   borderLeft: firstName
                    //     ? "1px solid #2096eb"
                    //     : "2px solid #2096eb",
                    // }}
                  />
                </div>
                <textarea
                  className={style.textArea}
                  placeholder="Please share more details"
                />
                <input
                  type="submit"
                  value="SUBMIT"
                  className={style.submitButton}
                />
              </>
            )}
          </form>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}
