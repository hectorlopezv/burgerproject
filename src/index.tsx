import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import burgerReducer from './store/reducers/burgerBuilder';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, combineReducers } from '@reduxjs/toolkit';
import { orderReducer } from './store/reducers/order';


const rootReducer = combineReducers({
  burgerBuilder: burgerReducer, 
  order: orderReducer
  }
  );

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
));


ReactDOM.render(
  <Provider store={store}>

      <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
