import React, { Component, useState, useEffect } from 'react'
import * as actions from '../../../store/actions/auth';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';


interface ILogoutProps {
    onLogout:any;
}

const Logout: React.FunctionComponent<ILogoutProps> = (props) => {

    useEffect(() =>{
        props.onLogout();
    }, []);

    return (
        <Redirect to="/"/>
    );
};

const mapDispatchToProps = (dispatch:any) => {

    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);