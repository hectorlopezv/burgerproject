import React, { Component, useState } from 'react'
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import { connect } from 'react-redux';

interface ILayoutProps {
    isAuthenticated:boolean;
    children: React.ReactNode
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
    const [ShowSideDrawer, setShowSideDrawer] = useState(false);
    
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
                isAuth={props.isAuthenticated}
            />
            <SideDrawer 
                open={ShowSideDrawer} 
                closed={sideDrawerCloseHandler}
                isAuth={props.isAuthenticated}
                />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
     );
};


 const mapStateToProps = (state:any) => {
     return  {
         isAuthenticated: state.auth.token !== null
     }
 }

export default connect(mapStateToProps)(Layout);