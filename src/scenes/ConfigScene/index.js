import Config from 'containers/Config'
import React, { Component } from 'react';
import './index.css';

class ConfigScene extends Component {
    render() {
        return (
            <div className="config-center pad">
                <Config />
            </div>
        );
    }
}

export default ConfigScene;

