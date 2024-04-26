"use client"
import PlaceComponent from "@/app/components/place/placeComponent";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { destinationContext } from "../../context/destinationContext";
import { sourceContext } from "../../context/sourceContext";
import styles from "./page.module.css";
import calculateDistance from "../app/ride/page" 
import { authContext } from "../../context/authContext";
import { useRouter } from 'next/navigation';
import arrow from "./Images/arrow 2.png"
import Image from "next/image";


export default function Home() {

  const {source,setSource} = useContext(sourceContext)
  const {destination,setDestination} = useContext(destinationContext)
  const [isConfirmed, setIsConfirmed] = useState(false);
  //const {token,isAuthenticated} = useContext(authContext)
  const router = useRouter();

  useEffect(() => {
    
  }, [source, destination]);

  const token = localStorage.getItem("token")


  // const clickedConfirm = () => {
  //   if (token){
  //     console.log("rediredct to ride");
  //     router.push("/ride")
  //   } else{
  //     console.log("Please sign In");
  //     router.push("/signin")
  //   }
  // }

  const clickedConfirm = () => {
    if (token) {
      console.log("Redirecting to ride page...");
      router.push("/ride");
    } else {
      console.log("Please sign in to continue...");
      router.push("/signin");
    }
  };



  return (
    <>
      <div className={`${styles.row} row`}>
        <div className="col-lg-2"></div>
        <div className="col-lg-4 col-12 d-flex flex-column align-items-center justify content-center" style={{marginTop:"130px",marginBottom:"0px"}}>
          <h1 className={`${styles.pickn}`}>
            Pick <span className="" style={{color:"#FFD600"}}>&apos;n</span>
          </h1>
          <h1 className={`${styles.drop} ms-4 ms-lg-1`} style={{marginRight:"110px"}}>
            <span style={{color:"#FFD600"}}>Dr</span>op
          </h1>
        </div>
        <div className="col-lg-4 ms-lg-5 d-flex flex-column justify-content-center align-items-center">
          <h2 className="mt-lg-5 opacity-75">
            <strong>&quot;Your Route to Convenience!&quot;</strong>
          </h2>
          <div>
            <p className="ms-lg-3 mt-lg-4 ms-5 me-5 opacity-75">
              <strong>
                Pick & Drop offers seamless transportation solutions, simplifying your journey from point A to B with efficiency and reliability. 
                Whether it&apos;s a quick ride or a package delivery, we&apos;ve got you covered every step of the way.
              </strong>
            </p>
          </div>
          <div 
            type='button'
            onClick={clickedConfirm}
            className={`${styles.btn} btn border-dark mt-3 d-flex justify-content-around align-items-center`}
          >
            <h5 className="mt-1"><strong>Enter the <span>Pla</span><span>ces</span></strong></h5>
            <Image src={arrow} alt='arrow' className={`${styles.arrow}`}/>
          </div>  
        </div>
        <div className="col-lg-2"></div>
      </div>
    </>
  );
}



// "use client"
// import PlaceComponent from "@/components/place/placeComponent";
// import Link from "next/link";
// import { useContext, useEffect, useState } from "react";
// import { destinationContext } from "../../context/destinationContext";
// import { sourceContext } from "../../context/sourceContext";
// import styles from "./page.module.css";

// export default function Home() {
//   const { source, setSource } = useContext(sourceContext);
//   const { destination, setDestination } = useContext(destinationContext);
//   const [isConfirmed, setIsConfirmed] = useState(false);

//   useEffect(() => {
//     if (source && destination) {
//       setIsConfirmed(true);
//     } else {
//       setIsConfirmed(false);
//     }
//   }, [source, destination]);

//   // Define a state to track the validity of the form
//   const [formValid, setFormValid] = useState(false);

//   // Handle form validation
//   useEffect(() => {
//     setFormValid(source && destination);
//   }, [source, destination]);

//   // Function to handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formValid) {
//       // If the form is valid, redirect to the ride page
//       window.location.href = "/ride";
//     }
//   };

//   return (
//     <>
//       <div className={`${styles.row} row`}>
//         <div className="col-lg-2"></div>
//         <div className="col-lg-4 d-flex flex-column align-items-center justify content-center" style={{ marginTop: "100px" }}>
//           <h1 className={`${styles.pickn}`}>
//             Pick <span className="" style={{ color: "#FFD600" }}>'n</span>
//           </h1>
//           <h1 className={`${styles.drop}`} style={{ marginRight: "110px" }}>
//             <span style={{ color: "#FFD600" }}>Dr</span>op
//           </h1>
//         </div>
//         <div className="col-lg-5 d-flex flex-column align-items-center justify content-center" style={{ marginTop: "230px" }}>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3 d-flex align-items-center">
//               <i className="fa-regular fa-circle-dot"></i>
//               <PlaceComponent type="source"></PlaceComponent>
//             </div>
//             <div className="mb-3 d-flex align-items-center">
//               <i className="fa-solid fa-location-dot"></i>
//               <PlaceComponent type="destination"></PlaceComponent>
//             </div>
//             <button type="submit" className={`${styles.btn} btn border-dark mt-3 ms-5`} disabled={!formValid}>
//               Confirm
//             </button>
//           </form>
//         </div>
//         <div className="col-lg-1"></div>
//       </div>
//     </>
//   );
// }


{/* <form className="d-flex flex-column align-items-center justify-content-center">
            <h6 className="me-5"><strong>Pick Up Location</strong></h6>
            <div className="col-lg-6 mb-3 d-flex align-items-center">
              <i class="fa-regular fa-circle-dot"></i>
              <div className="col-lg-12 ms-3">
                <PlaceComponent type="source" required></PlaceComponent>
              </div>
            </div>
            <h6 className="me-5"><strong>Drop Off Location</strong></h6>
            <div className="col-lg-6 mb-3 d-flex align-items-center">
              <i class="fa-solid fa-location-dot"></i>
              <div className="col-lg-12 ms-3">
                <PlaceComponent type="destination" required></PlaceComponent>
              </div>
            </div>

              <div 
                type='button'
                onClick={clickedConfirm}
                className={`${styles.btn} btn border-dark mt-3 ms-5 d-flex justify-content-evenly align-items-center`}
              >
                  <h5 className="mt-1"><strong>Enter the Places</strong></h5>
                  <span class="material-symbols-outlined">arrow_forward_ios</span>
              </div>
            
              
          </form> */}
