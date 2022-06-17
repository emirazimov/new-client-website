import React, { useEffect } from "react"
import ReactDOM from "react-dom"
// import { CSSTransition } from "react-transition-group"
import styles from "./Modal.module.scss"

export const Modal = (props) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose()
    }
  }
  const closeOnBodyClick = () => {
    props.onClose()
  }

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown)

    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown)
    }
  }, [])

  let container
  if (typeof window !== "undefined") {
    const rootContainer = document.createElement("div")
    const parentElem = document.querySelector("html")
    parentElem.appendChild(rootContainer)
    container = rootContainer
  }

  return container
    ? ReactDOM.createPortal(
        // <CSSTransition
        //   in={props.show}
        //   unmountOnExit
        //   timeout={{ enter: 0, exit: 300 }}
        // >
        <div
          className={props.show ? styles.showModal : styles.hideModal}
          onClick={props.onClose}
          style={{ pointerEvents: "auto" }}
        >
          <div className={styles.modal}>
            <div
              className={styles.modalContent}
              // onClick={(e) => {
              //   e.stopPropagation()
              // }}
            >
              {/* <div className={styles.modalHeader}>
            <h4 className={styles.modalTitle}>{props.title}</h4>
          </div> */}
              <div
                className={styles.modalBody}
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                {props.children}
              </div>
              {console.log(props.children)}
              {props?.children?.props?.children?.type == "div" && (
                <div className={styles.modalFooter}>
                  <button
                    onClick={props.onClose}
                    className={styles.modalOkButton}
                  >
                    OK
                  </button>
                </div>
              )}
              {props?.children?.type == "div" && (
                <div className={styles.modalFooter}>
                  <button
                    onClick={props.onClose}
                    className={styles.modalOkButton}
                  >
                    OK
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>,
        // </CSSTransition>,
        container
      )
    : null
}
