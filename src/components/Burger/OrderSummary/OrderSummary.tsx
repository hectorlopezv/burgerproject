import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

export interface OrderSummaryProps {
    ingredients:any;
    purchasedCanceled: any;
    purchasedContinue: any;
}
 
const OrderSummary: React.FunctionComponent<OrderSummaryProps> = (props) => {
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
}
 
export default OrderSummary;