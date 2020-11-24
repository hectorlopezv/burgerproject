import {authReducer} from './auth';
import * as actionTypes from '../actions/actionTypes';


describe('auth reducer', () =>{

    it('should return initial state', () =>{
        expect(authReducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });


    it('should store the token upon login', () => {
        expect(authReducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {type: actionTypes.AUTH_SUCCESS, 
            idToken: 'some-token', 
            userId: 'some-user'})).toEqual({
                token: 'some-token',
                userId: 'some-user',
                error: null,
                loading: false,
                authRedirectPath: '/'
            });
    })






})