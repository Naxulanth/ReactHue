import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import uuidv4 from 'uuid/v4'

import LightWidget from 'containers/LightWidget'

import './index.css';
import WidgetHeader from '../WidgetHeader';
import { isEmpty } from 'utils';

import { getXYtoRGB } from 'utils/colorConverter'

import { getRoomById } from 'actions/rooms'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';


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
        if (lightIds && !isEmpty(lightIds)) {
            this.populateLights(lightIds);
        }

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