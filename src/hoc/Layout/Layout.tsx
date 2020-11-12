import React, { Component } from 'react'
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';




interface Props {
    
}
interface State {
    
}

export default class Layout extends Component<Props, State> {
    state = {
        showSideDrawer: false
    }
    sideDrawerCloseHandler = () =>{
        this.setState({ showSideDrawer:false})
    }

    sideDrawerOpenHandler = () =>{
        this.setState((prevState)=>{
            return {showSideDrawer: !this.state.showSideDrawer}
        }
        );
    }

    render() {
        return ( 
            <Auxiliary>
                <ToolBar open={this.sideDrawerOpenHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
         );
    }
}


 
