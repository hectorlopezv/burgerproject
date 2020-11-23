import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

export interface NavigationItemsProps {
    isAuth:any;
}
 
const NavigationItems: React.FunctionComponent<NavigationItemsProps> = (props) => {
    
    // isSignIn ? Logout : authenticate
    let log = <NavigationItem link='/auth' >Authenticate</NavigationItem>
    if(props.isAuth) {
        log = <NavigationItem link='/logout' >LogOut</NavigationItem>
    }
    return (  
        <ul className={classes.NavigationItems }>
            <NavigationItem link='/' >Burger Builder</NavigationItem>
            <NavigationItem link='/orders' >Orders</NavigationItem>
            {log}
        </ul>
    );
}
 
export default NavigationItems;