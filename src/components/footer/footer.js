"use client"
import styles from "../footer/footer.module.css"

const Footer = () => {
  return (
    <div className={`${styles.footer} row`}>
        <div className="col-lg-4"></div>
        <div className="col-lg-4 d-flex align-items-center justify-content-center mb-3">Paulson Mat<span className="text-dark">hew &#169; 2024</span></div>
        <div className="col-lg-4"></div>
    </div>
  )
}

export default Footer