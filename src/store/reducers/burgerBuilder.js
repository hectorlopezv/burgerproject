import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingridients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action) =>{
    if(action.type === actionTypes.ADD_INGRIDIENT){
        return {
            ...state,
            ingridients: {
                ...state.ingridients,
                [action.ingridientName]: state.ingridients[action.ingridientName] + 1
            },
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingridientName]
        }
    }

    if(action.type === actionTypes.REMOVE_INGRIDIENT){
        return {
            ...state,
            ingridients: {
                ...state.ingridients,
                [action.ingridientName]: state.ingridients[action.ingridientName] - 1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingridientName]
        }
    }

    if(action.type === actionTypes.SET_INGRIDIENTS){
        return {
            ...state,
            ingridients: action.ingridients,
            error: false
        }
    }

    if(action.type === actionTypes.FETCH_INGRIDIENT_FAIL){
        return {
            ...state,
            error: true
        }
    }
    return state;
}

export default reducer;