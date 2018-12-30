import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import WidgetTitle from 'components/WidgetTitle'
import Toggle from 'components/Toggle'
import './index.css'

import LightDetails from 'containers/LightDetails'

class WidgetHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomName: 'Living Room',
            expanded: false
        }
        this.expand = this.expand.bind(this);
    }

    expand() {
        this.setState({
            expanded: !this.state.expanded
        })
    }


    render() {
        const { expand } = this;
        const { expanded, roomName } = this.state;
        let details = expanded ? <LightDetails /> : null;
        return (
            <div className="widget-header">
                <Row>
                    <Col lg="8">
                        <WidgetTitle>{roomName}</WidgetTitle>
                    </Col>
                    <Col className="center-toggle" lg="4">
                        <Toggle onChange={expand} />
                    </Col>
                </Row>
                {details}
            </div>
        )
    }
}

export default WidgetHeader;