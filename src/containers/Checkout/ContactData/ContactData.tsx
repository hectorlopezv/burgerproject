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
            value: 'Your Name'
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: 'Your Street'
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: 'Your ZipCode'
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: 'Your Country'
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: 'Your Email'
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: 'your Delivery Method'
        }
    },
    loading: false
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
    updatedOrderForm[inputIdentifier] =  updatedFormElement;
    this.setState({orderForm: updatedOrderForm});
    
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
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event:any) => this.inputChangedHandler(event, formElement.id)}
          />
      })
    }     
      <Button btnType="Success" >ORDER</Button>
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