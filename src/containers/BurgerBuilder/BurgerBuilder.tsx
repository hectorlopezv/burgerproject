import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modali from '../../components/UI/Modali/Modali';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


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
      ingredients: IDevice;
      totalPrice: number;
      purcheseable:boolean;
      purchasing: boolean;
  }

  const INGRIDIENT_PRICES:IDevice = {
      salad: 0.5,
      cheese: 0.4,
      meat: 1.3,
      bacon: 0.7
  }

export default class BurgerBuilder extends Component<Props, State> {
    
    
    state:State = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }, 
        totalPrice: 4,
        purcheseable: false,
        purchasing: false

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
    purchaseContinueHandler = () =>{
        alert('you Continue');
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
        
        return (
                <Auxiliary>
                    <Modali
                        show={this.state.purchasing}
                        modalClosed={this.purchaseCancelHandler}
                    >
                        <OrderSummary 
                            ingredients={this.state.ingredients}
                            purchasedCanceled={this.purchaseCancelHandler}
                            purchasedContinue={this.purchaseContinueHandler}
                            price={this.state.totalPrice}
                            />
                    </Modali>
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
        )
    }
}
