
import {withRouter, RouteComponentProps} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';


import React, { Component } from 'react'

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }
    
    onCheckoutCancel = () =>{
        this.props.history.goBack();
    }
    checkoutContinue = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    componentWillMount() {
        console.log(this.props.location)
        const query = new URLSearchParams(this.props.location.search);

        let price=0;
        const ingridients = {}
        for (let param of query.entries()) {
            //['salada' , 1]
            if (param[0] === 'price'){
                price = +param[1];
            }
            else{
                ingridients[param[0]] = +param[1];
            }

        }

        console.log('el price', price);
        this.setState({ingredients: ingridients, totalPrice: price});
    }

    render() {
        return (
                <div>
                    <CheckoutSummary
                        ingredients={this.state.ingredients}
                        onCheckoutCancel={this.onCheckoutCancel}
                        checkoutContinue={this.checkoutContinue}
                    />

                    <Route //Nested Routing
                     path={this.props.match.path + '/contact-data'}
                     render={()=> (<ContactData
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        />)}
                     />
                </div>
        )
    }
}




export default withRouter(Checkout);