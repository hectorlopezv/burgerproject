import React, { Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css'
export interface IContactDataProps {
}

export default class ContactData extends React.Component<IContactDataProps> {
  public render() {
    return (
      <div className="ContactData">
        <h4>Enter your Contact Data</h4>
        <form action="">
            <input className="Input" type="text" name="name" placeholder="Your Name"/>
            <input className="Input" type="email" name="email" placeholder="Your email"/>
            <input className="Input" type="text" name="street" placeholder="street"/>
            <input className="Input" type="text" name="postal" placeholder="Postal Code"/>
            <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}
