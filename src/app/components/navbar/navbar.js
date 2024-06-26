"use client"
import Image from "next/image";
import logo from "../images/pick-n-drop-high-resolution-logo-white-transparent.png"
import styles from "../navbar/navbar.module.css"
import userIcon from "../images/User.png"
import Link from "next/link";
import { useContext } from "react";
import { authContext } from "../../../../context/authContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {

    //const {token,setToken} = useContext(authContext)
    //const {user,setUser} = useContext(authContext)

    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    const logout = () => {
        //setToken('')
        //setUser('')
        localStorage.removeItem('token');
        toast("You have been logged out",{ theme: "dark" })
        localStorage.removeItem('user');
        window.location.reload()
        
    };


  return (
    <>
        <div className="nav row mt-3 mb-2 border-bottom border-1">
            <div className="col-lg-1 col-1 col-sm-1"></div> 
            <div className="col-lg-2 col-2 col-sm-2 d-flex justify-content-center">
                <Link href="/">
                    <Image src={logo} alt="Logo" className={styles.logo}/>
                </Link>
            </div>
            <div className="col-lg-6 col-5 "></div>
            <div className="col-lg-1 col-2 d-flex align-items-center justify-content-center">
                { token && (
                    <button className={`btn btn-danger btn-sm`} onClick={logout}>Log Out</button>
                )}
                { !token && (
                    <Link href="/signin">
                        <button className={`btn btn-primary btn-sm`}>Sign In</button>
                    </Link>
                )}
            </div>
            <div className="col-lg-1 col-1 d-flex flex-column align-items-center justify-content-center">
                <Link style={{textDecoration:"none", color:"white"}} href="/user">
                    <Image src={userIcon} alt="userIcon" className={styles.user}/>
                </Link>
                { token && (
                    <p className=""><strong>{user}</strong></p>
                )}
            </div>
            <div className="col-lg-1 col-1 "></div> 
        </div>
        <ToastContainer />
    </>
  );
};

export default Navbar;