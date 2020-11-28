import React, {Component, useState, useEffect} from 'react'
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modali/Modali';




const withErrorHandler = (WrappedComponent:any, axios:any) => {
  return (props:any) => {
    const [Error, setError] = useState(null);
    const reqInterceptor = axios.interceptors.request.use((req:any) => {
        setError(null);
        return req;
    });

    const resInterceptor = axios.interceptors.response.use((res:any) => res, (error:any) => {

        setError(error.message);
    });

    const errorConfirmedHandler = () => {
        setError(null);
    }

    useEffect(() => {
        
        return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.request.eject(resInterceptor);

        }
        
    }, [reqInterceptor, resInterceptor ])//cleanup when interceptors change



 

    return (
        <Auxiliary>
            <Modal 
                show={Error}
                modalClosed={errorConfirmedHandler}>
                {Error ? Error : null}
            </Modal>
            <WrappedComponent {...props} />
        </Auxiliary>
    );
    
  }
};




export default withErrorHandler;