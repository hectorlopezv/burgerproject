import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}


export const authReducer = (state = initialState, action) => {



    if(actionTypes.AUTH_START === action.type){
        return {
            ...state,
            error: null,
            loading: true
        }
    }

    //LogOut
    if(actionTypes.AUTH_LOGOUT === action.type){
        return {
            ...state,
            token:null,
            userId:null,
        }
    }
    

    if(actionTypes.AUTH_SUCCESS === action.type){
        return {
            ...state,
            loading: false,
            token: action.idToken,
            userId: action.userId,
            error:null
        }

    }

    if(actionTypes.AUTH_FAIL === action.type){

        return {
            ...state,
            loading: false,
            error: action.error
        }

    }


    if(actionTypes.SET_AUTH_REDIRECT_PATH === action.type){

        return {
            ...state,
            authRedirectPath:action.path,
        }

    }

    return state;

}


