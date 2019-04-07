import axios from 'axios'
import config from 'config/default.json'

var instance = axios.create({
    baseURL: 'https://i55aqtajjc.execute-api.us-east-1.amazonaws.com/default/currentStats',
    timeout: 5000  // 5sec
})
//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN

const getRequest = (path) => {
    // console.log(path)
    return instance.get(path)
        .then(response => {
            // console.log(response)
            return { data: response, error: false };
        })
        .catch(error => {
            if (error.response) {
                let errorDetails = "Server responded with status code that falls outside of range 2xx"
                // console.log(errorDetails)
                return { error: true, errorDetails: errorDetails }
            }
            else if (error.request) {
                let errorDetails = "Request was made but no response received"
                // console.log(errorDetails)
                return { error: true, errorDetails: errorDetails }
            }
            else {
                let errorDetails = error.message
                // console.log(errorDetails)
                return { error: true, errorDetails: errorDetails }
            }
        });
}

export function getMostActive(sectors){
    let path = `?param=mostActive`
    const response = getRequest(path);
    return response.data;
}

export function getTopGainers(sectors){
    let path = `?param=topGainers`
    const response = getRequest(path);
    return response.data;
}

export function getTopLosers(sectors){
    let path = `?param=topGainers`
    const response = getRequest(path);
    return response.data;
}