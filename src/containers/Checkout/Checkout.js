
import {withRouter, RouteComponentProps} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux';
import React, { Component } from 'react'
import * as action from '../../store/actions/order';


const Checkout = (props) => {
    const onCheckoutCancel = () =>{
        props.history.goBack();
    }
    
    const checkoutContinue = () =>{
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/"/>;
    if (props.ings){
        const purchasedRedirect = props.purchased ? <Redirect to="/"/>:null;
        summary = ( 
        <div>
            {purchasedRedirect}
            <CheckoutSummary
                ingredients={props.ings}
                onCheckoutCancel={onCheckoutCancel}
                checkoutContinue={checkoutContinue}
            />
            <Route //Nested Routing
                path={props.match.path + '/contact-data'}
                component={ContactData}
            />
        </div>);
    }
    return (
            summary
    )
}
 
const mapStateToProps = state => {
    return {//we only read the props..... no updates
        ings: state.burgerBuilder.ingridients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(withRouter(Checkout));