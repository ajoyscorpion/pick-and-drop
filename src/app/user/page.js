"use client"
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import styles from '../user/page.module.css'
import editIcon3 from '../Images/editIcon3.png'
import bike from "../Images/bike.jpg"
import DatePickerComponent from '@/app/components/datePicker/datePicker'
import { rehomeCancel, rideCancel, updateEmail, updateName, updatePhone, updateRehome, userInfo } from '../../../services/allAPIs'
import truck from "../Images/truck.jpg"
import { authContext } from '../../../context/authContext'
import home from "../Images/home.jpg"
import { dateTimeContext } from '../../../context/dateTimeContext'
import AuthRoute from '@/app/components/authRoute/authRoute'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function User() {

    const [userDetails,setUserDetails] = useState("")
    //const [newEmail,setNewEmail] = useState("")
    const [newPhone,setNewPhone] = useState("")
    const [newName,setNewName] = useState("")
    const [isAccountDetailsClicked,setIsAccountDetailsClicked] = useState(false)
    const [isTripDetailsClicked,setIsTripDetailsClicked] = useState(false)
    const [isRehomeDetailsClicked,setIsRehomeDetailsClicked] = useState(false)
    //const {token} = useContext(authContext)
    const {selectedDateTime, setSelectedDateTime} = useContext(dateTimeContext);
    const [rehomeNumber,setRehomeNumber] = useState("")

    const token = localStorage.getItem("token")


    const viewUserDetails = async (token) => {
        const info = await userInfo(token)
        console.log(info);
        setUserDetails(info)
    }
    console.log(userDetails);



    useEffect(() => {
        viewUserDetails(token)
        setIsAccountDetailsClicked(true)
    },[token])

    

    const nameUpdate = async(e) =>{
        e.preventDefault();

        const data = {
            newName:newName
        }

        console.log(data);

        try {
            const response = await updateName(data,token)
            console.log(response);
            toast("Updated Name Successfully", { theme: "dark" });
            viewUserDetails(token)    
        } catch (error) {
            toast("Failed to Update Name", { theme: "dark" });
            console.log("Failed to Update Name");    
        }
    }

    const phoneUpdate = async(e) =>{
        e.preventDefault();

        const data = {
            newPhone:newPhone
        }

        console.log(data);

        try {
            const response = await updatePhone(data,token)
            console.log(response);
            toast("Updated Phone Successfully", { theme: "dark" });
            viewUserDetails(token)    
        } catch (error) {
            toast("Failed to Update Phone", { theme: "dark" });
            console.log("Failed to Update Phone");    
        }
    }

    // const emailUpdate = async(e) =>{
    //     e.preventDefault();

    //     const data = {
    //         newEmail:newEmail
    //     }

    //     console.log(data);

    //     try {
    //         const response = await updateEmail(data,token)
    //         console.log(response);
    //         viewUserDetails(token)    
    //     } catch (error) {
    //         console.log("Failed to Update Name");    
    //     }
    // }

    const cancelRide = async(rideNumber) =>{
        const data ={
            rideNumber:rideNumber
        }

        console.log(data);

        try {
            const response = await rideCancel(data,token)
            console.log(response);
            toast("The Ride has been Cancelled", { theme: "dark" });
            viewUserDetails(token)
        } catch (error) {
            toast("Failed to cancel the Ride", { theme: "dark" });
            console.log("Ride Cancelled error");
        }
    }


    const cancelRehome = async(rehomeNumber) => {
        const data = {
            rehomeNumber:rehomeNumber
        }

        console.log(data);

        try {
            const response = await rehomeCancel(data,token)
            console.log(response);
            toast("The Rehome has been Cancelled", { theme: "dark" });
            viewUserDetails(token)
        } catch (error) {
            toast("Failed to cancel the Rehome", { theme: "dark" });
            console.log("Rehome cancelled error");
        }
    }

    const rehomeUpdate = async(selectedDateTime,rehomeNumber) => {

        console.log(selectedDateTime);
        console.log(rehomeNumber);

        const date = selectedDateTime
        const shiftDate = date.toLocaleDateString();
        const shiftTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

        const data = {
            shiftDate:shiftDate,
            shiftTime:shiftTime,
            rehomeNumber:rehomeNumber
        }

        console.log(data);

        try {
            const response = await updateRehome(data,token)
            console.log(response);
            toast("Updated Rehome successfully", { theme: "dark" });
            viewUserDetails(token)
        } catch (error) {
            toast("Failed to update Rehome", { theme: "dark" });
            console.log("error");
        }
    }



  return (
    <AuthRoute>
        <div className='row mb-5 mt-5'>
            <div className='col-lg-2 col-3 border rounded-4 ms-lg-5 ms-4'>
                <div className='mt-3  d-flex flex-column ms-lg-5 ms-4'>
                    <p type="button" className={`${styles.link}`} onClick={() => {setIsAccountDetailsClicked(true); setIsRehomeDetailsClicked(false); setIsTripDetailsClicked(false)}}>
                        <strong>Account Details</strong>
                    </p>
                    <p type="button" className={`${styles.link}`} onClick={() => {setIsTripDetailsClicked(true); setIsRehomeDetailsClicked(false); setIsAccountDetailsClicked(false)}}>
                        <strong>Trip Details</strong>
                    </p>
                    <p type="button" className={`${styles.link}`} onClick={() => {setIsRehomeDetailsClicked(true); setIsAccountDetailsClicked(false); setIsTripDetailsClicked(false)}}>
                        <strong>Re Home Details</strong>
                    </p>
                </div>
            </div>
            <div className={`col-lg-8 col-12 ${styles.rightSide}`}>


                {isAccountDetailsClicked && (
                    <>
                        <h3 className='ms-lg-3 ms-3 mt-3'>Account Details</h3>
                        
                            <div className='row w-50 ms-3 border rounded-4'>
                                <p className='mt-3'><strong>Name</strong></p>
                                <div className={`d-flex justify-content-between ${styles.accountDetails}`}>
                                    <p>{userDetails.name}</p>
                                    <p type="button" data-bs-toggle="modal" data-bs-target="#nameUpdate" className={`${styles.link}`}>
                                        <Image src={editIcon3} alt="edit Icon" className={`${styles.editIcon3}`}/>
                                    </p>
                                </div>
                                
                                <p><strong>Mobile number</strong></p>
                                <div className={`d-flex justify-content-between ${styles.accountDetails}`}>
                                    <p>{userDetails.phone}</p>
                                    <p type="button" data-bs-toggle="modal" data-bs-target="#phoneUpdate" className={`${styles.link}`}>
                                        <Image src={editIcon3} alt="edit Icon" className={`${styles.editIcon3}`}/>
                                    </p>
                                </div>
                                
                                <p><strong>Email</strong></p>
                                <div className={`d-flex justify-content-between mb-3 ${styles.accountDetails}`}>
                                    <p>{userDetails.email}</p>
                                    {/* <p type="button" data-bs-toggle="modal" data-bs-target="#emailUpdate" className={`${styles.link}`}>
                                        <Image src={editIcon3} className={`${styles.editIcon3}`}/>
                                    </p> */}
                                </div> 
                            </div> 
                        
                    </>
                )}

                {isTripDetailsClicked && (
                    <>
                        <h3 className='ms-lg-3 ms-3 mt-3'>Trip Details</h3>
                        {userDetails.rides.map((ride,index) => (
                            <div key={index} className='row border rounded-4 ms-lg-3 ms-3 me-3 mt-4 mb-4'>
                                <div className='col-lg-2 col-2 d-flex justify-content-center align-items-center'>
                                    {ride.typeOfRide === "Bike" ? (
                                            <Image src={bike} alt="bike icon" className={`${styles.bike}`}/>  
                                        ) : (
                                            <Image src={truck} alt="truck icon" className={`${styles.truck}`}/>
                                        )
                                    }
                                </div>
                                <div className='col-lg-6 col-6 mt-3 d-flex flex-column justify-content-center align-items-starting'>
                                    <div className='fromSpace'>
                                        <p><strong>From : </strong></p>
                                        <p>{ride.source}</p>
                                    </div>
                                    <div className='toSpace'>
                                        <p><strong>To : </strong></p>
                                        <p>{ride.destination}</p>
                                    </div>
                                </div>
                                <div className='col-lg-2 col-2 mt-3 d-flex flex-column justify-content-center'> 
                                    <p><strong>Amount :</strong> &#8377; {ride.amount}</p>

                                    { ride.rideStatus === "Completed" && (
                                        <p className={`${styles.completed}`}><strong>{ride.rideStatus}</strong></p>
                                    )}

                                    { ride.rideStatus === "Cancelled" && (
                                        <p className={`${styles.cancelled}`}><strong>Cancelled</strong></p>
                                    )}

                                    { ride.rideStatus === "Ongoing" && (
                                        <>
                                            <p className={`${styles.ongoing}`}><strong>{ride.rideStatus}</strong></p>
                                            <button className={`btn btn-danger btn-sm ${styles.cancel}`} onClick={()=>cancelRide(ride.rideNumber)}>Cancel</button>
                                        </>
                                    )}
                                    
                                </div>
                                <div className='col-lg-2 col-2 d-flex flex-column justify-content-center align-items-center'>
                                    <p className='text-center'>Print Invoice</p>
                                    <a href='' className={`${styles.printIcon}`}>
                                        <span class="material-symbols-outlined">print</span>
                                    </a>
                                </div>
                            </div>
                        ))}  
                    </>
                )}

                {isRehomeDetailsClicked && (
                    <>
                        <h3 className='ms-lg-3 ms-3 mt-3'>Re Home Details</h3>
                        { userDetails.rehome.map((rehome,index)=> (
                            <div key={index} className='row border rounded-4 ms-lg-3 ms-3 me-3 mt-4 mb-4'>
                                <div className='col-lg-2 col-2 d-flex justify-content-center align-items-center'>
                                    <Image src={home} alt="home Icon" className={`${styles.home}`}/>  
                                </div>
                                <div className='col-lg-4 col-4 mt-4'>
                                    <div className=''>
                                        <p><strong>From : </strong></p>
                                        <p>{rehome.source}</p>
                                    </div>
                                    <div className=''>
                                        <p><strong>To : </strong></p>
                                        <p>{rehome.destination}</p>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-3 mt-4'>
                                    <div className=''>
                                        <p><strong>Date : </strong></p>
                                        <p>{rehome.shiftDate}</p>
                                    </div>
                                    <div className=''>
                                        <p><strong>Time : </strong></p>
                                        <p>{rehome.shiftTime}</p>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-3 d-flex flex-column justify-content-center'>
                                    <p><strong>Amount :</strong> &#8377; 6738</p>
                                    
                                    { rehome.rehomeStatus === "Ongoing" && (
                                        <>
                                            <p className={`${styles.ongoing}`}><strong>{rehome.rehomeStatus}</strong></p>
                                            <button className={`btn btn-danger btn-sm ${styles.cancel}`} onClick={()=>cancelRehome(rehome.rehomeNumber)}>Cancel</button>
                                            <button className={`btn btn-warning btn-sm mt-3 ${styles.update}`} data-bs-toggle="modal" data-bs-target="#rehomeUpdate" onClick={()=> setRehomeNumber(rehome.rehomeNumber)}>Update</button>
                                        </>
                                    )}
                                    { rehome.rehomeStatus === "Completed" && (
                                        <p className={`${styles.completed}`}><strong>{rehome.rehomeStatus}</strong></p>
                                    )}

                                    { rehome.rehomeStatus === "Cancelled" && (
                                        <p className={`${styles.cancelled}`}><strong>{rehome.rehomeStatus}</strong></p>
                                    )}
                            
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {/* New Name Modal */}
                <div class="modal fade" id="nameUpdate" tabindex="-1"  aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            {/* <h3 class="modal-title fs-5" id="exampleModalLabel">Enter New Name</h3> */}
                            {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div class="modal-body">
                            <label for="pswd" class="form-label"><strong>New Name</strong></label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="newName" 
                                value={newName} 
                                required
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={nameUpdate}>Update</button>
                        </div>
                        </div>
                    </div>
                </div>


                {/* New Phone Modal */}
                <div class="modal fade" id="phoneUpdate" tabindex="-1"  aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            {/* <h3 class="modal-title fs-5" id="exampleModalLabel">Enter New Name</h3> */}
                            {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div class="modal-body">
                            <label for="pswd" class="form-label"><strong>New Phone Number</strong></label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="newName" 
                                value={newPhone} 
                                required
                                onChange={(e) => setNewPhone(e.target.value)}
                            />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={phoneUpdate}>Update</button>
                        </div>
                        </div>
                    </div>
                </div>


                {/* rehome update */}
                <div class="modal fade" id="rehomeUpdate" tabindex="-1"  aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title fs-5" id="exampleModalLabel">Rehome Date & Time Update</h3>
                            {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div class="modal-body d-flex align-items-center justify-content-center">
                            <DatePickerComponent selectedDateTime={selectedDateTime}></DatePickerComponent>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={()=>rehomeUpdate(selectedDateTime,rehomeNumber)}>Update</button>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <ToastContainer />
    </AuthRoute>
  )
}

export default User


