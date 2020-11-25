import * as actionTypes from './actionTypes';

export const addIngridient = (name) =>{
    return {
        type: actionTypes.ADD_INGRIDIENT, 
        ingridientName: name
    }
}


export const removeIngridient = (name) =>{
    return {
        type: actionTypes.REMOVE_INGRIDIENT, 
        ingridientName: name
    }
}



export const fetchIngridientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGRIDIENT_FAIL
    }
}

//utility actions
export const setIngridients = (ingridients) =>{
    return {
        type: actionTypes.SET_INGRIDIENTS,
        ingridients: ingridients
    }
}

//async action creators
export const initIngridients = () => {
    return {
        type: actionTypes.INIT_INGRIDIENT
    }
}