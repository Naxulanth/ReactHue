import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import Toggle from 'components/Toggle'
import LightDetails from 'containers/LightDetails'

import colorChanger from 'utils/colorChanger';

import './index.css';

class LightWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lightName: 'Main',
            expanded: false,
        }
        this.expand = this.expand.bind(this);
    }

    expand() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    componentDidMount() {
        let c = colorChanger();
        c.start(this.main.style, 'borderColor');
    }

    render() {
        let { expanded } = this.state;
        let details = expanded ? <LightDetails /> : null;
        const { lightName } = this.state;
        return (
            <div ref={(e) => this.main = e} className="light-widget">
                <Row>
                    <Col lg="8">
                        {lightName}
                    </Col>
                    <Col lg="4">
                        <Toggle onChange={this.expand} />
                    </Col>
                </Row>
                {details}
            </div>
        )
    }

}

export default LightWidget;