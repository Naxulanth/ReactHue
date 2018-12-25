import React, { Component } from 'react';
import Config from 'containers/Config'
import './index.css';

class ConfigScene extends Component {
    render() {
        return (
            <div className="main">
                <Config />
            </div>
        );
    }
}

export default ConfigScene;
