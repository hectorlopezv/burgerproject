import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';


interface Props {
    ingredients:any;
    purchasedCanceled: any;
    purchasedContinue: any;
    price:any;
}
interface State {
    
}

export default class OrderSummary extends Component<Props, State> {
    state = {}

    //this could a fuinctional component using React.memo
    componentDidUpdate(){

    }


    
    render() {
        const transformedIngridientes = Object.entries(this.props.ingredients);
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
                <p><strong>Total Price</strong>: {this.props.price.toFixed(2)}</p>
                <Button 
                    btnType='Danger'
                    clicked={this.props.purchasedCanceled}
                >Cancel</Button>
    
                <Button 
                    btnType='Success'
                    clicked={this.props.purchasedContinue}
                    >Continue</Button>
            </Auxiliary>
    
         );
    }
}

