"use client"
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { destinationContext } from '../../../../context/destinationContext';
import { sourceContext } from '../../../../context/sourceContext';
import styles from "./placeComponent.css";


function PlaceComponent({type}) {
  
  const [value, setValue] = useState(null);
  const [placeholder,setPlaceHolder] = useState(null)
  const {source,setSource} = useContext(sourceContext)
  const {destination,setDestination} = useContext(destinationContext)

  // useEffect(() => {
  //   type === "source" ?  setPlaceHolder('Pick Up Location') || setPlaceHolder(source) :  setPlaceHolder('Drop Off Location') || setPlaceHolder(destination);
  // }, []);
  useEffect(() => {
    if (type === "source") {
      setPlaceHolder(source ? source.name : 'Pick Up Location');
    }  
    if(type === "destination") {
      setPlaceHolder(destination ? destination.name : 'Drop Off Location');
    }
  }, [source, destination, type]);

  const getLatandLng = (place,type) =>{
    const placeId= place.value.place_id;
    const service = new google.maps.places.PlacesService(document.createElement('div'))
    service.getDetails({placeId},(place,status) => {
      if(status === 'OK' && place.geometry && place.geometry.location)
      {
        console.log(place.geometry.location.lat());
        if (type == "source")
        {
          setSource({
            lat:place.geometry.location.lat(),
            lng:place.geometry.location.lng(),
            name:place.formatted_address,
            label:place.name
          })
        }else{
          setDestination({
            lat:place.geometry.location.lat(),
            lng:place.geometry.location.lng(),
            name:place.formatted_address,
            label:place.name
          })
        }
      }
    })
  }
 
  return (
    <div className="">
      <div className={`${styles.pick}`}>
        <GooglePlacesAutocomplete
            apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
            selectProps={{
              value,
              onChange: (place) => {
                if(!place){
                  setValue(null);
                  setPlaceHolder('');
                  if(type == source){
                    //setSource(null)
                    setValue(null);
                    setPlaceHolder('');
                  } else if (type == destination){
                    // setDestination(null)
                    setValue(null);
                    setPlaceHolder('');
                  }
                }else{
                  getLatandLng(place,type);
                  setValue(place);
                }
              },
              // onChange: (place) => {getLatandLng(place,type);setValue(place)},
              isClearable:true,
              className:"",
              placeholder:placeholder,
              styles: {
                control: (provided) => ({
                  ...provided,
                  color:"white",
                  backgroundColor: '#00000',
                  borderRadius:"30px",
                  borderWidth:"2px",
                  borderColor:"black"
                })
              },
              components:{
                DropdownIndicator:false
              }, 
            }}
        />
      </div>
    </div>
  )
}

export default PlaceComponent