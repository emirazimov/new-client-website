import style from "./ContactUsBlock.module.scss"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"

export const ContactUsBlock = () => {
  const [firstName, setFirstName] = useState("")

  const [mainState, setMainState] = useState({
    firstName: "",
    lastName: "",
    businessName: "from client website",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setMainState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    console.log({
      name: `${value}`,
      // name: `${value}`,
      // name: `${value}`,
      // name: `${value}`,
      // name: `${value}`,
      // name: `${value}`,
    })
  }
  // const contuctUs = useSelector((store) => store.contuctUs.trigger)
  // const [open, setOpen] = useState(opened)

  // const handleClose = (value) => {
  //   setOpen(false)
  //   // setSelectedValue(value)
  // }

  const [checkmark, setCheckmark] = useState(false)
  const [flagForPreloader, setFlagForPreloader] = useState(false)
  const [transparentBg, setTransparentBg] = useState(false)
  const [hasError, setHasError] = useState(null)
  const { register, handleSubmit, errors } = useForm()
  // const gotCountries = useSelector((store) => store.countriesApi.countries)

  const onSubmit = handleSubmit((event) => {
    // event.preventDefault()
    // const templateId = "template_f8hqo9u"

    sendFeedback()
  })

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      company: {
        ...mainState,
      },
      isContactUs: true,
    }),
  }

  const sendFeedback = () => {
    if (hasError) {
      setTransparentBg(true)
      setFlagForPreloader(true)
      fetch("https://api.bookinglane.com/api/contacts", requestOptions)
        .then((res) => {
          setFlagForPreloader(false)
          setCheckmark(true)
          // setTransparentBg(false)
          console.log("Email successfully sent!")
        })
        // Handle errors here however you like, or use a React error boundary
        .catch((err) =>
          console.error(
            "Oh well, you failed. Here some thoughts on the error that occured:",
            err
          )
        )
    } else {
      if (!hasError) {
        setHasError(true)
      } else {
        setHasError(false)
      }
    }
  }
  const [emailError, setEmailError] = useState("")

  const emailHandler = (e) => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    )

    if (!pattern.test(String(e.target.value).toLowerCase())) {
      setEmailError("Please enter a valid email address")
    } else {
      setEmailError("")
    }
  }

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
          <form className={style.inputsAndButtonContainer} onSubmit={onSubmit}>
            <div className={style.firstNameAndLastNameContainer}>
              <input
                className={style.firstNameFullWidth}
                style={{
                  width: mainState.firstName ? "50%" : "100%",
                  borderRight: mainState.firstName
                    ? "none"
                    : "2px solid #2096eb",
                  // borderBottom: firstName
                  //   ? "1px solid #2096eb"
                  //   : "2px solid #2096eb",
                  borderTopRightRadius: mainState.firstName ? "0px" : "8px",
                  borderBottomRightRadius: mainState.firstName ? "0px" : "8px",
                }}
                placeholder="First Name"
                onChange={handleChange}
                required
                name="firstName"
                ref={register({ required: true })}
                value={mainState.firstName}
              />

              {mainState.firstName && (
                <>
                  <div className={style.containerForVerticalLine}>
                    <input
                      className={style.lastName}
                      placeholder="Last Name"
                      // style={{
                      //   borderBottom: firstName
                      //     ? "1px solid #2096eb"
                      //     : "2px solid #2096eb",
                      // }}
                      onChange={handleChange}
                      required
                      name="lastName"
                      ref={register({ required: true })}
                      value={mainState.lastName}
                    />
                    <div className={style.verticalLine}></div>
                  </div>
                </>
              )}
            </div>
            {mainState.firstName && (
              <>
                <div
                  className={style.emailAndPhoneContainer}
                  style={{ marginBottom: emailError && "50px" }}
                >
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
                    onChange={handleChange}
                    onBlur={(e) => {
                      emailHandler(e)
                    }}
                    type="email"
                    required
                    name="email"
                    ref={register({ required: true })}
                    value={mainState.email}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "40px",
                      left: "0",
                      fontSize: "15px",
                      marginTop: "5px",
                      color: "red",
                    }}
                  >
                    {emailError}
                  </div>
                  <div className={style.containerForVerticalLine}>
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
                      onChange={handleChange}
                      type="number"
                      required
                      name="phone"
                      ref={register({ required: true })}
                      value={mainState.phone}
                    />
                    <div className={style.verticalLine}></div>
                  </div>
                </div>
                <textarea
                  className={style.textArea}
                  placeholder="Please share more details"
                  onChange={handleChange}
                  required
                  name="message"
                  // ref={register({ required: true })}
                  value={mainState.message}
                />
                <input
                  type="submit"
                  value="SUBMIT"
                  className={style.submitButton}
                />
                {checkmark && (
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "50px",
                      fontSize: "20px",
                      color: "#38e065",
                      fontWeight: "800",
                    }}
                  >
                    Success
                  </div>
                )}
              </>
            )}
          </form>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}
