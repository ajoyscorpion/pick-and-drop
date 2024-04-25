import { commonRequest } from "./commonHTTPRequest";

const BASE_URL = "https://pick-and-drop-server.onrender.com"

// sign up 

export const signUp = async (body) => {
    const response = await commonRequest('POST',`${BASE_URL}/signup`,body)
    console.log(response);
    return response
}

// sign in

export const signIn = async (body) => {
    const response = await commonRequest('POST',`${BASE_URL}/signin`,body)
    console.log(response);
    return response
}

// add new ride

export const addRide = async (body,token) => {
    const response = await commonRequest('POST',`${BASE_URL}/addride`,body,token)
    console.log(response);
    return response
}


export const newRehome = async (body,token) => {
    const response = await commonRequest('POST',`${BASE_URL}/addRehome`,body,token)
    console.log(response);
    return response
}

// user details

export const userInfo = async(token) => {
    const response = await commonRequest('GET',`${BASE_URL}/userDetails`,null,token)
    console.log(response);
    return response
}

// update name

export const updateName = async (body,token) => {
    console.log("inside appi");
    const response = await commonRequest('PUT',`${BASE_URL}/updateName`,body,token)
    console.log(response);
    return response
}

// update phone

export const updatePhone = async (body,token) => {
    console.log("appi");
    const response = await commonRequest('PUT',`${BASE_URL}/updatePhone`,body,token)
    console.log(response);
    return response
}

// update email

export const updateEmail = async (body,token) => {
    const response = await commonRequest('PUT',`${BASE_URL}/updateEmail`,body,token)
    console.log(response);
    return response
}

// cancel ride

export const rideCancel = async(body,token) =>{
    const response = await commonRequest('PUT',`${BASE_URL}/rideCancel`,body,token)
    console.log(response);
    return response
}


// cancel rehome

export const rehomeCancel = async(body,token) =>{
    const response = await commonRequest('PUT',`${BASE_URL}/rehomeCancel`,body,token)
    console.log(response);
    return response
}


// update rehome 

export const updateRehome = async(body,token) =>{
    console.log("inside rehome update");
    const response = await commonRequest("PUT",`${BASE_URL}/updateRehome`,body,token)
    console.log(response);
    return response

}