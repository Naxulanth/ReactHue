import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import uuidv4 from 'uuid/v4'

import LightWidget from 'containers/LightWidget'

import './index.css';
import WidgetHeader from '../WidgetHeader';

import { getXYtoRGB } from 'utils/colorConverter'
import { connect } from 'react-redux'

class RoomWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lights: []
        }
    }

    componentDidMount() {
        const { room, roomId } = this.props
        const lightIds = room[roomId].lights;
        if (lightIds) {
            this.populateLights(lightIds);
        }
    }

    componentDidUpdate() {
        const { lights, room, roomId } = this.props
        const lightIds = room[roomId].lights;
        this.main.style.borderColor = 'rgb(' + getXYtoRGB(lights[lightIds[0]].state.xy[0], lights[lightIds[0]].state.xy[1], lights[lightIds[0]].state.bri).join(',') + ')';
    }

    populateLights(arr) {
        let insert = [];
        arr.forEach((lightId, i) => {
            insert.push(<Row key={uuidv4()}><Col lg="12"><LightWidget lightId={lightId} /></Col></Row>);
        })
        this.setState({
            lights: insert
        })
    }


    render() {
        const { room, roomId } = this.props;
        const { lights } = this.state;
        return (
            <div ref={(e) => this.main = e} className="room-widget">
                <div className="child">
                    <Row>
                        <Col lg="12">
                            <WidgetHeader roomId={roomId} room={room[roomId]} />
                        </Col>
                    </Row>
                    {lights}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    room: state.rooms.list,
    lights: state.lights.list
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomWidget);