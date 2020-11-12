import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

export interface NavigationItemsProps {
    
}
 
const NavigationItems: React.FunctionComponent<NavigationItemsProps> = (props) => {
    return (  
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' active>Burger Builder</NavigationItem>
        </ul>
    );
}
 
export default NavigationItems;