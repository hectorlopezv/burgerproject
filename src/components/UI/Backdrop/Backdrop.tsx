import React from 'react';
import classes from './Backdrop.module.css';

export interface BackdropProps {
  show:any;
  clicked:any;
}
 
const Backdrop: React.FunctionComponent<BackdropProps> = (props) => {
  return (  props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div>: null);

}
 
export default Backdrop;
