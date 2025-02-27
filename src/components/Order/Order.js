import React from 'react';
import './Order.css';

const Order = (props) => {

    const ingridients = [];
    for (let ingridientName in props.ingridients){
        ingridients.push({
                name: ingridientName,
                amount:props.ingridients[ingridientName]
            });
    }
    const ingridientOutput = ingridients.map((ig) => {
        return <span 
        style={{
            textTransform:'capitalize', 
            display: 'inline-block', 
            margin: '0 8px', 
            border: '1px solid #ccc', 
            padding: '5px'}}
        key={ig.name}>{ig.name}  ({ig.amount})</span>
    });

    return (  
        <div className="Order">

        <p>Ingridients:  {ingridientOutput}</p>
            <p>Price: <strong>USD {Number(props.price).toFixed(2)}</strong></p>
        </div>
    );
}
 
export default Order;