import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};



export const authSuccess = (authData) => {
    console.log(authData);
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData,
        idToken: authData.idToken,
        userId: authData.localId,
        
    }
};


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

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
            dispatch(authSuccess(response.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error))
        })

    }
}




