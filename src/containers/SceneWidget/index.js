import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { modifyLight, } from 'actions/lights'
import { getScene, modifyScene, modifySceneLights, createScene } from 'actions/scenes'
import './style.css';
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
        this.handleDelete = this.handleDelete.bind(this);
        this.handleModify = this.handleModify.bind(this);
        this.handleSceneText = this.handleSceneText.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { scenes, roomId, activeScenes, room, lights } = this.props;
        const checkLight = room[roomId].lights.sort()
        if (prevProps.scenes !== scenes) {
            this.getRoomScenes();
        }
        if (((!prevProps.activeScenes || !prevProps.activeScenes[roomId]) && activeScenes && activeScenes[roomId])
            || ((prevProps.activeScenes && activeScenes && prevProps.activeScenes[roomId] && activeScenes[roomId])
                && (prevProps.activeScenes[roomId] !== activeScenes[roomId]))) {
            // change lightstates
        }
        for (let i = 0; i < checkLight.length; ++i) {
            if (this.state.selectedOption && activeScenes && activeScenes[roomId] && JSON.stringify(lights[checkLight[i]].state.xy) !== JSON.stringify(activeScenes[roomId].lightstates[checkLight[i]].xy)) {
                this.setState({
                    selectedOption: null,
                })
                break;
            }
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

    handleDelete() {

    }

    handleModify() {

    }

    handleSave(scene) {
        const { createScene, modifyScene, modifySceneLights, roomId, room, lights, createdScene } = this.props;
        const { sceneName } = this.state;
        const roomLights = room[roomId].lights;
        createScene({ name: sceneName, group: roomId.toString(), type: "GroupScene", "recycle": true })
        for (let i = 0; i < roomLights.length; ++i) {
            modifySceneLights(createdScene, roomLights[i], lights[roomLights[i]].state)
        }
        // modifyScene(createdScene, { "name": sceneName })
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
                                placeholder={'Select scene...'}
                            />
                            <Button className="one-third"
                                onClick={this.handleModify}
                            >Modify</Button>
                            <Button className="one-third"
                                onClick={this.handleDelete}
                            >Delete</Button>
                            <TextInput placeholder={'Enter scene name...'} value={sceneName} onChange={this.handleSceneText} />
                            <Button
                                onClick={this.handleSave}
                            >Save</Button>
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
    activeScenes: state.scenes.activeScenes,
    createdScene: state.scenes.createdScene,
})


const mapDispatchToProps = dispatch => ({
    modifyLight: bindActionCreators(modifyLight.request, dispatch),
    getScene: bindActionCreators(getScene.request, dispatch),
    modifyScene: bindActionCreators(modifyScene.request, dispatch),
    modifySceneLights: bindActionCreators(modifySceneLights.request, dispatch),
    createScene: bindActionCreators(createScene.request, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(SceneWidget);