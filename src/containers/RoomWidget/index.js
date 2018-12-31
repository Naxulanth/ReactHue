import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import uuidv4 from 'uuid/v4'

import LightWidget from 'containers/LightWidget'

import './index.css';
import WidgetHeader from '../WidgetHeader';
import { isEmpty } from 'utils';

import { hsvToHex } from 'utils/colorConverter'

class RoomWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lights: null
        }
    }

    populateLights(arr) {
        let insert = [];
        arr.forEach((light, i) => {
            insert.push(<Row key={uuidv4()}><Col lg="12"><LightWidget light={light} /></Col></Row>);
        })
        this.setState({
            lights: insert
        })
    }

    componentDidMount() {
        let { lights } = this.props
        if (lights && !isEmpty(lights)) {
            this.populateLights(lights);
        }
        this.main.style.borderColor = '#' + hsvToHex(lights[0].state.hue, lights[0].state.sat, lights[0].state.ct, lights[0].state.bri);
    }

    render() {
        const { roomName } = this.props;
        const { lights } = this.state;
        console.log(lights)
        return (
            <div ref={(e) => this.main = e} className="room-widget">
                <div className="child">
                    <Row>
                        <Col lg="12">
                            <WidgetHeader roomName={roomName} />
                        </Col>
                    </Row>
                    {lights}
                </div>
            </div>
        )
    }

}

export default RoomWidget;