import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

export interface NavigationItemsProps {
    
}
 
const NavigationItems: React.FunctionComponent<NavigationItemsProps> = (props) => {
    return (  
        <ul className={classes.NavigationItems }>
            <NavigationItem link='/' active={true}>Burger Builder</NavigationItem>
            <NavigationItem link='/' active={true}>CheckSito</NavigationItem>
        </ul>
    );
}
 
export default NavigationItems;