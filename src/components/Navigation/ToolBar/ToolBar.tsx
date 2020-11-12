import React from 'react'
import classes from './ToolBar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

export interface ToolBarProps {
    
}
 
const ToolBar: React.FunctionComponent<ToolBarProps> = () => {
    return (  

        <header className={classes.Toolbar}>
            <div>Menu</div>
            <Logo height="80%"/>
            <nav className={classes.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    );
}
 
export default ToolBar;