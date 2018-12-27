import React, { Component } from 'react';
import './index.css';
import {Row, Col}  from 'reactstrap';

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
            <Row>
            <Col lg="8">
            {lightName}
            </Col>
            <Col lg="4">
            <Toggle/>
            </Col>
            </Row>
            </div>
        )
    }

}

export default LightWidget;