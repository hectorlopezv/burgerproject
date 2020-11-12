import React from 'react'
import classes from './NavigationItem.module.css';


export interface NavigationItemProps {
    active:any;
    link:any;
}
 
const NavigationItem: React.FunctionComponent<NavigationItemProps> = (props) => {
    const class_link = props.active? classes.active : 'null';
    return (  
        <li className={classes.NavigationItem}>
            <a href={props.link} className={class_link}>{props.children}</a>
        </li>
    );
}
 
export default NavigationItem;