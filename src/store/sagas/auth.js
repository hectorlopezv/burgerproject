import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes';


//A generator
export function* logoutSaga (action) {
    yield window.localStorage.removeItem('token');
    yield window.localStorage.removeItem('expirationTime');
    yield window.localStorage.removeItem('userId');
    yield put({
        type: actionTypes.AUTH_LOGOUT//execute that action
    });
}



