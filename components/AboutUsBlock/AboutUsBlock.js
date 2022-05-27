import style from "./AboutUsBlock.module.scss"

export const AboutUsBlock = () => {
  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>ABOUT US</h2>
      <p className={style.firstTextBlock}>
        We owned and operated an executive car service company for over 7 years.
        During this time, we struggled to obtain new clients and increase our
        earnings as we were invisible on the market. There was no comprehensive
        software that provided solutions for businesses like ours. The existing
        business management tools on the market were mainly built for big
        corporations that were simply not affordable to us. We established a
        team of experts in transportation, logistics, finance and technology and
        built Bookinglane as a longed-for solution to all challenges for
        business owners, independent operators and also their clients.
      </p>
      <p className={style.secondTextBlock}>
        Our goal is to provide a comprehensive platform that automates daily
        business management for business owners and simplifies booking process
        for their clients. Our platform connects transportation business owners
        with future clients and each other across the globe using our latest
        technologies. Welcome to the Bookiglane family!
      </p>
    </div>
  )
}
