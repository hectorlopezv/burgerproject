import React, { Component, useState, useEffect } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modali from '../../components/UI/Modali/Modali';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';

import instance_orders from '../../axios-orders';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    RouteProps,
    RouteComponentProps
  } from "react-router-dom";

//actions burger builder
import { addIngridient, removeIngridient, initIngridients} from '../../store/actions/burgerBuilder';
import {purchaseInit} from '../../store/actions/order';
import {setAuthRedirectPath} from '../../store/actions/auth';

//redux importing
import {connect} from 'react-redux';



interface IBurgerBuilderProps {
    ings:any;
    onIngredientAdded:any;
    onIngredientRemoved: any;
    onInitIngredient: any;
    totalPrice:any;
    error:any;
    isAuthenticated:any;
    onInitPurchase:any;
    onSetAuthRedirectPath:any;
    children: React.ReactNode;
}

interface IObjectKeys {
    [key: string]: number|boolean;
  }
  
interface IDevice extends IObjectKeys {
    salad: number;
    bacon: number;
    cheese: number;
    meat: number;
  }


interface State {
      ingredients?: IDevice | any;
      totalPrice?: number;
      purcheseable?:boolean;
      purchasing: boolean;
      loading?: boolean;
      error?: boolean;
  }

const BurgerBuilder: React.FunctionComponent<IBurgerBuilderProps & RouteComponentProps & State> = (props) => {
    
    const [Purchasing, setPurchasing] = useState(false);
    const {onInitIngredient} = props;
    useEffect(() => {
        onInitIngredient()
    }, [onInitIngredient])

    const purchaseHandler = () => {
        
        if(props.isAuthenticated){
            setPurchasing(true);
        }
        else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const updatePurchaseState = (updatedIngridients:any) => {

        const ingredients = {
            ...updatedIngridients
        }
        const sum = Object.values(ingredients);
        const total:any = sum.reduce((a, b)=> {return (a as number) + (b as number)});
       return total > 0;
    }

    const purchaseCancelHandler = () =>{
        setPurchasing(false);  
    }

    const purchaseContinueHandler = () =>{
        props.onInitPurchase();
        (props.history as any).push({
            pathname: '/checkout' });
    }

    const disabledInfo = {...props.ings};
        
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <=0;
    }

    let orderSummary = null;
    let burger = props.error ? <p>ingridients cant be loaded </p> : <Spinner/>;

    if(props.ings){
    
        burger = <Auxiliary>
            <Burger ingredients={props.ings}/>
            <BuildControls 
                ingridientAdded={props.onIngredientAdded}
                ingridientRemoved={props.onIngredientRemoved}
                disabledInfo={disabledInfo}
                price={props.totalPrice}
                purcheseable={updatePurchaseState(props.ings)}
                ordered={purchaseHandler}
                isAuth = {props.isAuthenticated}
                />
            </Auxiliary>
        orderSummary = <OrderSummary 
        ingredients={props.ings}
        purchasedCanceled={purchaseCancelHandler}
        purchasedContinue={purchaseContinueHandler}
        price={props.totalPrice}
        />

    }
    return (
        <Auxiliary>
            <Modali
                show={Purchasing}
                modalClosed={purchaseCancelHandler}
            >
                {orderSummary}
            </Modali>
            {burger}
               
        </Auxiliary>
    );
};

//disptachtoprops and statetoprops REDUX
const mapStateToProps = (state:any) => {
    
    return {
        ings: state.burgerBuilder.ingridients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onIngredientAdded: (ingName:any) => dispatch(addIngridient(ingName)),
        onInitIngredient: () => dispatch(initIngridients()),
        onIngredientRemoved: (ingName:any) => dispatch(removeIngridient(ingName)),
        onInitPurchase: () => dispatch(purchaseInit()),
        onSetAuthRedirectPath: (path:any) => dispatch(setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler( BurgerBuilder, instance_orders ));