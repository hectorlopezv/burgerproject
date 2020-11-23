import React, { Component } from 'react'
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



interface Props {
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

  const INGRIDIENT_PRICES:IDevice = {
      salad: 0.5,
      cheese: 0.4,
      meat: 1.3,
      bacon: 0.7
  }

 class BurgerBuilder extends Component<Props & RouteComponentProps, State > {
    
    
    state:State = {
        
        purchasing: false, 
    }

    componentDidMount(){
        this.props.onInitIngredient()
    }

    purchaseHandler(){
        
        if(this.props.isAuthenticated){
            //purchasing only if authenticated
            this.setState({purchasing: true});
        }
        else {
            //redirect to checkout if user authenticates when using burgerbuilder!
            this.props.onSetAuthRedirectPath('/checkout');
            
            this.props.history.push('/auth');
        }

    }
    
    updatePurchaseState(updatedIngridients:any){

        const ingredients = {
            ...updatedIngridients
        }
        const sum = Object.values(updatedIngridients);
        const total:any = sum.reduce((a, b)=> {return (a as number) + (b as number)});
       // this.setState({purcheseable: total > 0});
       return total > 0;
    }




    purchaseCancelHandler =() =>{

      
        this.setState({purchasing: false});    
    }




    purchaseContinueHandler = () =>{
        this.props.onInitPurchase();
        (this.props.history as any).push({
            pathname: '/checkout' });
    }


  

    render() {
        const disabledInfo = {...this.props.ings};
        console.log(this.props.ings);

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        }


        let orderSummary = null;
        let burger = this.props.error ? <p>ingridients cant be loaded </p> : <Spinner/>;

        if(this.props.ings){
            console.log('entro ')
            burger = <Auxiliary>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                    ingridientAdded={this.props.onIngredientAdded}
                    ingridientRemoved={this.props.onIngredientRemoved}
                    disabledInfo={disabledInfo}
                    price={this.props.totalPrice}
                    purcheseable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler.bind(this)}
                    isAuth = {this.props.isAuthenticated}
                    />
                </Auxiliary>
            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            purchasedCanceled={this.purchaseCancelHandler}
            purchasedContinue={this.purchaseContinueHandler}
            price={this.props.totalPrice}
            />
    
        }


        
        return (
                <Auxiliary>
                    <Modali
                        show={this.state.purchasing}
                        modalClosed={this.purchaseCancelHandler}
                    >
                        {orderSummary}
                    </Modali>
                    {burger}
                       
                </Auxiliary>
        )
    }
}


//disptachtoprops and statetoprops REDUX
const mapStateToProps = (state:any) => {
    //console.log(state);
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