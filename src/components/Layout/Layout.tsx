import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import ToolBar from '../Navigation/ToolBar/ToolBar';

export interface LayoutProps {
    
}
 
const Layout: React.FunctionComponent<LayoutProps> = (props) => {
    return ( 
        <Auxiliary>
            <ToolBar/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
     );
}
 
export default Layout;