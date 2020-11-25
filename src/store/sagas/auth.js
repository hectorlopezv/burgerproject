import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes';
import { 
    logoutSucced, 
    logout, 
    authStart, 
    authSuccess,
    setAuthRedirectPath,
    checkAuthTimeout,
    authFail
} from '../actions/auth';
import axios from 'axios';

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

export function* authSaga (action){
    yield put(authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_vqY3-lhGbHR_I0vsarpneqivOnSwMFM`;
    if(action.isSignup){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_vqY3-lhGbHR_I0vsarpneqivOnSwMFM'; 
    }

    try {
        const response = yield axios.post(url, authData)//wait for promise to resolve
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);

        yield window.localStorage.setItem('token', response.data.idToken);
        yield window.localStorage.setItem('expirationDate', expirationDate);
        yield window.localStorage.setItem('userId', response.data.localId);

        yield put(authSuccess(response.data));
        yield put(setAuthRedirectPath('/'));
        yield put(checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        put(authFail(error))
    }
}

export function* authCheckState(action){
        
    const token = yield window.localStorage.getItem('token');
       if(!token) {
          yield  put(logout());
        }else{
            const expirationDate = yield new Date(window.localStorage.getItem('expirationDate'));
            const token = yield window.localStorage.getItem('token');
            const userId = yield localStorage.getItem('userId');
            yield put(authSuccess(token, userId));   
            yield put(checkAuthTimeout( new Date().getSeconds() - expirationDate.getSeconds() ));  
        }
}

