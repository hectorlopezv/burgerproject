import React from 'react'
import classes from './DrawerToogle.module.css';


export interface DraweToogleProps {
    clicked:any;
}
 
const DraweToogle: React.FunctionComponent<DraweToogleProps> = (props) => {
    return (  
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
 
export default DraweToogle;