import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';

import Toggle from 'components/Toggle'
import LightDetails from 'containers/LightDetails'

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


    render() {
        const { expanded, lightName } = this.state;
        const { expand } = this;
        let details = expanded ? <LightDetails /> : null;
        return (
            <div ref={(e) => this.main = e} className="light-widget">
                <Row>
                    <Col lg="8">
                        {lightName}
                    </Col>
                    <Col lg="4">
                        <Toggle onChange={expand} />
                    </Col>
                </Row>
                {details}
            </div>
        )
    }

}


export default LightWidget;