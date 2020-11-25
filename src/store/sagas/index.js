//listen to certain acttions and do something when they occur
import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckState } from './auth';
import {initIngridients} from './burgerbuilder';
import {purchaseBurgerSaga, fetchOrdersSaga} from './order';
export function* watchAuth(){
    //setting a listener to this action and then execute saga
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckState);
    yield takeEvery(actionTypes.INIT_INGRIDIENT, initIngridients);
    
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDER_INIT, fetchOrdersSaga);



}

