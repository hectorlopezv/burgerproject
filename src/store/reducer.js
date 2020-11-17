import * as actionTypes from './actions';

const initialState = {
    ingridients: {
        salad:0,
        bacon:0,
        cheese:0,
        meat: 0
    },

    totalPrice: 4
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
    
    return state;
}

export default reducer;