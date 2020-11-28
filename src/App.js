import React,  { Component, useEffect, Suspense, useCallback } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Logout from './containers/Auth/Logout/Logout';
import {connect, useSelector, useDispatch} from 'react-redux';
import * as actions from './store/actions/auth';

import {

  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";

//Lazy Loading
const Checkout = React.lazy(()=>{
  return import('./containers/Checkout/Checkout')
});

const Order = React.lazy(()=>{
  return import('./containers/Orders/Orders')
});

const Auth = React.lazy(()=>{
  return import('./containers/Auth/Auth')
});

const App = (props) => {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((stateCurrent)=> {
    return stateCurrent.auth.token !== null;
  });
  const onTryAutoSignup =  useCallback( () => dispatch(actions.authCheckState()), [dispatch]);

  useEffect(() => {
    onTryAutoSignup();
    console.log('entro');
  }, [onTryAutoSignup])//run if function changes.. a function definition can change , or where is defined

  let routes = (
    <Switch>
    <Route path="/auth" render={(props) => <Auth {...props}/>}/>
    <Route exact path="/" component={BurgerBuilder}/>
    <Redirect to="/"/>
    </Switch>
);

 if (isAuthenticated) {

   routes = (
     <Switch>
       <Route path="/checkout" render={(props)=><Checkout {...props}/>}/>
       <Route path="/orders" render={(props)=><Order {...props}/>}/>
       <Route path="/logout" component={Logout}/>
       <Route path="/auth" render={(props)=><Auth {...props}/>}/>
       <Route exact path="/" component={BurgerBuilder}/> 
       <Redirect to="/"/>   
     </Switch>
   );
 }

  return ( 
    <Layout> 
      <Suspense fallback={<p>Loading.....</p>}>
        {routes}
      </Suspense>
    </Layout>
   );
}
 





export default withRouter(App);
