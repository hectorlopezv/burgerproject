//listen to certain acttions and do something when they occur
import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {logoutSaga} from './auth';


export function* watchAuth(){
    //setting a listener to this action and then execute saga
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}

