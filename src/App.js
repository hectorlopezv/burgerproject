import React,  { Component, useEffect} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/auth';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import {

  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";

//Lazy Loading
const asynCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout')
});

const asynOrder = asyncComponent(()=>{
  return import('./containers/Orders/Orders')
});

const asynAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth')
});

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignup()
    console.log('entro');
  }, [])

  let routes = (
    <Switch>
    <Route path="/auth" component={asynAuth}/>
    <Route exact path="/" component={BurgerBuilder}/>
    <Redirect to="/"/>
    </Switch>
);

 if (props.isAuthenticated) {

   routes = (
     <Switch>
       <Route path="/checkout" component={asynCheckout}/>
       <Route path="/orders" component={asynOrder}/>
       <Route path="/logout" component={Logout}/>
       <Route path="/auth" component={asynAuth}/>
       <Route exact path="/" component={BurgerBuilder}/> 
       <Redirect to="/"/>   
     </Switch>
   );
 }

  return ( 
    <Layout> 
      {routes}
    </Layout>
   );
}
 




const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
