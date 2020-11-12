import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';

import classes from './SideDrawer.module.css';

export interface SideDrawerProps {
    
}
 
const SideDrawer: React.FunctionComponent<SideDrawerProps> = (props) => {
    return (  

        <div className={classes.SideDrawer}>
            <Logo height="11%"/>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
}
 
export default SideDrawer;