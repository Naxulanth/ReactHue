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
        }
        this.expand = this.expand.bind(this);
    }

    expand() {
        // let { modifyRoom, room } = this.props;
        // modifyRoom(roomId, { "on": !light.state.on })
    }


    render() {
        const { expand } = this;
        const { room } = this.props;
        let details = room.state.all_on ? <LightDetails /> : null;
        return (
            <div className="widget-header">
                <Row>
                    <Col lg="8">
                        <WidgetTitle>{room.name}</WidgetTitle>
                    </Col>
                    <Col className="center-toggle" lg="4">
                        <Toggle checked={room.state.all_on} onChange={expand} />
                    </Col>
                </Row>
                {details}
            </div>
        )
    }
}

export default WidgetHeader;