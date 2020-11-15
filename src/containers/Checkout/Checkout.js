
import {withRouter} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


import React, { Component } from 'react'

class Checkout extends Component {
    state = {
        ingredients: {
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }
    }
    onCheckoutCancel = () =>{
        this.props.history.goBack();
    }
    checkoutContinue = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    componentDidMount() {
        console.log(this.props.location)
        const query = new URLSearchParams(this.props.location.search);


        const ingridients = {}
        for (let param of query.entries()) {
            //['salada' , 1]
            ingridients[param[0]] = +param[1];
        }
        console.log(ingridients);
        this.setState({ingredients: ingridients});
    }

    render() {
        return (
                <div>
                    <CheckoutSummary
                        ingredients={this.state.ingredients}
                        onCheckoutCancel={this.onCheckoutCancel}
                        checkoutContinue={this.checkoutContinue}
                    />
                </div>
        )
    }
}




export default withRouter(Checkout);