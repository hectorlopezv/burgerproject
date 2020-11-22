import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
          <Layout> 
            <Switch>
              <Route path="/checkout" component={Checkout}/>
              <Route path="/orders" component={Orders}/>
              <Route exact path="/" component={BurgerBuilder}/>
            </Switch>

           
            
          </Layout>
    </Router>

  );
}

export default App;
