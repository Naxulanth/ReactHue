import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { modifyLight,  } from 'actions/lights'
import { getScene, modifyScene, modifySceneLights } from 'actions/scenes'
import './style.css';
import { getXYtoRGB, getRGBtoXY } from 'utils/colorConverter'
import Button from 'components/Button'
import Select from 'components/SceneSelect'
import TextInput from 'components/TextInput'

import './style.css'

class SceneWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomScenes: [],
            selectedOption: null,
            sceneName: '',
        }
        this.getRoomScenes = this.getRoomScenes.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSceneText = this.handleSceneText.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { scenes, roomId, activeScenes } = this.props
        if (prevProps.scenes !== scenes) {
            this.getRoomScenes();
        }
        if (((!prevProps.activeScenes || !prevProps.activeScenes[roomId]) && activeScenes && activeScenes[roomId])
            || ((prevProps.activeScenes && activeScenes && prevProps.activeScenes[roomId] && activeScenes[roomId])
                && (prevProps.activeScenes[roomId] !== activeScenes[roomId]))) {
            console.log('ye')
            // change lightstates
        }
    }

    getRoomScenes() {
        const { scenes, room, roomId } = this.props;
        let roomScenes = [];
        Object.keys(scenes).forEach(scene => {
            if (JSON.stringify(scenes[scene].lights.sort()) === JSON.stringify(room[roomId].lights.sort())) {
                roomScenes.push({ [scene]: scenes[scene] });
            }
        })
        let selectors = [];
        console.log(roomScenes)
        roomScenes.forEach(scene => {
            let sceneValue = Object.values(scene)[0]
            let selector = { value: sceneValue, label: sceneValue.name, key: Object.keys(scene)[0] }
            selectors.push(selector);
        })
        this.setState({
            roomScenes: selectors
        })
    }
    handleChange(selectedOption) {
        const { getScene } = this.props;
        this.setState({ selectedOption })
        getScene(selectedOption.key);
    }

    handleSave(scene) {
        // make new scene
        // {"name":"test", "group": "1", "type":"GroupScene", "recycle":true}
        // for lights in scene... set lightstates
        // /api/<username>/scenes/<id>/lightstates/<id>
        this.setState({
            sceneName: ''
        })
    }

    handleSceneText(e) {
        this.setState({
            sceneName: e.target.value
        })
    }


    render() {
        const { selectedOption, roomScenes, sceneName } = this.state;
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
                            <TextInput placeholder={'Enter scene name...'} value={sceneName} onChange={this.handleSceneText} />
                            <Button
                                onClick={this.handleSave}
                            >Save Scene</Button>
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
    activeScenes: state.scenes.activeScenes
})


const mapDispatchToProps = dispatch => ({
    modifyLight: bindActionCreators(modifyLight.request, dispatch),
    getScene: bindActionCreators(getScene.request, dispatch),
    modifyScene: bindActionCreators(modifyScene.request, dispatch),
    modifySceneLights: bindActionCreators(modifySceneLights.request, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(SceneWidget);