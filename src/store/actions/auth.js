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
  
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
}


export const auth = (email, password, isSignup) => {
    return dispatch => {
        //..athenticate the user
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_vqY3-lhGbHR_I0vsarpneqivOnSwMFM`;
        if(isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_vqY3-lhGbHR_I0vsarpneqivOnSwMFM'; 
        }

        axios.post(url, authData)
        .then((response)=>{
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

            window.localStorage.setItem('token', response.data.idToken);
            window.localStorage.setItem('expirationDate', expirationDate);
            window.localStorage.setItem('userId', response.data.localId);

            dispatch(authSuccess(response.data));
            dispatch(setAuthRedirectPath('/'));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
        
            dispatch(authFail(err.response.data.error))
        })

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