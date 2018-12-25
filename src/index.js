import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'

import GlobalStyle from 'globalStyles'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sanitize.css/sanitize.css'

import Routes from './routes'
import MenuBar from './containers/MenuBar'

const history = createHistory()
ReactDOM.render(
    <Fragment>
        <Routes history={history}>
        <MenuBar/>
        </Routes>
        <GlobalStyle />
    </Fragment>,
    document.getElementById('root'));