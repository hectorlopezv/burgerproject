import React, { Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import instance_orders from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter, RouteComponentProps} from 'react-router-dom';
export interface IContactDataProps {
  ingredients:any;
  price: any;
}

class ContactData extends Component<IContactDataProps&RouteComponentProps> {
  
  state = {
    name: '',
    email: '',
    address: {
        street: '',
        postalCode: ''
    },
    loading: false
}


  orderHandler = (event:any) => {
    event.preventDefault();

      console.log(this.props.ingredients);


              //Get info from the Burger
       this.setState({loading:true});

        const order_resume = {
            ingridients: this.props.ingredients,
            price: this.props.price,
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
        .then(response => {
          console.log(response); 
          console.log(this.props);
          this.setState({loading:false, purchasing:false })
          this.props.history.push('/')
        })
        .catch(error => {console.log(error); this.setState({loading:false, purchasing:false})} );
        
  }

  render() {

    let form = ( <form action="">
    <input className="Input" type="text" name="name" placeholder="Your Name"/>
    <input className="Input" type="email" name="email" placeholder="Your email"/>
    <input className="Input" type="text" name="street" placeholder="street"/>
    <input className="Input" type="text" name="postal" placeholder="Postal Code"/>
    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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