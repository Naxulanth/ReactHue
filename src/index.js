import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger'
import rootReducer from './reducers'
import createHistory from 'history/createBrowserHistory'

import GlobalStyle from 'globalStyles'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sanitize.css/sanitize.css'

import Routes from './routes'

const store = createStore(rootReducer, applyMiddleware(logger))

const history = createHistory()
ReactDOM.render(
    <Fragment>
        <Provider store={store}>
        <Routes history={history}/>
        <GlobalStyle />
        </Provider>
    </Fragment>,
    document.getElementById('root'));