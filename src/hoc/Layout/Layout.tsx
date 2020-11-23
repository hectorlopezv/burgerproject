import React, { Component } from 'react'
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import { connect } from 'react-redux';



interface Props {
    isAuthenticated:boolean;
    children: React.ReactNode
}
interface State {
    
}

 class Layout extends Component<Props, State> {
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
                <ToolBar 
                    open={this.sideDrawerOpenHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerCloseHandler}
                    isAuth={this.props.isAuthenticated}
                    />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
         );
    }
}


 const mapStateToProps = (state:any) => {
     return  {
         isAuthenticated: state.auth.token !== null
     }
 }



export default connect(mapStateToProps)(Layout);