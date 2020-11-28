import React, { Component, useEffect } from 'react'
import Order from '../../components/Order/Order';
import instance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import {fetchOrders} from '../../store/actions/order';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {
    const {onFetchOrders, token, userId} = props;
    useEffect(() =>{
        onFetchOrders(token, userId);
    }, [onFetchOrders, token, userId]);

    let orders = <Spinner/>;
    if(!props.loading) {
        orders= (
            props.orders.map((order) => { 
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
    );
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : (token, userId) => dispatch(fetchOrders(token, userId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, instance))
