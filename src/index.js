import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { createStore, applyMiddleware, combineReducers} from 'redux';
import user from './modules/user.js';
import memos from './modules/memos.js'
import {Provider} from "react-redux";

const asyncMiddleware = storeAPI => next => action => {
    if (typeof action === 'function') {
        return action(storeAPI.dispatch, storeAPI.getState)
    }

    return next(action)
}

const middlewareEnhancer = applyMiddleware(asyncMiddleware)
const rootReducer = combineReducers({user, memos})
const store = createStore(rootReducer, middlewareEnhancer)

ReactDOM.render(
  <Provider store ={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
