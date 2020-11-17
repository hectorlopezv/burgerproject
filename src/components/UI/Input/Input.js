import React from 'react'
import './input.css';

const Input = (props) => {
    
    //check what our input really is
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
            className="InputElement" 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed}
            />        
            break;
        case ('textarea'):
            inputElement = <textarea 
            className="InputElement" 
            {...props.elementConfig}  
            value={props.value}
            onChange={props.changed}
            />
            break;
        
        case ('select'):
        inputElement = <select
        className="InputElement" 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed}
        >
            
            {props.elementConfig.options.map((option) => {
                return <option key={option.value} value={option.value}>
                    {option.displayValue}
                </option>
            })}
        </select>
        break;

        default:
            inputElement = <input 
            className="InputElement" {...props.elementConfig   }  
            value={props.value}/>
            break;
    }

    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;