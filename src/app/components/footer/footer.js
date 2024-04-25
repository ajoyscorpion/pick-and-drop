"use client"
import styles from "../footer/footer.module.css"

const Footer = () => {
  return (
    <div className={`${styles.footer} row border-top`}>
        <div className="col-lg-4"></div>
        <div className="col-lg-4 col-12 d-flex align-items-center justify-content-center mt-3 mb-3">Paulson Mat<span className="text-dark">hew &#169; 2024</span></div>
        <div className="col-lg-4"></div>
    </div>
  )
}

export default Footer