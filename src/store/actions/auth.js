import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};


export const logout = () => {
    //window.localStorage.removeItem('token');
    //window.localStorage.removeItem('expirationTime');
    //window.localStorage.removeItem('userId');
    
    //handle wit redux saga TO RUN SAGA FUNCTION generator
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucced = () => {
    return{
        type: actionTypes.AUTH_LOGOUT//execute that action
    }
}



export const authSuccess = (authData) => {
    
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData,
        idToken: authData.idToken,
        userId: authData.localId,
        path: '/'
        
    }
};


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};



export const checkAuthTimeout = (expirationTime) => {
    console.log(expirationTime);
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime*1000
    }
}


export const auth = (email, password, isSignup) => {
    return {
        type: actionTypes.AUTH_USER,
        email:email,
        password: password,
        returnSecureToken: true,
        isSignup:isSignup
    }
    
}


export const setAuthRedirectPath = (path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {

    return dispatch => {
        const token = window.localStorage.getItem('token');
       if(!token) {
           dispatch(logout());
        }else{
            const expirationDate = new Date(window.localStorage.getItem('expirationDate'));
      


            const token = window.localStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));   
                dispatch(checkAuthTimeout( new Date().getSeconds() - expirationDate.getSeconds() ));  


            
        }
    }
}