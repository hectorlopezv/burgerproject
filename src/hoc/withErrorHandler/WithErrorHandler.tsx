import React, {Component, useState, useEffect} from 'react'
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modali/Modali';

import useErrorHandler from '../../hooks/http-error-handler';



const withErrorHandler = (WrappedComponent:any, axios:any) => {
  return (props:any) => {//2 forma de hacer un HOC

    const [error, clearError] = useErrorHandler(axios);
 
    return (
        <Auxiliary>
            <Modal 
                show={error}
                modalClosed={clearError}>
                {error ? error : null}
            </Modal>
            <WrappedComponent {...props} />
        </Auxiliary>
    );
    
  }
};




export default withErrorHandler;