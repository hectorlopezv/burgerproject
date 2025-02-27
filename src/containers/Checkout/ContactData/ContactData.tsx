/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-labels */
/* eslint-disable no-unused-labels */
import React, { Component, useState} from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import instance_orders from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import {connect, useSelector, useDispatch} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/WithErrorHandler';
import {purchaseBurgerStart, purchaseBurger} from '../../../store/actions/order';
import {checkValidity} from '../../../shared/utility';


interface IContactDataProps {
  ingredients:any;
  price: any;
  ings: any;
  onOrderBurger:any;
  loading: any;
  token:any;
  userId:any;
}

interface ArrStr {
  [key: string]: unknown|any; // Must accommodate all members

  [index: number]: unknown|any; // Can be a subset of string indexer

}

const x :ArrStr ={
  orderForm: {//config for each  data
        name: {
            elementType: 'input',//HTML type and config
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
              required: true
            },
            valid:false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
              required: true
            },
            valid:false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
              required: true,
              minLength: 5,
              maxLength: 5
            },
            valid:false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
              required: true
            },
            valid:false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
              required: true
            },
            valid:false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: 'fastest',
            validation: {},
            valid:true
        }
    }
}


const ContactData: React.FunctionComponent<IContactDataProps&RouteComponentProps> = (props) => {
  const [ContactData, setContactData] = useState({...x});
  const [FormIsValid, setFormIsValid] = useState(false);
  const dispatch = useDispatch();

  const onOrderBurger = (orderData:any, token:any) =>  dispatch(purchaseBurger(orderData, token));

  const ings = useSelector((stateCurrent:any)=>{
    return  stateCurrent.burgerBuilder.ingridients;
  });
  const price = useSelector((stateCurrent:any)=>{
    return stateCurrent.burgerBuilder.price;
  });

  const loading = useSelector((stateCurrent:any)=>{
    return stateCurrent.order.loading;
  });

  const token = useSelector((stateCurrent:any)=>{
    return stateCurrent.auth.token;
  });

  const userId = useSelector((stateCurrent:any) => {
    return stateCurrent.auth.userId;
  })


  const orderHandler = (event:any) => {
    event.preventDefault();

    //Get info from the Burger
      const formData:ArrStr = {};

      for (let formElementIdentifier in ContactData.orderForm){
        formData[formElementIdentifier] = ContactData.orderForm[formElementIdentifier].value;
      }

      const order_resume = {
          ingridients: ings,
          price: price,
          orderData: formData,
          userId:userId
      }

      onOrderBurger(order_resume, token);
  }


  const inputChangedHandler = (event:any, inputIdentifier:any) => {
    const updatedOrderForm = {...ContactData.orderForm}
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
    
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    
    updatedOrderForm[inputIdentifier] =  updatedFormElement;

    let formIsValid = true;
    //check all elements and if all valid property form its good to go
    for (let inputIndetifier in updatedOrderForm){
        formIsValid =  updatedOrderForm[inputIndetifier].valid && formIsValid;
    }

    setContactData((prevState:any)=>{
        return {orderForm: updatedOrderForm};
    });
    setFormIsValid(formIsValid);
  }

  const formElementsArray = [];
  for (let key in ContactData.orderForm){
      formElementsArray.push({
        id:key,
        config: ContactData.orderForm[key]
      });
  }

  let form = ( 
  <form onSubmit={orderHandler}>

    {
    formElementsArray.map((formElement:any) => {
        return <Input 
          key={formElement.id}
          shouldValidate={formElement.config.validation}
          invalid={!formElement.config.valid}
          elementType={formElement.config.elementType} 
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          touched={formElement.config.touched}
          changed={(event:any) => inputChangedHandler(event, formElement.id)}
        />
    })
  }     
    <Button btnType="Success" disabled={!FormIsValid} >ORDER</Button>
  </form>);

  if (loading){
    form = <Spinner/>
  }


  return (
    <div className="ContactData">
      <h4>Enter your Contact Data</h4>
       {form}
    </div>
  );
};



export default  withErrorHandler(withRouter(ContactData), instance_orders);