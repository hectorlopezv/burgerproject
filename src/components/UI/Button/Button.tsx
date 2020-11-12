import React from 'react'
import classes from './Button.module.css';


export interface ButtonProps {
    btnType:string;
    clicked?:any;
}
 
const Button: React.FunctionComponent<ButtonProps> = (props) => {
    return (  
        <button 
            className={[classes.Button, classes[props.btnType]].join(' ')}
            onClick={props.clicked}
        >
            {props.children}
        </button>
    );
}
 
export default Button;