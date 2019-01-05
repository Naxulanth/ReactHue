import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { modifyLight } from 'actions/lights'
import { getScene, modifyScene } from 'actions/scenes'
import './style.css';
import { getXYtoRGB, getRGBtoXY } from 'utils/colorConverter'

import './style.css'

class SceneWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomScenes: {}
        }
        this.getRoomScenes = this.getRoomScenes.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { scenes } = this.props
        if (prevProps.scenes !== scenes) {
            this.getRoomScenes();
        }
    }

    getRoomScenes() {
        const { scenes, room, roomId } = this.props;
        let roomScenes = {};
        Object.keys(scenes).forEach(scene => {
            if (JSON.stringify(scenes[scene].lights.sort()) === JSON.stringify(room[roomId].lights.sort())) {
                roomScenes[scene] = scenes[scene];
            }
        })
        this.setState({
            roomScenes: roomScenes
        })
    }

    render() {
        return (
            <div ref={(e) => this.main = e} className="scene-widget">
                <Row>
                    <Col lg="1" />
                    <Col lg="10">
                        SceneWidget
                    </Col>
                    <Col lg="1" />
                </Row>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    room: state.rooms.list,
    lights: state.lights.list,
    scenes: state.scenes.list,
    activeScene: state.activeScenes
})


const mapDispatchToProps = dispatch => ({
    modifyLight: bindActionCreators(modifyLight.request, dispatch),
    getScene: bindActionCreators(getScene.request, dispatch),
    modifyScene: bindActionCreators(modifyScene.request, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(SceneWidget);