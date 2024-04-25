import axios from 'axios'

export const commonRequest = async (method,url,body,token) => {
    let config = {
        method,
        url,
        data:body, 
        headers: {
            'Content-Type': 'application/json', // Add Content-Type header
        },
    };

    console.log(config);

    if (token) {
        config.headers['access-token'] = token;
        console.log(token);
    }

    try {
        const response = await axios(config);
        console.log("Response Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in request:", error);
        throw error;
    }


    // try {
    //     console.log("indasa");
    //     const response = await axios(config);
    //     console.log("afakj");
    //     return response.data;
    // } catch (error) {
    //     throw error;
    // }
}