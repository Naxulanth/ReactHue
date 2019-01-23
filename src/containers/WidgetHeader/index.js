import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Animate from 'components/Animate'
import WidgetTitle from 'components/WidgetTitle'
import Toggle from 'components/Toggle'
import LightDetails from 'containers/LightDetails'
import SceneWidget from 'containers/SceneWidget'
import { modifyRoom, modifyRoomAttr } from 'actions/rooms'
import './style.css'

class WidgetHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomName: ''
        }
        this.expand = this.expand.bind(this);
        this.changeName = this.changeName.bind(this);
    }

    expand() {
        let { modifyRoom, roomId, room } = this.props;
        modifyRoom(roomId, { "on": !room[roomId].action.on })
    }

    changeName() {
        let { modifyRoom, roomId, room, } = this.props;
        let { roomName } = this.state;
        modifyRoomAttr(roomId, { "name": roomName })
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
                <Animate pose={room[roomId].state.any_on ? 'visible' : 'hidden'}><SceneWidget roomId={roomId} /></Animate>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    room: state.rooms.list
})

const mapDispatchToProps = dispatch => ({
    modifyRoom: bindActionCreators(modifyRoom.request, dispatch),
    modifyRoomAttr: bindActionCreators(modifyRoomAttr.request, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(WidgetHeader);