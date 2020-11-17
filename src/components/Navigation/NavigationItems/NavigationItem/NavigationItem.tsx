import React from 'react'
import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';

export interface NavigationItemProps {

    link:any;
}
 
const NavigationItem: React.FunctionComponent<NavigationItemProps> = (props) => {

    return (  
        <li className={classes.NavigationItem}>
            <NavLink exact activeClassName={classes.active} 
            to={props.link} >{props.children}</NavLink>
        </li>
    );
}
 
export default NavigationItem;