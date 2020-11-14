import React from 'react'
import classes from './Spinner.module.css';


export interface SpinnerProps {
    
}
 
const Spinner: React.FunctionComponent<SpinnerProps> = () => {
    return (  <div className={classes.loader}>Loading...</div>);
}
 
export default Spinner;