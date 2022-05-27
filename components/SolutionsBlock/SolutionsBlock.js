import style from "./SolutionsBlock.module.scss"

export const SolutionsBlock = () => {
  return (
    <div className={style.wrapper}>
      <h2 className={style.solutionTitle}>SOLUTIONS</h2>
      <div className={style.b2cAndB2bContainer}>
        <div className={style.b2cBlockContainer}>
          <strong className={style.b2cTitle}>B2C</strong>
          <strong className={style.b2cStrongText}>
            Looking for executive car service?
          </strong>
          <p className={style.b2cRegularText}>
            We provide the leading technology solutions that instantly connect
            you with reliable local executive car service providers. No more
            waiting for quotes or dealing with complicated and exhausting
            booking process.
          </p>
        </div>
        <div className={style.b2bBlockContainer}>
          <strong className={style.b2bTitle}>B2B</strong>
          <strong className={style.b2bStrongText}>
            Are you an executive car service provider?
          </strong>
          <p className={style.b2bRegularText}>
            We not only connect providers with existing and potential clients
            but also provide robust tools to run your daily business daily on
            the go.
          </p>
          <div className={style.textAndButtonContainer}>
            <p>Limited spots available:</p>
            <button className={style.button}>BECOME OUR PARTNER</button>
          </div>
        </div>
      </div>
    </div>
  )
}
