import React from 'react'
import classes from './NavigationItem.module.css';


export interface NavigationItemProps {
    active:any;
    link:any;
}
 
const NavigationItem: React.FunctionComponent<NavigationItemProps> = (props) => {
    return (  
        <li className={classes.NavigationItem}>
            <a href={props.link} className={props.active? classes.active : null}>{props.children}</a>
        </li>
    );
}
 
export default NavigationItem;