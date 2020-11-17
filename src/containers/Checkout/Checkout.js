
import {withRouter, RouteComponentProps} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux';
import React, { Component } from 'react'

class Checkout extends Component {
    
    onCheckoutCancel = () =>{
        this.props.history.goBack();
    }
    checkoutContinue = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    componentDidMount() {


      
    }

    render() {
        return (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        onCheckoutCancel={this.onCheckoutCancel}
                        checkoutContinue={this.checkoutContinue}
                    />

                    <Route //Nested Routing
                     path={this.props.match.path + '/contact-data'}
                     component={ContactData}
                     />

                </div>
        )
    }
}


const mapStateToProps = state => {
    return {//we only read the props..... no updates
        ings: state.ingridients
    }
}

export default connect(mapStateToProps)(withRouter(Checkout));