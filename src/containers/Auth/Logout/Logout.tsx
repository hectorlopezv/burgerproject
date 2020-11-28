import React, { Component, useState, useEffect, useCallback } from 'react'
import * as actions from '../../../store/actions/auth';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Redirect} from 'react-router-dom';


interface ILogoutProps {
    onLogout:any;
}

const Logout: React.FunctionComponent<ILogoutProps> = (props) => {

    const dispatch = useDispatch();

    const onLogout =  useCallback(() => dispatch(actions.logout()), [dispatch]);

    useEffect(() =>{
        onLogout();
    }, [onLogout]);

    return (
        <Redirect to="/"/>
    );
};


export default Logout;