import React, { Fragment } from 'react'
import { Router, Route } from 'react-router-dom'

// Scenes
import Main from 'scenes/Main'
import Config from 'scenes/Config'

import MenuBar from 'containers/MenuBar'

import { user } from 'constants/localStorage'


export default ({ history }) => (
    <Router history={history}>
        <Fragment>
            <Route path={process.env.PUBLIC_URL + '/'} component={localStorage.getItem(user) ? MenuBar : null} />
            <Route path={process.env.PUBLIC_URL + '/'} exact component={localStorage.getItem(user) ? Main : Config} />
            <Route path={process.env.PUBLIC_URL + '/config'} component={Config} />
        </Fragment>
    </Router>   
)

