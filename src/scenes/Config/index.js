import React, { Component } from 'react';
import GlobalStyle from 'globalStyles'

import Config from 'containers/Config'

import './index.css';

class ConfigScene extends Component {
    render() {
        return (
            <div className="main">
                <Config />
                <GlobalStyle />
            </div>
        );
    }
}

export default ConfigScene;
