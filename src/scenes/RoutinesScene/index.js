import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Wake from 'containers/Wake'
import Sleep from 'containers/Sleep'
import Timers from 'containers/Timers'
import OtherRoutines from 'containers/OtherRoutines'
import './style.css';

class RoutinesScene extends Component {
    render() {
        return (
            <div className="routines-scene pad">
                <Row>
                    <Col lg={{ offset: 1, size: 5 }}>
                        <Wake />
                    </Col>
                    <Col lg="5">
                        <Sleep />
                    </Col>
                    <Col lg="1" />
                </Row>
                <Row>
                    <Col lg={{ offset: 1, size: 5 }}>
                        <Timers />
                    </Col>
                    <Col lg="5">
                        <OtherRoutines />
                    </Col>
                    <Col lg="1" />
                </Row>
            </div>
        );
    }
}

export default RoutinesScene;

