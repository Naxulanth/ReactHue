import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import WidgetTitle from 'components/WidgetTitle'
import Toggle from 'components/Toggle'
import './index.css'

import LightDetails from 'containers/LightDetails'

import Animate from 'components/Animate'

import { modifyRoom } from 'actions/rooms'

class WidgetHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.expand = this.expand.bind(this);
    }

    expand() {
        let { modifyRoom, room, roomId } = this.props;
        modifyRoom(roomId, { "on": !room.action.on })
    }


    render() {
        const { expand } = this;
        const { room } = this.props;
        return (
            <div className="widget-header">
                <Row>
                    <Col lg="8">
                        <WidgetTitle>{room.name}</WidgetTitle>
                    </Col>
                    <Col className="center-toggle" lg="4">
                        <Toggle checked={room.state.all_on} onChange={expand} />
                    </Col>
                </Row>
                <Animate pose={room.state.all_on ? 'visible' : 'hidden'}><LightDetails /></Animate>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    modifyRoom: bindActionCreators(modifyRoom.request, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(WidgetHeader);