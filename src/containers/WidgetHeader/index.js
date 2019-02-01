import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Animate from 'components/Animate'
import Toggle from 'components/Toggle'
import LightDetails from 'containers/LightDetails'
import SceneWidget from 'containers/SceneWidget'
import { modifyRoom, modifyRoomAttr } from 'actions/rooms'
import './style.css'

import EditableLabel from 'react-inline-editing';

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

    changeName(e) {
        let { roomId, modifyRoomAttr } = this.props;
        this.setState({
            roomName: e
        })
        modifyRoomAttr(roomId, { "name": e })
    }


    render() {
        const { expand } = this;
        const { roomId, room } = this.props;
        return (
            <div className="widget-header">
                <Row>
                    <Col lg="1" />
                    <Col lg="7">
                        <EditableLabel text={room[roomId].name}
                            onFocusOut={this.changeName}
                            labelFontSize="22px"
                            inputFontSize="22px"
                            inputHeight="40px"
                            inputWidth="200px"
                        />
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