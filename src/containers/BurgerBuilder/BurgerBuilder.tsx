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


interface Props {
    
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
      ingredients: IDevice | any;
      totalPrice: number;
      purcheseable:boolean;
      purchasing: boolean;
      loading: boolean;
  }

  const INGRIDIENT_PRICES:IDevice = {
      salad: 0.5,
      cheese: 0.4,
      meat: 1.3,
      bacon: 0.7
  }

 class BurgerBuilder extends Component<Props & RouteComponentProps, State > {
    
    
    state:State = {
        ingredients : null, 
        totalPrice: 4,
        purcheseable: false,
        purchasing: false,
        loading: false

    }
    purchaseHandler(){
        this.setState({purchasing: true});
    }
    
    updatePurchaseState(updatedIngridients:any){

        const ingredients = {
            ...updatedIngridients
        }
        const sum = Object.values(updatedIngridients);
        const total:any = sum.reduce((a, b)=> {return (a as number) + (b as number)});
        this.setState({purcheseable: total > 0});
    }


    removeIngridientHandler = (type:string) => {

        const oldCount = this.state.ingredients[type];

        const updatedCount = oldCount >= 1 ? (oldCount as number) - 1 : 0;

        const updatedIngridients = {...this.state.ingredients};//updating should making a copy

        updatedIngridients[type] = updatedCount;
        
        const priceAddition = INGRIDIENT_PRICES[type];

        const oldPrice = this.state.totalPrice;

        const newPrice = oldPrice - (priceAddition as number);

        this.setState({totalPrice: newPrice, ingredients: updatedIngridients})
        this.updatePurchaseState(updatedIngridients);
    }

    purchaseCancelHandler =() =>{
        this.setState({purchasing: false});    
    }


    componentDidMount(){
        instance_orders.get('/ingridients.json')
        .then(response => {
            console.log(response);
            const {salad, bacon, meat, cheese} = response.data;
            console.log(salad, bacon, cheese);
            this.setState({ingredients:{
                salad: salad,
                cheese: cheese,
                meat: meat,
                bacon: bacon
            }});
        })
        .catch(error => {
            console.log(error);
        });
    }


    purchaseContinueHandler = () =>{
        //Get info from the Burger
/*        this.setState({loading:true});

        const order_resume = {
            ingridients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "hectorcito andres",
                address: {
                    street: "Test street",
                    zipCode: "0008100",
                    country: "Colombia"
                },
                email: "test@test.com"
            },
            deliveryMethod: 'fastest'
        }


        instance_orders.post('/orders.json', order_resume)
        .then(response => {console.log(response); this.setState({loading:false, purchasing:false })} )
        .catch(error => {console.log(error); this.setState({loading:false, purchasing:false})} );
        */
        console.log('armando al quert', this.state.ingredients);
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]) + '&');
        }

        (this.props.history as any).push({
            pathname: '/checkout',
            search: '?' + queryParams.join('').slice(0, -1)
        });
    }


    addIngridientHandler = (type:string) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = (oldCount as number) + 1;

        const updatedIngridients = {...this.state.ingredients};//updating should making a copy

        updatedIngridients[type] = updatedCount;
        
        const priceAddition = INGRIDIENT_PRICES[type];

        const oldPrice = this.state.totalPrice;

        const newPrice = oldPrice + (priceAddition as number);

        this.setState({totalPrice: newPrice, ingredients: updatedIngridients})
        this.updatePurchaseState(updatedIngridients);

    }

    render() {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        let orderSummary = null;
        let burger = <Spinner/>;




        
        if(this.state.ingredients){
            console.log('entro ')
            burger = <Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingridientAdded={this.addIngridientHandler}
                    ingridientRemoved={this.removeIngridientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purcheseable={this.state.purcheseable}
                    ordered={this.purchaseHandler.bind(this)}
                    />
                </Auxiliary>
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            purchasedCanceled={this.purchaseCancelHandler}
            purchasedContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}
            />
    
        }

        if(this.state.loading){
            orderSummary = <Spinner/>    
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


export default WithErrorHandler( BurgerBuilder, instance_orders );