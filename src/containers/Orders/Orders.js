import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import instance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import {fetchOrders} from '../../store/actions/order';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {


    componentDidMount(){
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let orders = <Spinner/>;
        if(!this.props.loading) {
            orders= (
                this.props.orders.map((order) => { 
                return <Order 
                    ingridients={order.ingridients}
                    key={order.id}
                    price={order.price}
                     />
            }))
        }
        return (
            <div>
                    {orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : (token) => dispatch(fetchOrders(token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, instance))
