import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import ToolBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

export interface LayoutProps {
    
}
 
const Layout: React.FunctionComponent<LayoutProps> = (props) => {
    return ( 
        <Auxiliary>
            <ToolBar/>
            <SideDrawer/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
     );
}
 
export default Layout;