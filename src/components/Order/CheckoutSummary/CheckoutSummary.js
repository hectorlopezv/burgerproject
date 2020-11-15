import React from 'react'
import classes from './CheckoutSummary.module.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import {RouteComponentProps, withRouter} from 'react-router-dom';


const CheckoutSummary = (props) => {

    return ( 
        <div className={classes.CheckoutSummary}>
        <h1>We Hope its tastes well!</h1>
        <div style={{width: '100%', margin: 'auto'}}>
            <Burger 
                ingredients={props.ingredients}
            />
        </div>
        <Button btnType="Danger" clicked={props.onCheckoutCancel}>Cancel</Button>
        <Button btnType="Success" clicked={props.checkoutContinue}>Continue</Button>
    </div>      
     );
}
 
export default withRouter(CheckoutSummary);


