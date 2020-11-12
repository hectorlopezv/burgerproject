import React from 'react'
import classes from './ToolBar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DraweToogle from '../SideDrawer/DrawerToogle/DrawerToogle';

export interface ToolBarProps {
    open:any;
}
 
const ToolBar: React.FunctionComponent<ToolBarProps> = (props) => {
    return (  

        <header className={classes.Toolbar}>
            <DraweToogle clicked={props.open}/>
            <Logo height="80%"/>
            <nav className={classes.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    );
}
 
export default ToolBar;