import React, { Component } from 'react';

import {Row, Col} from 'reactstrap';
import uuidv4 from 'uuid/v4';

import WidgetTitle from 'components/WidgetTitle'
import LightWidget from 'containers/LightWidget'
import Toggle from 'components/Toggle'
import colorChanger from 'utils/colorChanger';

import './index.css';

class RoomWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomName: 'Living Room',
            lights: {},
        }
    }
    
    populateLights(arr) {
        let insert = [];
        arr.map((e) => {
            insert.push(<Row><Col lg="8"><LightWidget/></Col></Row>);
        })
        return insert;
    }

    componentDidMount() {
        let c = colorChanger();
        c.start(this.main.style, 'borderColor');
    }

    render() {
        const { roomName } = this.state;
        return (
            <div ref={(e) => this.main = e} className="room-widget">
            <div className="child">
            <Row>
                <Col lg="8">
                <WidgetTitle>{roomName}</WidgetTitle>
                </Col>
                <Col lg="4">
                <Toggle/>
                </Col>
                </Row>
                {this.populateLights([0, 0, 0, 0, 0, 0])}
            </div>
            </div>
        )
    }

}

export default RoomWidget;