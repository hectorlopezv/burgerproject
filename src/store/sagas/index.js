//listen to certain acttions and do something when they occur
import {takeEvery, all} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckState } from './auth';
import {initIngridients} from './burgerbuilder';
import {purchaseBurgerSaga, fetchOrdersSaga} from './order';
export function* watchAuth(){
    //setting a listener to this action and then execute saga
    yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckState),
    takeEvery(actionTypes.INIT_INGRIDIENT, initIngridients),
    takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
    takeEvery(actionTypes.FETCH_ORDER_INIT, fetchOrdersSaga),
]);
}

