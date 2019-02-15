import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import uuidv4 from 'uuid/v4'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import WidgetHeader from '../WidgetHeader';
import LightWidget from 'containers/LightWidget'
import RoutineWidget from 'containers/RoutineWidget'
import { getXYtoRGB, getFormattedXYtoRGB } from 'utils/colorConverter'
import './style.css';
import colorChanger from 'utils/colorChanger'
import { objectToArray } from 'utils'

class RoomWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lights: []
        }
        this.c = null;
        this.id = 'roomWidget' + props.roomId;
        this.main = React.createRef();
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
        let colorMap = [];
        Object.keys(lights).forEach(lightId => {
            if (lightIds.includes(lightId)) colorMap.push(objectToArray(getFormattedXYtoRGB(lights, lightId)))
        })
        // remove dupes
        colorMap = Array.from(new Set(colorMap.map(JSON.stringify)), JSON.parse);
        if (colorMap.length > 1) {
            if (this.c) this.c.stop(this.id);
            this.c = colorChanger();
            this.c.initialize(100, colorMap, this.id)
            this.c.start(this.main.current.style, 'borderColor', this.id)
        }
        else {
            if (this.c) this.c.stop(this.id);
            this.main.current.style.borderColor = 'rgb(' + getXYtoRGB(lights[lightIds[0]].state.xy[0], lights[lightIds[0]].state.xy[1], lights[lightIds[0]].state.bri).join(',') + ')';
        }
    }

    populateLights(arr) {
        let insert = [];
        arr.forEach((lightId, i) => {
            insert.push(<Row key={uuidv4()}><Col lg="12" sm="12" md="12" xl="12"><LightWidget lightId={lightId.toString()} /></Col></Row>);
        })
        this.setState({
            lights: insert
        })
    }

    render() {
        const { roomId } = this.props;
        const { lights } = this.state;
        return (
            <div ref={this.main} className="room-widget">
                <span className="test">
                    <div className="child">
                        <Row>
                        <Col lg="12" sm="12" md="12" xl="12">
                                <WidgetHeader roomId={roomId} />
                            </Col>
                        </Row>
                        {lights}
                    </div>
                </span>
            </div>
        )
    }

}

RoomWidget.propTypes = {
    lights: PropTypes.object,
    room: PropTypes.object,
    roomId: PropTypes.string,
}


const mapStateToProps = state => ({
    room: state.rooms.list,
    lights: state.lights.list
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomWidget);