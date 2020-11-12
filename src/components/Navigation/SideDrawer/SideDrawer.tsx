import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'

import classes from './SideDrawer.module.css';

export interface SideDrawerProps {
    closed:any;
    open:any;
}
 
const SideDrawer: React.FunctionComponent<SideDrawerProps> = (props) => {
    const sideDraweCssState = props.open? classes.Open: classes.Close;
    const class_css = [classes.SideDrawer, sideDraweCssState].join(' ');
    
    return (  
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={class_css}>
                <Logo height="11%"/>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>

    );
}
 
export default SideDrawer;