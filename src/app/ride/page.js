"use client"
import Image from "next/image";
import styles from "../ride/page.module.css"
import bike from "../Images/bike.jpg"
import home from "../Images/home.jpg"
import truck from "../Images/truck.jpg"
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DirectionsRenderer, GoogleMap, LoadScript, Marker, MarkerF } from "@react-google-maps/api";
import { userLocationContext } from "../../../context/userLocationContext";
import PlaceAutocomplete from "@/app/components/place/placeComponent";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import PlaceComponent from "@/app/components/place/placeComponent";
import { sourceContext } from "../../../context/sourceContext";
import { destinationContext } from "../../../context/destinationContext";
import { dateTimeContext } from "../../../context/dateTimeContext";
import DatePickerComponent from "@/app/components/datePicker/datePicker";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addRide, newRehome, newRide } from "../../../services/allAPIs";
import { authContext } from "../../../context/authContext";
import AuthRoute from "@/app/components/authRoute/authRoute";
import GooglePayButton from "@google-pay/button-react"

function Ride() {

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
  const [amount,setAmount] = useState(false)
  const {selectedDateTime, setSelectedDateTime} = useContext(dateTimeContext);
  //const {token} = useContext(authContext)
  

  const token = localStorage.getItem("token")
  
  console.log(userLocation);

  const containerStyle={
    width:'600px',
    height:'600px',
    borderRadius:"30px",
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
      console.log(source.name);
    }
    if(destination){
      console.log(destination);
      console.log(destination.name);
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
  }, [source, destination, userLocation]);

  useEffect(() => {
    if (destination && destination.lat && destination.lng) {
      setCenter({ lat: destination.lat, lng: destination.lng });
    }
    if(source.length!=[]&&destination.length!=[]){
      directionRoute()
      calculateDistance()
      setAmount(true)
    }
  }, [source, destination]);


   const calculateDistance = () => {
     const dist = google.maps.geometry.spherical.computeDistanceBetween(
       {lat:source.lat,lng:source.lng},
       {lat:destination.lat,lng:destination.lng}
     )
     const distancetoMiles = dist*0.000621374
     const formattedDistance = distancetoMiles.toFixed(2)
     setDistance(formattedDistance)

     console.log(formattedDistance);
   }



  const directionRoute= ()=>{
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

  // const reHomeConfirm = () => {
  //   const visitDate = selectedDateTime ? new Date(selectedDateTime.getTime() - 2 * 24 * 60 * 60 * 1000) : null;
  //   const formattedDate = visitDate ? visitDate.toLocaleDateString() : '';
  //   toast(`Our agent will visit your place on ${formattedDate}`,{theme: "dark"});
  // };

  // const makePayment = () => {
  //   if (buttonText === 'Cash') {
  //     toast("The Payment has been made", { theme: "dark" });
  //   } else if (buttonText === 'Paytm') {
  //     toast("Leading to payment gateway", { theme: "dark" });
  //   } else if(amount === false){
  //     toast("Set source and destination")
  //   }
  // };

  const addride = async(e) =>{
    e.preventDefault();
    console.log("entered Ride");

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    
    const data ={
      source:source.name,
      destination:destination.name,
      distance:distance,
      amount:isBikeClicked? Math.round(distance) * 10:(isTruckClicked? Math.round(distance) * 20:""),
      typeOfRide:isBikeClicked? "Bike": (isTruckClicked? "Truck":""),
      typeOfPayment:buttonText,
      date:formattedDate,
      time:formattedTime
    }
    console.log(data);

    try{
      const response = await addRide(data,token)
      console.log(response);
      if (buttonText === "Cash") {
        toast("Pay at the time of Delivery", { theme: "dark" });
      } else if (buttonText === "Google Pay") {
        toast("Payment has been done", { theme: "dark" });
      }
      
    }catch (error){
      toast("Error in payment", { theme: "dark" });
      console.error("Error:", error);
    }
  }


  const addRehome = async (e) => {
    e.preventDefault();
    console.log("Entered addRehome");

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    const rehomeDate = selectedDateTime
    const shiftDate = rehomeDate.toLocaleDateString();
    const shiftTime = rehomeDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    const visitDate = selectedDateTime ? new Date(selectedDateTime.getTime() - 2 * 24 * 60 * 60 * 1000) : null;
    const formattedVisitDate = visitDate ? visitDate.toLocaleDateString() : '';
    

    const data = {
      date:formattedDate,
      time:formattedTime,
      shiftDate:shiftDate,
      shiftTime:shiftTime,
      source:source.name,
      destination:destination.name,
      distance:distance
    }

    console.log(data);

    try {
      const response = await newRehome(data,token)
      console.log(response);
      toast(`Our agent will visit your place on ${formattedVisitDate}`,{theme: "dark"});
    } catch (error) {
      console.log("Error",error);
    }
  }



  return (
    <AuthRoute>
         <>
          <div className={`${styles.row} row `}>
            <div className="col-lg-6 col-12">

              
              {/* Google Map */}

              <div className={`${styles.mapContainer} row d-flex align-items-center justify-content-center mt-3 me-2 ms-2 background-container`}>
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
            <div className="col-lg-6 col-12">

              {/* Ride option */}

              {/* Place and destination */}

              <div className="row mt-3">
                <div className="col-lg-2 col-2"></div>
                <div className="col-lg-8 col-8 border border-3 " style={{borderRadius:"30px"}}>
                  <div className="row d-flex align-items-center justify-content-center mt-3 ">
                    <div className="col-lg-9 col-9">
                      <h6>Pick Up Location</h6>
                      <PlaceComponent type="source"></PlaceComponent>
                    </div>
                  </div>
                  <div className="row d-flex align-items-center justify-content-center mb-3">
                    <div className="col-lg-9 col-9 mt-3">
                      <h6>Drop Off Location</h6>
                      <PlaceComponent type="destination"></PlaceComponent>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-2"></div>
              </div>


              <div className="row mt-3">
                <div className="col-lg-2 col-2"></div>
                <div className="col-lg-8 col-8 border border-3" style={{borderRadius:"30px"}}>
                    
                  {/* Bike */}

                  <div className="row mt-3 d-flex align-items-center justify-content-center">
                    <div className={`${styles.card} card`} type="button" onClick={bikePayment}>
                      <div className={`${styles.cardbody} card-body`}>
                        <div className="row">
                          <div className="col-lg-3 d-flex align-items-center justify-content-center">
                            <Image src={bike} alt="BikeIcon" className={`${styles.bike}`}/>
                          </div>
                          <div className="col-lg-6">
                            <h5 className="d-flex align-items-center justify-content-center">Bike</h5>
                            <p className="d-flex align-items-center justify-content-center"> &#40;<span>For weights &lt;10kg </span>&#41;</p>
                          </div>
                          <div className="col-lg-3 d-flex align-items-center justify-content-center">
                            {amount && (<p>Rs.{Math.round(distance) * 10}</p>)}
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
                                <li><a className="dropdown-item" href="#" onClick={() => updateButtonText('Google Pay')}>Google Pay</a></li>
                                {/* <li><a className="dropdown-item" href="#" onClick={() => updateButtonText('Add Payment')}>Add Payment</a></li> */}
                              </ul>
                            </div>
                            <div className="ms-2">
                              {buttonText === "Cash" && (
                                <button className="btn btn-primary" onClick={addride}>
                                    Make Payment
                                </button>
                              )}
                              {buttonText === "Google Pay" && (
                                <GooglePayButton
                                  environment="TEST"
                                  paymentRequest={{
                                    apiVersion: 2,
                                    apiVersionMinor: 0,
                                    allowedPaymentMethods: [
                                      {
                                        type: 'CARD',
                                        parameters: {
                                          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                          allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                        },
                                        tokenizationSpecification: {
                                          type: 'PAYMENT_GATEWAY',
                                          parameters: {
                                            gateway: 'example',
                                            gatewayMerchantId: 'exampleGatewayMerchantId',
                                          },
                                        },
                                      },
                                    ],
                                    merchantInfo: {
                                      merchantId: '12345678901234567890',
                                      merchantName: 'Demo Merchant',
                                    },
                                    transactionInfo: {
                                      totalPriceStatus: 'FINAL',
                                      totalPriceLabel: 'Total',
                                      totalPrice: isBikeClicked? Math.round(distance) * 10:(isTruckClicked? Math.round(distance) * 20:""),
                                      currencyCode: 'INR',
                                      countryCode: 'IN',
                                    },
                                  }}
                                  onLoadPaymentData={paymentRequest => {
                                    console.log('load payment data', paymentRequest);
                                    addRide()
                                  }}
                                />
                              )}
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
                              <Image src={truck} alt="truckIcon" className={`${styles.truck}`}/>
                            </div>
                            <div className="col-lg-6">
                              <h5 className="d-flex align-items-center justify-content-center">Pick Up</h5>
                              <p className="d-flex align-items-center justify-content-center"> &#40;<span>For weights &lt;10kg </span>&#41;</p>
                            </div>
                            <div className="col-lg-3 d-flex align-items-center justify-content-center">
                              {amount && <p>Rs.{Math.round(distance) * 20}</p>}
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
                                  <li><a className="dropdown-item" href="#" onClick={() => updateButtonText('Google Pay')}>Google Pay</a></li>
                                  {/* <li><a className="dropdown-item" href="#" onClick={() => updateButtonText('Add Payment')}>Add Payment</a></li> */}
                                </ul>
                              </div>
                              <div className="ms-2">
                                {buttonText === "Cash" && (
                                  <button className="btn btn-primary" onClick={addride}>
                                    Make Payment
                                  </button>
                                )}
                                {buttonText === "Google Pay" && (
                                  <GooglePayButton
                                    environment="TEST"
                                    paymentRequest={{
                                      apiVersion: 2,
                                      apiVersionMinor: 0,
                                      allowedPaymentMethods: [
                                        {
                                          type: 'CARD',
                                          parameters: {
                                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                          },
                                          tokenizationSpecification: {
                                            type: 'PAYMENT_GATEWAY',
                                            parameters: {
                                              gateway: 'example',
                                              gatewayMerchantId: 'exampleGatewayMerchantId',
                                            },
                                          },
                                        },
                                      ],
                                      merchantInfo: {
                                        merchantId: '12345678901234567890',
                                        merchantName: 'Demo Merchant',
                                      },
                                      transactionInfo: {
                                        totalPriceStatus: 'FINAL',
                                        totalPriceLabel: 'Total',
                                        totalPrice: '100.00',
                                        currencyCode: 'USD',
                                        countryCode: 'US',
                                      },
                                    }}
                                    onLoadPaymentData={paymentRequest => {
                                      console.log('load payment data', paymentRequest);
                                      addRide()
                                    }}
                                  />
                                )}  
                              </div>
                            </div>
                        </div>)}
                      </div>
                    </div>
                  </div>

                  {/* ReHome */}

                  <div className="row d-flex align-items-center justify-content-center mt-3 mb-3">
                    <div className="col-lg-6 d-flex align-items-center justify-content-center">
                      <div className={`${styles.card} card`} type="button" onClick={reHomePayment} data-bs-toggle="modal" data-bs-target="#rehomeCalender">
                        <div className={`${styles.cardbody} card-body`}>
                          <div className=" d-flex flex-column align-items-center justify-content-center">
                            <Image src={home} alt='homeIcon' className={`${styles.home}`}/>
                            <h5 className="d-flex align-items-center justify-content-center">ReHome</h5>
                          </div>
                          {/* { isReHomeClicked && (
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
                          </div>)} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2"></div>
              </div>
            </div>
          </div>

          {/* Rehome Modal */}
          <div class="modal fade" id="rehomeCalender" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Choose the date for ReHome</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body d-flex flex-column align-items-center">
                  <DatePickerComponent
                    selectedDateTime={selectedDateTime}
                  ></DatePickerComponent>
                  {/* <p className="mt-3">Selected Date : {selectedDateTime && selectedDateTime.toDateString()}</p>
                  <p>Selected Time : {selectedDateTime && selectedDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p> */}
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" onClick={addRehome} data-bs-dismiss="modal">Confirm</button>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </>
    </AuthRoute>
  )
}

export default Ride;



