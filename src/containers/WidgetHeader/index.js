import React, {Component} from 'react';
import {Row,Col} from 'reactstrap';

import WidgetTitle from 'components/WidgetTitle'
import Toggle from 'components/Toggle'
import './index.css'

class WidgetHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {roomName} = this.props;
        return (
            <div className="widget-header">
                <Row>
            <Col lg="8">
            <WidgetTitle>{roomName}</WidgetTitle>
            </Col>
            <Col lg="4">
            <Toggle/>
            </Col>
            </Row>
            </div>
        )
    }
}

export default WidgetHeader;