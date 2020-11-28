
import {withRouter, RouteComponentProps} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import {connect, useDispatch, useSelector} from 'react-redux';
import React, { Component } from 'react'
import * as action from '../../store/actions/order';


const Checkout = (props) => {


    const ings = useSelector((prevState)=> {
        return prevState.burgerBuilder.ingridients;
    });

    const purchased = useSelector((prevState)=> {
        return prevState.order.purchased;
    });


    const onCheckoutCancel = () =>{
        props.history.goBack();
    }
    
    const checkoutContinue = () =>{
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/"/>;
    if (ings){
        const purchasedRedirect = purchased ? <Redirect to="/"/>:null;
        summary = ( 
        <div>
            {purchasedRedirect}
            <CheckoutSummary
                ingredients={ings}
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
 


export default withRouter(Checkout);