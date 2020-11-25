import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};


export const logout = () => {
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
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }

}