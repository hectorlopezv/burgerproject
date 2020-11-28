import React, { Component, useState, useEffect, useCallback } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modali from '../../components/UI/Modali/Modali';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import {rootReducer} from '../../index';
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
import {connect, useDispatch, useSelector} from 'react-redux';



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
    const dispatch = useDispatch();//split our store state in multiple state
 
    const ings = useSelector((stateCurrent:any) => {
        return stateCurrent.burgerBuilder.ingridients;
    });

    const totalPrice = useSelector((stateCurrent:any) => {
        return stateCurrent.burgerBuilder.totalPrice;
    });

    const error = useSelector((stateCurrent:any) => {
        return stateCurrent.burgerBuilder.error;
    });

    const isAuthenticated = useSelector((stateCurrent:any) => {
        return stateCurrent.auth.token !== null;
    }); 


    //functions are created always when executed
    const onIngredientAdded =  (ingName:any) => dispatch(addIngridient(ingName));
    const onInitIngredient = useCallback( () => dispatch(initIngridients()), [dispatch]);
    const onIngredientRemoved= (ingName:any) => dispatch(removeIngridient(ingName));
    const onInitPurchase = () => dispatch(purchaseInit());
    const onSetAuthRedirectPath= (path:any) => dispatch(setAuthRedirectPath(path));




  
    useEffect(() => {
        onInitIngredient()
    }, [onInitIngredient])

    const purchaseHandler = () => {
        
        if(isAuthenticated){
            setPurchasing(true);
        }
        else {
            onSetAuthRedirectPath('/checkout');
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
        onInitPurchase();
        (props.history as any).push({
            pathname: '/checkout' });
    }

    const disabledInfo = {...ings};
        
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <=0;
    }

    let orderSummary = null;
    let burger = error ? <p>ingridients cant be loaded </p> : <Spinner/>;

    if(ings){
    
        burger = <Auxiliary>
            <Burger ingredients={ings}/>
            <BuildControls 
                ingridientAdded={onIngredientAdded}
                ingridientRemoved={onIngredientRemoved}
                disabledInfo={disabledInfo}
                price={totalPrice}
                purcheseable={updatePurchaseState(ings)}
                ordered={purchaseHandler}
                isAuth = {isAuthenticated}
                />
            </Auxiliary>
        orderSummary = <OrderSummary 
        ingredients={ings}
        purchasedCanceled={purchaseCancelHandler}
        purchasedContinue={purchaseContinueHandler}
        price={totalPrice}
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



export default WithErrorHandler( BurgerBuilder, instance_orders );