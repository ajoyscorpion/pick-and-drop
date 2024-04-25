"use client"
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { userLocationContext } from "../../context/userLocationContext";
import { sourceContext } from "../../context/sourceContext";
import { destinationContext } from "../../context/destinationContext";
import { LoadScript } from "@react-google-maps/api";
import { DistanceProvider } from "../../context/distanceContext";
import { dateTimeContext } from "../../context/dateTimeContext";
import { authContext } from "../../context/authContext";


const inter = Inter({ subsets: ["latin"] });

//  export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
//  };

export default function RootLayout({ children }) {

  const [userLocation,setUserLocation] = useState([])
  const [source,setSource] = useState([])
  const [destination,setDestination] = useState([])
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  //const [token, setToken] = useState('')
  //const [user, setUser] = useState('')
  
  // const [token, setToken] = useState(() => {
  //   if (typeof window !== 'undefined') {
  //     return localStorage.getItem('token') || null;
  //   }
  //   return '';
  // });
  // const [user, setUser] = useState(() => {
  //   if (typeof window !== 'undefined') {
  //     return localStorage.getItem('user') || null;
  //   }
  //   return '';
  // });

  //const token = localStorage.getItem('token')

  useEffect(() => {
    getUserLocation()
    //console.log(token);
    // console.log(user);
    // if (typeof window !== 'undefined') {
    //   localStorage.setItem('token',token);
    // }
    // if (typeof window !== 'undefined') {
    //   localStorage.setItem('user',user);
    // }
  },[])

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function(pos){
      console.log(pos);
      setUserLocation({
        lat:pos.coords.latitude,
        lng:pos.coords.longitude
      })
    })
  }


  // const logout = () => {
  //   setToken(null);
  //   setUser(null)
  
  //   localStorage.removeItem('token');
    
  //   localStorage.removeItem('user');
    
  // };
    
  // Check if the user is authenticated
  // const isAuthenticated = () => {
  //   const token = localStorage.getItem('token')
  //   return !!token;
  // };

  const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
      // Access localStorage only on the client side
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  };

  console.log("Is authenticated:", isAuthenticated());

  const value = {
    // token,
    isAuthenticated,
    // setToken,
    // user,
    // setUser
  };

  return (
    <html lang="en">
        <head>
          <Link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"/>
          <Link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
          <Link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        </head>
        <body className={inter.className}>
            <LoadScript libraries={['places']} googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}>
              <authContext.Provider value={value}>
              <userLocationContext.Provider value={{userLocation,setUserLocation}}>
                <sourceContext.Provider value={{source,setSource}}>
                  <destinationContext.Provider value={{destination,setDestination}}>
                    <dateTimeContext.Provider value={{selectedDateTime,setSelectedDateTime}}>
                      <Navbar/>
                      {children}
                      <Footer/> 
                    </dateTimeContext.Provider>
                  </destinationContext.Provider>
                </sourceContext.Provider>
              </userLocationContext.Provider>
              </authContext.Provider>
            </LoadScript>
        </body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </html>
  );
}
