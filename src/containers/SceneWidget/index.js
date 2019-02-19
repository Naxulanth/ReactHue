import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { modifyLight } from 'actions/lights'
import { getScene, modifyScene, modifySceneLights, createScene, deleteScene } from 'actions/scenes'
import './style.css';
import Button from 'components/Button'
import Select from 'components/SceneSelect'
import TextInput from 'components/TextInput'
import { sceneSelectStyle } from 'constants/selectStyle'

import './style.css'

class SceneWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomScenes: [],
            selectedOption: null,
            sceneName: '',
            modifyName: '',
        }
        this.getRoomScenes = this.getRoomScenes.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleModify = this.handleModify.bind(this);
        this.handleSceneText = this.handleSceneText.bind(this);
        this.handleModifyText = this.handleModifyText.bind(this);
        this.prepareState = this.prepareState.bind(this);
        this.main = React.createRef();
    }

    componentDidUpdate(prevProps) {
        const { scenes, roomId, activeScenes, room, modifyLight } = this.props;
        if (prevProps.scenes !== scenes) {
            this.getRoomScenes();
        }
        if (((!prevProps.activeScenes || !prevProps.activeScenes[roomId]) && activeScenes && activeScenes[roomId])
            || ((prevProps.activeScenes && activeScenes && prevProps.activeScenes[roomId] && activeScenes[roomId])
                && (prevProps.activeScenes[roomId] !== activeScenes[roomId]))) {
            room[roomId].lights.forEach(light => {
                modifyLight(light, { "xy": activeScenes[roomId].lightstates[light].xy })
            })
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
        getScene(selectedOption.key);
        this.setState({ selectedOption, modifyName: selectedOption.label })
    }

    handleDelete() {
        const { selectedOption } = this.state;
        const { deleteScene } = this.props;
        deleteScene(selectedOption.key);
        this.setState({
            selectedOption: null
        })
    }

    prepareState(tempState) {
        delete tempState.alert;
        delete tempState.reachable;
        delete tempState.colormode;
        delete tempState.mode;
        return tempState;
    }

    handleModify() {
        const { selectedOption, modifyName } = this.state;
        const { room, roomId, lights, modifyScene, modifySceneLights } = this.props;
        const roomLights = room[roomId].lights;
        modifyScene(selectedOption.key, { "name": modifyName })
        for (let i = 0; i < roomLights.length; ++i) {
            let tempState = this.prepareState(lights[roomLights[i]].state);
            modifySceneLights(selectedOption.key, roomLights[i], tempState)
        }
        let selector = selectedOption;
        selector.label = modifyName
        this.setState({
            selectedOption: selector
        })
    }

    handleSave(scene) {
        const { createScene, modifySceneLights, roomId, room, lights, createdScene } = this.props;
        const { sceneName } = this.state;
        const roomLights = room[roomId].lights;
        createScene({ name: sceneName, group: roomId.toString(), type: "GroupScene", "recycle": true })
        for (let i = 0; i < roomLights.length; ++i) {
            let tempState = this.prepareState(lights[roomLights[i]].state);
            modifySceneLights(createdScene, roomLights[i], tempState)
        }
        this.setState({
            sceneName: ''
        })
    }

    handleSceneText(e) {
        this.setState({
            sceneName: e.target.value
        })
    }

    handleModifyText(e) {
        this.setState({
            modifyName: e.target.value
        })
    }


    render() {
        const { selectedOption, roomScenes, sceneName, modifyName } = this.state;
        const modifyButton = selectedOption ? <Button className="one-half" onClick={this.handleModify}>Modify</Button> : null;
        const deleteButton = selectedOption ? <Button className="one-half" onClick={this.handleDelete}>Delete</Button> : null;
        const modifyText = selectedOption ? <TextInput placeholder={'Edit scene name...'} value={modifyName} onChange={this.handleModifyText} /> : null;
        if (roomScenes.length > 0) {
            return (
                <div ref={this.main} className="scene-widget">
                    <Row>
                        <Col lg="1" />
                        <Col className="center" lg="10">
                            <Select
                                styles={sceneSelectStyle}
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={roomScenes.filter(scene => {return !scene.label.includes("Wake Up init") && !scene.label.includes("Wake Up end") && !scene.label.includes("Go to sleep start") && !scene.label.includes("Go to sleep end")})}
                                placeholder={'Select scene...'}
                            />
                            {modifyButton}
                            {deleteButton}
                            {modifyText}
                            <TextInput placeholder={'Create new scene...'} value={sceneName} onChange={this.handleSceneText} />
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

SceneWidget.propTypes = {
    activeScenes: PropTypes.object,
    createdScene: PropTypes.object,
    deletedScene: PropTypes.object,
    lights: PropTypes.object,
    room: PropTypes.object,
    scenes: PropTypes.object,
    modifyLight: PropTypes.func,
    getScene: PropTypes.func,
    modifyScene: PropTypes.func,
    modifySceneLights: PropTypes.func,
    createScene: PropTypes.func,
    deleteScene: PropTypes.func,
    roomId: PropTypes.string,
}

const mapStateToProps = state => ({
    room: state.rooms.list,
    lights: state.lights.list,
    scenes: state.scenes.list,
    activeScenes: state.scenes.activeScenes,
    createdScene: state.scenes.createdScene,
    deletedScene: state.scenes.deletedScene,
})


const mapDispatchToProps = dispatch => ({
    modifyLight: bindActionCreators(modifyLight.request, dispatch),
    getScene: bindActionCreators(getScene.request, dispatch),
    modifyScene: bindActionCreators(modifyScene.request, dispatch),
    modifySceneLights: bindActionCreators(modifySceneLights.request, dispatch),
    createScene: bindActionCreators(createScene.request, dispatch),
    deleteScene: bindActionCreators(deleteScene.request, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(SceneWidget);