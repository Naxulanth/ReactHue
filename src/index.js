import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Main from './scenes/Main';
import GlobalStyle from 'globalStyles'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sanitize.css/sanitize.css'


ReactDOM.render(
    <Fragment>
        <Main />
        <GlobalStyle />
    </Fragment>,
    document.getElementById('root'));