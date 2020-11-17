import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import instance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';

class Orders extends Component {
    state={
        orders: [],
        loading: true
    }

    componentDidMount(){
        instance.get('/orders.json')
        .then(response => {

            const fetchedOrders = [];
            for (let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],//info del objecto
                    id:key//key del objecto
                });
            }
            this.setState({loading: false, orders: fetchedOrders});
        })
        .catch(error => {
            console.log(error);
            this.setState({loading: false});
        });

    }

    render() {
        return (
            <div>
                {this.state.orders.map((order) => { 
                    return <Order 
                        ingridients={order.ingridients}
                        key={order.id}
                        price={order.price}
                         />
                })}
            </div>
        )
    }
}


export default withErrorHandler(Orders, instance);
