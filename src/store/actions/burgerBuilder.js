import * as actionTypes from './actionTypes';
import instance from '../../axios-orders';

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
    return dispatch => {
        instance.get('https://burgerbuilder-80b74.firebaseio.com/ingridients.json')
        .then(response =>{
            console.log(response);
            dispatch(setIngridients(response.data));
        })
        .catch(err =>{
            dispatch(fetchIngridientsFailed());
        });

    }
}