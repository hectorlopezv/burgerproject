import React, { Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import instance_orders from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';

export interface IContactDataProps {
  ingredients:any;
  price: any;
}
interface ArrStr {
  [key: string]: unknown|any; // Must accommodate all members

  [index: number]: unknown|any; // Can be a subset of string indexer

}
class ContactData extends Component<IContactDataProps&RouteComponentProps> {

  state : ArrStr= {
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
            value: '',
            valid:true
        }
    },
    loading: false, 
    formIsValid: false
}

  checkValidity = (value:any, rules:any) => {
    //check validity and return boolean
    //rules is validation object
    let isValid = false;
    if(!rules){
      return true; 
    }
    if(rules.required){
      isValid = value.trim() !== '';

    }
    //add rules neccessary
    if (rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  orderHandler = (event:any) => {
    event.preventDefault();
    console.log(this.props);
      //Get info from the Burger
       this.setState({loading:true});
        const formData:ArrStr = {};

        for (let formElementIdentifier in this.state.orderForm){
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }


        const order_resume = {
            ingridients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        instance_orders.post('/orders.json', order_resume)
        .then(response => {
          console.log(response); 
          console.log(this.props);
          this.setState({loading:false, purchasing:false })
          this.props.history.push('/')
        })
        .catch(error => {console.log(error); this.setState({loading:false, purchasing:false})} );     
  }

  inputChangedHandler = (event:any, inputIdentifier:any) => {
    console.log(event.target.value);
    const updatedOrderForm = {...this.state.orderForm}
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
    
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    
    updatedOrderForm[inputIdentifier] =  updatedFormElement;
    console.log('element',updatedFormElement);
    console.log('form',updatedOrderForm); 

    let formIsValid = true;
    //check all elements and if all valid property form its good to go
    for (let inputIndetifier in updatedOrderForm){
        formIsValid =  updatedOrderForm[inputIndetifier].valid && formIsValid;

    }
    console.log('el form', formIsValid);

    this.setState((prevState:any)=>{
        return {orderForm: updatedOrderForm, formIsValid: formIsValid};
    })

  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm){
        formElementsArray.push({
          id:key,
          config: this.state.orderForm[key]
        });
    }

    let form = ( 
    <form onSubmit={this.orderHandler}>

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
            changed={(event:any) => this.inputChangedHandler(event, formElement.id)}
          />
      })
    }     
      <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
    </form>);

    if (this.state.loading){
      form = <Spinner/>
    }
    return (
      <div className="ContactData">
        <h4>Enter your Contact Data</h4>
         {form}
      </div>
    );
  }
}
export default  withRouter(ContactData);