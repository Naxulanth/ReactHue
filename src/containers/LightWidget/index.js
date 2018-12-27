import React, { Component } from 'react';
import './index.css';

import WidgetTitle from 'components/WidgetTitle'
import Toggle from 'components/Toggle'
import colorChanger from 'utils/colorChanger';

class LightWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lightName: 'Main',
        }
    }

    componentDidMount() {
        let c = colorChanger();
        c.start(this.main.style, 'borderColor');
    }

    render() {
        const { lightName } = this.state;
        return (
            <div ref={(e) => this.main = e} className="light-widget">
            {lightName}
            </div>
        )
    }

}

export default LightWidget;