import React, { Component, useState } from 'react'
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import { connect, useSelector } from 'react-redux';

interface ILayoutProps {
    isAuthenticated:boolean;
    children: React.ReactNode
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
    const [ShowSideDrawer, setShowSideDrawer] = useState(false);
    const  isAuthenticated = useSelector((stateCurrent:any) => {
        return stateCurrent.auth.token !== null;
    });

    const sideDrawerCloseHandler = () =>{
        setShowSideDrawer(false);
    }

    const sideDrawerOpenHandler = () =>{
        setShowSideDrawer(!ShowSideDrawer);
    }

    return ( 
        <Auxiliary>
            <ToolBar 
                open={sideDrawerOpenHandler}
                isAuth={isAuthenticated}
            />
            <SideDrawer 
                open={ShowSideDrawer} 
                closed={sideDrawerCloseHandler}
                isAuth={isAuthenticated}
                />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
     );
};


export default Layout;