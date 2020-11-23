import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}


export const authReducer = (state = initialState, action) => {



    if(actionTypes.AUTH_START === action.type){
        return {
            ...state,
            error: null,
            loading: true
        }
    }

    if(actionTypes.AUTH_SUCCESS === action.type){
        return {
            ...state,
            loading: false,
            token: action.idToken,
            userId: action.userId,
            error:null,
        }

    }

    if(actionTypes.AUTH_FAIL === action.type){

        return {
            ...state,
            loading: false,
            error: action.error
        }

    }

    return state;

}


