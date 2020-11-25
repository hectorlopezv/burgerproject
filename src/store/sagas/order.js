import instance from '../../axios-orders';
import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects'
import { 
    fetchOrdersStart,
    purchaseBurgerStart,
    purchaseBurgerSuccess,
    purchaseBurgerFail,
    fetchOrdersSuccess,
    fetchOrdersFail
} from '../actions/order';

export function*  purchaseBurgerSaga (action){
    try {
        yield put(purchaseBurgerStart())
        const response = yield instance.post('/orders.json?auth=' + action.token, action.orderData)
        yield put(purchaseBurgerSuccess(response.data, action.orderData));
    } catch (error) {
        yield put(purchaseBurgerFail(error));
    }


  
}

export function*  fetchOrdersSaga (action){
    
        try {
            yield put(fetchOrdersStart());
            const queryParams = yield '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    
            const response =  yield instance.get('/orders.json' + queryParams)
            
            const fetchedOrders = [];
            for (let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],//info del objecto
                    id:key//key del objecto
                });
            }
            yield put(fetchOrdersSuccess(fetchedOrders));
        } catch (error) {
            yield  put(fetchOrdersFail(error));
        }
}