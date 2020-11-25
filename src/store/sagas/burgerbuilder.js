import instance from '../../axios-orders';
import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects'
import { 
    setIngridients,
    fetchIngridientsFailed
} from '../actions/burgerBuilder';
export function* initIngridients(action){
    
    try {
        const response = yield instance.get('https://burgerbuilder-80b74.firebaseio.com/ingridients.json')
        yield put(setIngridients(response.data));

    } catch (error) {

        yield put(fetchIngridientsFailed());

    }
       
}