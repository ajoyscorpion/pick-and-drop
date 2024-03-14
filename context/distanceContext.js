
import { createContext } from "react";


export const distanceContext =createContext






// import { createContext, useState } from "react";
// export const distanceContext = createContext

// export const DistanceProvider = ({children}) => {
//     const [distance,setDistance] = useState(null)

//     const calculateDistance = (source, destination) => {
//         const dist = google.maps.geometry.spherical.computeDistanceBetween(
//           { lat: source.lat, lng: source.lng },
//           { lat: destination.lat, lng: destination.lng }
//         );
//         const distanceToMiles = dist * 0.000621374;
//         const formattedDistance = distanceToMiles.toFixed(2);
//         setDistance(formattedDistance)
//       };
    
//     return(
//         <distanceContext.Provider value={{distance,calculateDistance}}>
//             {children}
//         </distanceContext.Provider>
//     )
// } 