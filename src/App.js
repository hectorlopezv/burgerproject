import React,  { Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/auth';


import {

  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";





class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup()
  }
  render(){

    let routes = (
       <Switch>
        <Route path="/auth" component={Auth}/>
        <Route exact path="/" component={BurgerBuilder}/>
        <Redirect to="/"/>
       </Switch>
    );
      console.log(this.props.isAuthenticated)
    if (this.props.isAuthenticated) {
      console.log('deberia entrara aca')
      routes = (

        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/logout" component={Logout}/>
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
