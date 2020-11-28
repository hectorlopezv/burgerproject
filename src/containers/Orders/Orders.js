import React, { Component, useEffect, useCallback } from 'react'
import Order from '../../components/Order/Order';
import instance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import {fetchOrders} from '../../store/actions/order';
import {connect, useSelector, useDispatch} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {
 
    const dispatch = useDispatch();
    const onFetchOrders = useCallback((token, userId) => dispatch(fetchOrders(token, userId)), [dispatch]);

    
    const orders = useSelector((stateCurrent)=> {
        return stateCurrent.order.orders;
    });

    const loading = useSelector((stateCurrent)=>{
        return stateCurrent.order.loading;
    });

    const token = useSelector((stateCurrent)=>{
        return stateCurrent.auth.token;
    });

    const userId = useSelector((stateCurrent)=>{
        return stateCurrent.auth.userId;
    })

    useEffect(() =>{
        onFetchOrders(token, userId);
    }, [onFetchOrders, token, userId]);

    let orders_= <Spinner/>;
    if(!loading) {
        orders_ = (
            orders.map((order_) => { 
            return <Order 
                ingridients={order_.ingridients}
                key={order_.id}
                price={order_.price}
                 />
        }))
    }
    return (
        <div>
                {orders_}
        </div>
    );
}




export default withErrorHandler(Orders, instance);
