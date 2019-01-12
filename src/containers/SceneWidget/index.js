import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Select from 'react-select'
import { modifyLight } from 'actions/lights'
import { getScene, modifyScene } from 'actions/scenes'
import './style.css';
import { getXYtoRGB, getRGBtoXY } from 'utils/colorConverter'

import './style.css'

class SceneWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomScenes: [],
            selectedOption: null,
        }
        this.getRoomScenes = this.getRoomScenes.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { scenes } = this.props
        if (prevProps.scenes !== scenes) {
            this.getRoomScenes();
        }
        console.log(this.state.roomScenes)
    }

    getRoomScenes() {
        const { scenes, room, roomId } = this.props;
        let roomScenes = [];
        Object.keys(scenes).forEach(scene => {
            if (JSON.stringify(scenes[scene].lights.sort()) === JSON.stringify(room[roomId].lights.sort())) {
                roomScenes.push(scenes[scene]);
            }
        })
        let selectors = [];
        roomScenes.forEach(scene => {
            let selector = { value: scene, label: scene.name }
            selectors.push(selector);
        })
        this.setState({
            roomScenes: selectors
        })
    }

    handleChange(selectedOption) {
        this.setState({ selectedOption });
    }
    

    render() {
        const { selectedOption, roomScenes } = this.state;
        if (roomScenes.length > 0) {
            return (
                <div ref={(e) => this.main = e} className="scene-widget">
                    <Row>
                        <Col lg="1" />
                        <Col lg="10">
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={roomScenes}
                            />
                        </Col>
                        <Col lg="1" />
                    </Row>
                </div>
            )
        }
        else return 'Loading...'
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