"use client"
import Image from "next/image";
import styles from "../ride/page.module.css"
import bike from "/Users/ajoy/NextJs/Pick and Drop/pick-and-drop/src/Images/bike.jpg"
import home from "/Users/ajoy/NextJs/Pick and Drop/pick-and-drop/src/Images/home.jpg"
import truck from "/Users/ajoy/NextJs/Pick and Drop/pick-and-drop/src/Images/truck.jpg"
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DirectionsRenderer, GoogleMap, LoadScript, Marker, MarkerF } from "@react-google-maps/api";
import { userLocationContext } from "../../../context/userLocationContext";
import PlaceAutocomplete from "@/components/place/placeComponent";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import PlaceComponent from "@/components/place/placeComponent";
import { sourceContext } from "../../../context/sourceContext";
import { destinationContext } from "../../../context/destinationContext";

function ride() {

  const [value, setValue] = useState(null);
  const {userLocation,setUserLocation}=useContext(userLocationContext)

  const {source,setSource} = useContext(sourceContext)
  const {destination,setDestination} = useContext(destinationContext)
  const [center,setCenter] = useState(null)
  const [directionRoutePoints,setDirectionRoutePoints] = useState(null)
  const [distance,setDistance] = useState()
  // const { distance, calculateDistance } = useContext(DistanceContext);
  const [buttonText, setButtonText] = useState('Cash');
  const [isReHomeClicked,setIsReHomeClicked] = useState(false)
  const [isBikeClicked,setIsBikeClicked] = useState(false)
  const [isTruckClicked,setIsTruckClicked] = useState(false)
  
  console.log(userLocation);

  const containerStyle={
    width:'600px',
    height:'400px',
    borderRadius:"30px"
  }

  const bikePayment = () => {
    setIsBikeClicked(true)
    setIsTruckClicked(false)
    setIsReHomeClicked(false)
  }

  const truckPayment = () => {
    setIsTruckClicked(true)
    setIsBikeClicked(false)
    setIsReHomeClicked(false)
  }

  const reHomePayment = () => {
    setIsReHomeClicked(true)
    setIsBikeClicked(false)
    setIsTruckClicked(false)
  }

  useEffect(()=>{
    if(source){
      console.log(source);
    }
    if(destination){
      console.log(destination);
    }
  },[source,destination])

  useEffect(() => {
    if (source && source.lat && source.lng) {
      setCenter({ lat: source.lat, lng: source.lng });
    } else {
      setCenter(userLocation);
    }
    if(source.length!=[]&&destination.length!=[]){
      directionRoute()
      calculateDistance()
    }
  }, [source, userLocation]);

  useEffect(() => {
    if (destination && destination.lat && destination.lng) {
      setCenter({ lat: destination.lat, lng: destination.lng });
    }
    if(source.length!=[]&&destination.length!=[]){
      directionRoute()
      calculateDistance()
    }
  }, [destination]);


   const calculateDistance = () => {
     const dist = google.maps.geometry.spherical.computeDistanceBetween(
       {lat:source.lat,lng:source.lng},
       {lat:destination.lat,lng:destination.lng}
     )
     const distancetoMiles = dist*0.000621374
     const formattedDistance = distancetoMiles.toFixed(2)
     setDistance(formattedDistance)

     console.log(distance);
   }



  const directionRoute=()=>{
    const DirectionService = new google.maps.DirectionsService();
    DirectionService.route({
      origin:{lat:source.lat,lng:source.lng},
      destination:{lat:destination.lat,lng:destination.lng},
      travelMode:google.maps.TravelMode.DRIVING
    },(result,status)=>{
      if(status===google.maps.DirectionsStatus.OK)
      {
        setDirectionRoutePoints(result)
      }
      else
      {
        console.error("error",status);
      }
    })
  }


  const updateButtonText = (text) => {
    setButtonText(text);
  };

  return (
    <>
      <div className={`${styles.row} row `}>
        <div className="col-lg-6">

          {/* Place and destination */}

          <div className="row mt-5">
            <div className="col-lg-2"></div>
            <div className="col-lg-8 border border-3 " style={{borderRadius:"30px"}}>
              <div className="row d-flex align-items-center justify-content-center mt-3 ">
                <div className="col-lg-9">
                  <h6>Pick Up Location</h6>
                  <PlaceComponent type="source"></PlaceComponent>
                </div>
              </div>
              <div className="row d-flex align-items-center justify-content-center mb-3">
                <div className="col-lg-9 mt-3">
                  <h6>Drop Off Location</h6>
                  <PlaceComponent type="destination"></PlaceComponent>
                </div>
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>

          {/* Google Map */}

          <div className={`${styles.mapContainer} row d-flex align-items-center justify-content-center mt-3 background-container`}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              options={{mapId:'7166901d3167929e'}}
              zoom={13}
              >
                {(source || !userLocation) && (
                  <Marker position={{ lat: source?.lat || userLocation.lat, lng: source?.lng || userLocation.lng }} />
                )}
                { destination && <Marker position={{lat:destination.lat,lng:destination.lng}} />}
                <DirectionsRenderer
                  directions={directionRoutePoints}
                  options={{
                    suppressMarkers:true,
                    polylineOptions:{
                      strokeColor:"#000",
                      strokeWeight:5
                    }
                  }}
                />
            </GoogleMap> 
          </div>
        </div>
        <div className="col-lg-6">

          {/* Ride option */}

          <div className="row mt-5">
            <div className="col-lg-2"></div>
            <div className="col-lg-8 border border-3" style={{borderRadius:"30px"}}>
                
              {/* Bike */}

              <div className="row mt-3 d-flex align-items-center justify-content-center">
                <div className={`${styles.card} card`} type="button" onClick={bikePayment}>
                  <div className={`${styles.cardbody} card-body`}>
                    <div className="row">
                      <div className="col-lg-3 d-flex align-items-center justify-content-center">
                        <Image src={bike} className={`${styles.bike}`}/>
                      </div>
                      <div className="col-lg-6 ">
                        <h5 className="d-flex align-items-center justify-content-center">Bike</h5>
                        <p className="d-flex align-items-center justify-content-center"> &#40;<span>For weights &lt;10kg </span>&#41;</p>
                      </div>
                      <div className="col-lg-3 d-flex align-items-center justify-content-center">
                        <p>Rs.{Math.round(distance) * 10}</p>
                      </div>
                    </div>
                    { isBikeClicked && (
                    <div className="row d-flex align-items-center justify-content-center mt-1">
                      <div className={`${styles.payment} col-lg-12 d-flex align-items-center justify-content-center`}>
                        <div className="btn-group dropup">
                          <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
                            {buttonText}
                          </button>
                          <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={() => updateButtonText('Cash')}>Cash</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => updateButtonText('Paytm')}>Paytm</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => updateButtonText('Add Payment')}>Add Payment</a></li>
                          </ul>
                        </div>
                        <div className="ms-2">
                          <button className="btn btn-primary">
                            Make Payment
                          </button>
                        </div>
                      </div>
                    </div>)}
                  </div>
                </div>
              </div>

              {/* Truck */}

              <div className="row mt-3 d-flex align-items-center justify-content-center">
                <div className={`${styles.card} card`} type="button" onClick={truckPayment}>
                    <div className={`${styles.cardbody} card-body`}>
                      <div className="row">
                        <div className="col-lg-3 d-flex align-items-center justify-content-center">
                          <Image src={truck} className={`${styles.truck}`}/>
                        </div>
                        <div className="col-lg-6">
                          <h5 className="d-flex align-items-center justify-content-center">Pick Up</h5>
                          <p className="d-flex align-items-center justify-content-center"> &#40;<span>For weights &lt;10kg </span>&#41;</p>
                        </div>
                        <div className="col-lg-3 d-flex align-items-center justify-content-center">
                          <p>Rs.{Math.round(distance) * 20}</p>
                        </div>
                      </div>

                      { isTruckClicked && (
                      <div className="row d-flex align-items-center justify-content-center mt-1">
                        <div className={`${styles.payment} col-lg-12 d-flex align-items-center justify-content-center`}>
                          <div className="btn-group dropup">
                            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
                              {buttonText}
                            </button>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="#" onClick={() => updateButtonText('Cash')}>Cash</a></li>
                              <li><a className="dropdown-item" href="#" onClick={() => updateButtonText('Paytm')}>Paytm</a></li>
                              <li><a className="dropdown-item" href="#" onClick={() => updateButtonText('Add Payment')}>Add Payment</a></li>
                            </ul>
                          </div>
                          <div className="ms-2">
                            <button className="btn btn-primary">
                              Make Payment
                            </button>
                          </div>
                        </div>
                    </div>)}
                  </div>
                </div>
              </div>

              {/* ReHome */}

              <div className="row d-flex align-items-center justify-content-center mt-3 mb-3">
                <div className="col-lg-6 d-flex align-items-center justify-content-center">
                  <div className={`${styles.card} card`} type="button" onClick={reHomePayment}>
                    <div className={`${styles.cardbody} card-body`}>
                      <div className=" d-flex flex-column align-items-center justify-content-center">
                        <Image src={home} className={`${styles.home}`}/>
                        <h5 className="d-flex align-items-center justify-content-center">ReHome</h5>
                      </div>
                      { isReHomeClicked && (
                      <div className="row d-flex align-items-center justify-content-center mt-1">
                        <div className={`${styles.payment} col-lg-6 d-flex align-items-center justify-content-center`}>
                          <div className="btn-group dropup">
                            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
                              {buttonText}
                            </button>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="#" onClick={() => updateButtonText('Cash')}>Cash</a></li>
                              <li><a className="dropdown-item" href="#" onClick={() => updateButtonText('Paytm')}>Paytm</a></li>
                              <li><a className="dropdown-item" href="#" onClick={() => updateButtonText('Add Payment')}>Add Payment</a></li>
                            </ul>
                          </div>
                          <div className="ms-2">
                            <button className="btn btn-primary">
                              Make Payment
                            </button>
                          </div>
                        </div>
                      </div>)}
                    </div>
                  </div>
                </div>
              </div>  
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ride;



