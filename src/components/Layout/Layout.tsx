import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';

export interface LayoutProps {
    
}
 
const Layout: React.FunctionComponent<LayoutProps> = (props) => {
    return ( 
        <Auxiliary>
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
     );
}
 
export default Layout;