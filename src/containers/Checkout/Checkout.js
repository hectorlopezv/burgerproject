
import {withRouter, RouteComponentProps} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux';
import React, { Component } from 'react'
import * as action from '../../store/actions/order';

class Checkout extends Component {
    
    onCheckoutCancel = () =>{
        this.props.history.goBack();
    }
    checkoutContinue = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

 

    render() {

        let summary = <Redirect to="/"/>;
        if (this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/>:null;
            summary = ( 
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={this.props.ings}
                    onCheckoutCancel={this.onCheckoutCancel}
                    checkoutContinue={this.checkoutContinue}
                />
                <Route //Nested Routing
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>);
        }
        return (
                    summary
        )
    }
}


const mapStateToProps = state => {
    return {//we only read the props..... no updates
        ings: state.burgerBuilder.ingridients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(withRouter(Checkout));