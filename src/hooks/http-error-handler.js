import {useState, useEffect} from 'react';


const useErrorHandler = (httpClient) => {

//cleanup when interceptors change
const [Error, setError] = useState(null);
const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
});

const resInterceptor = httpClient.interceptors.response.use((res) => res, (error:any) => {

    setError(error.message);
});

const errorConfirmedHandler = () => {
    setError(null);
}

useEffect(() => {
    
    return () => {
        httpClient.interceptors.request.eject(reqInterceptor);
        httpClient.interceptors.request.eject(resInterceptor);

    }
    
}, [httpClient.interceptors.request, reqInterceptor, resInterceptor])//cleanup when interceptors change

    return [Error, errorConfirmedHandler];
}


export default useErrorHandler;