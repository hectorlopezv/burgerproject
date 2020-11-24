import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes';
import { logoutSucced, logout } from '../actions/auth';


//A generator
export function* logoutSaga (action) {
    yield window.localStorage.removeItem('token');
    yield window.localStorage.removeItem('expirationTime');
    yield window.localStorage.removeItem('userId');
    yield put(logoutSucced());
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime);
    yield put(logout());
}



