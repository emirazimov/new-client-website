import style from "./ContactUsBlock.module.scss"

export const ContactUsBlock = () => {
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
            <input className={style.firstName} placeholder="First Name" />
            <input className={style.lastName} placeholder="Last Name" />
            <input className={style.email} placeholder="Email" />
            <input className={style.phone} placeholder="Phone" />
            <textarea
              className={style.textArea}
              placeholder="Please share more details"
            />
            <input
              type="submit"
              value="SUBMIT"
              className={style.submitButton}
            />
          </form>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}
