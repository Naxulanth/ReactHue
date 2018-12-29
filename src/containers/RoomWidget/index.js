import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import uuidv4 from 'uuid/v4'

import LightWidget from 'containers/LightWidget'
import colorChanger from 'utils/colorChanger';

import './index.css';
import WidgetHeader from '../WidgetHeader';



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
        arr.map((e, i) => {
            insert.push(<Row key={uuidv4()}><Col lg="12"><LightWidget /></Col></Row>);
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
                        <Col lg="12">
                            <WidgetHeader roomName={roomName} />
                        </Col>
                    </Row>
                    {this.populateLights([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])}
                </div>
            </div>
        )
    }

}

export default RoomWidget;