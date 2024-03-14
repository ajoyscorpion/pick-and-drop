"use client"
import PlaceComponent from "@/components/place/placeComponent";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { destinationContext } from "../../context/destinationContext";
import { sourceContext } from "../../context/sourceContext";
import styles from "./page.module.css";
import calculateDistance from "../app/ride/page" 

export default function Home() {

  const {source,setSource} = useContext(sourceContext)
  const {destination,setDestination} = useContext(destinationContext)
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (source && destination) {
      setIsConfirmed(true);
    } else {
      setIsConfirmed(false);
    }
  }, [source, destination]);

  return (
    <>
      <div className={`${styles.row} row`}>
        <div className="col-lg-2"></div>
        <div className="col-lg-4 d-flex flex-column align-items-center justify content-center" style={{marginTop:"100px"}}>
          <h1 className={`${styles.pickn}`}>
            Pick <span className="" style={{color:"#FFD600"}}>'n</span>
          </h1>
          <h1 className={`${styles.drop}`} style={{marginRight:"110px"}}>
            <span style={{color:"#FFD600"}}>Dr</span>op
          </h1>
        </div>
        <div className="col-lg-5 d-flex flex-column justify-content-center">
          <form className="d-flex flex-column align-items-center justify-content-center">
            <h6 className="me-5">Pick Up Location</h6>
            <div className="col-lg-6 mb-3 d-flex align-items-center">
              <i class="fa-regular fa-circle-dot"></i>
              <div className="col-lg-12 ms-3">
                <PlaceComponent type="source" required></PlaceComponent>
              </div>
            </div>
            <h6 className="me-5">Drop Off Location</h6>
            <div className="col-lg-6 mb-3 d-flex align-items-center">
              <i class="fa-solid fa-location-dot"></i>
              <div className="col-lg-12 ms-3">
                <PlaceComponent type="destination" required></PlaceComponent>
              </div>
            </div>
            <Link href={isConfirmed ? "/ride" : "#"}>
              <button
                type="button"
                className={`${styles.btn} btn border-dark mt-3 ms-5`}
                disabled={!isConfirmed}
              >
                Confirm
              </button>
            </Link>
          </form>
        </div>
        <div className="col-lg-1"></div>
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
