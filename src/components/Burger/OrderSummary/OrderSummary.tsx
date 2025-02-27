import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';


interface IOrderSummaryProps {
    ingredients:any;
    purchasedCanceled: any;
    purchasedContinue: any;
    price:any;
}

const OrderSummary: React.FunctionComponent<IOrderSummaryProps> = (props) => {
    const transformedIngridientes = Object.entries(props.ingredients);
    const list_checkout = transformedIngridientes.map((ingridient, index) => {
        return <li key={ingridient[0] + index + ingridient[1]}>
            <span style={{textTransform:"capitalize"}}>{ingridient[0]}</span>:{ingridient[1]}
        </li>
    });
    return ( 
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {list_checkout}
            </ul>
            <p>Continue to Checkout?</p>
            <p><strong>Total Price</strong>: {props.price.toFixed(2)}</p>
            <Button 
                btnType='Danger'
                clicked={props.purchasedCanceled}
            >Cancel</Button>
            <Button 
                btnType='Success'
                clicked={props.purchasedContinue}
                >Continue</Button>
        </Auxiliary>

     );
};

export default OrderSummary;


