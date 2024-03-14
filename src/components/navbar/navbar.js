"use client"
import Image from "next/image";
import logo from "/Users/ajoy/NextJs/Pick and Drop/pick-and-drop/src/Images/pick-n-drop-high-resolution-logo-white-transparent.png"
import styles from "../navbar/navbar.module.css"
import user from "/Users/ajoy/NextJs/Pick and Drop/pick-and-drop/src/Images/User.png"
import Link from "next/link";


const Navbar = () => {
  return (
    <div className="nav row mt-3">
        <div className="col-lg-1"></div> 
        <div className="col-lg-2 d-flex justify-content-center">
            <Link href="/">
                <Image src={logo} alt="Logo" className={styles.logo}/>
            </Link>
        </div>
        <div className="col-lg-6"></div>
        <div className="col-lg-2 d-flex align-items-center justify-content-center">
            <Link style={{textDecoration:"none", color:"white"}} href="#">
                <Image src={user} className={styles.user}/>
            </Link>
        </div>
        <div className="col-lg-1"></div> 
    </div>
  );
};

export default Navbar;