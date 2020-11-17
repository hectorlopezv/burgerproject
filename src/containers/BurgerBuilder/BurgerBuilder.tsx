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

//redux importing
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

interface Props {
    ings:any;
    onIngredientAdded:any;
    onIngredientRemoved: any;
    totalPrice:any;
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
      purcheseable:boolean;
      purchasing: boolean;
      loading: boolean;
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




    purchaseCancelHandler =() =>{
        this.setState({purchasing: false});    
    }


    componentDidMount(){
        //instance_orders.get('/ingridients.json')
        //.then(response => {
         //   console.log(response);
          //  const {salad, bacon, meat, cheese} = response.data;
           // console.log(salad, bacon, cheese);
            //this.setState({ingredients:{
             //   salad: salad,
              //  cheese: cheese,
              ///  meat: meat,
               // bacon: bacon
            //}});
        //})
        //.catch(error => {
         //   console.log(error);
        //});
    }


    purchaseContinueHandler = () =>{

        console.log('armando al quert', this.state.ingredients);
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]) + '&');
        }

        queryParams.push('price=' + this.state.totalPrice);

        (this.props.history as any).push({
            pathname: '/checkout',
            search: '?' + queryParams.join('').slice(0, -1)
        });
    }


  

    render() {
        const disabledInfo = {...this.props.ings};
        console.log(this.props.ings);

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        }


        let orderSummary = null;
        let burger = <Spinner/>;

        if(this.props.ings){
            console.log('entro ')
            burger = <Auxiliary>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                    ingridientAdded={this.props.onIngredientAdded}
                    ingridientRemoved={this.props.onIngredientRemoved}
                    disabledInfo={disabledInfo}
                    price={this.props.totalPrice}
                    purcheseable={this.state.purcheseable}
                    ordered={this.purchaseHandler.bind(this)}
                    />
                </Auxiliary>
            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            purchasedCanceled={this.purchaseCancelHandler}
            purchasedContinue={this.purchaseContinueHandler}
            price={this.props.totalPrice}
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


//disptachtoprops and statetoprops REDUX
const mapStateToProps = (state:any) => {
    //console.log(state);
    return {
        ings: state.ingridients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onIngredientAdded: (ingName:any) => dispatch({
            type: actionTypes.ADD_INGRIDIENT, 
            ingridientName:ingName
        }),
        onIngredientRemoved: (ingName:any) => dispatch({
            type: actionTypes.REMOVE_INGRIDIENT, 
            ingridientName:ingName
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler( BurgerBuilder, instance_orders ));