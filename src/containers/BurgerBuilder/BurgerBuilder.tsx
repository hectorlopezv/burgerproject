import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

interface Props {
    
}

interface IObjectKeys {
    [key: string]: number;
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
        totalPrice: 4

    }
    
    componentDidMount(){

    }
    addIngridientHandler = (type:string) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngridients = {...this.state.ingredients};//updating should making a copy

        updatedIngridients[type] = updatedCount;
        
        const priceAddition = INGRIDIENT_PRICES[type];

        const oldPrice = this.state.totalPrice;

        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngridients})

    }
    render() {
        return (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingridientAdded={this.addIngridientHandler}
                    />
                </Auxiliary>
        )
    }
}
