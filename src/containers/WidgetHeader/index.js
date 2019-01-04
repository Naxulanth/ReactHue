import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Animate from 'components/Animate'
import WidgetTitle from 'components/WidgetTitle'
import Toggle from 'components/Toggle'
import LightDetails from 'containers/LightDetails'
import SceneWidget from 'containers/SceneWidget'
import { modifyRoom } from 'actions/rooms'
import './style.css'

class WidgetHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.expand = this.expand.bind(this);
    }

    expand() {
        let { modifyRoom, roomId, room } = this.props;
        modifyRoom(roomId, { "on": !room[roomId].action.on })
    }




    render() {
        const { expand } = this;
        const { roomId, room } = this.props;
        return (
            <div className="widget-header">
                <Row>
                    <Col lg="1" />
                    <Col lg="7">
                        <WidgetTitle>{room[roomId].name}</WidgetTitle>
                    </Col>
                    <Col className="center-toggle" lg="3">
                        <Toggle checked={room[roomId].state.any_on} onChange={expand} />
                    </Col>
                    <Col lg="1" />
                </Row>
                <Animate pose={room[roomId].state.any_on ? 'visible' : 'hidden'}><LightDetails lightId={roomId} room /></Animate>
                <Animate pose={room[roomId].state.any_on ? 'visible' : 'hidden'}><SceneWidget /></Animate>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    room: state.rooms.list
})

const mapDispatchToProps = dispatch => ({
    modifyRoom: bindActionCreators(modifyRoom.request, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(WidgetHeader);