import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import uuidv4 from "uuid/v4";
import PropTypes from "prop-types";
import Button from "components/Button";
import TextInput from "components/TextInput";
import TimePicker from "components/TimePicker";
import DayPicker from "containers/DayPicker";
import { createRoutine } from "actions/routines";
import { selectifyScenes } from "utils/scenes";
import Checkbox from "components/Checkbox";
import { toast } from "react-toastify";
import validator from "validator";
import Select from "react-select";
import { wakeFade, sleepFade, otherFade, adjustment } from "constants/fade";
import { selectStyle } from "constants/selectStyle";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

moment().format();

class RoutineDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      days: {},
      rooms: [],
      fadeSelect: "",
      time: null,
      home: false,
      timeOff: null,
      routineLights: [],
      adjustmentSelect: "",
      roomScenes: {},
      sceneSelectors: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.getDays = this.getDays.bind(this);
    this.handleFade = this.handleFade.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleOffTime = this.handleOffTime.bind(this);
    this.handleLightCheck = this.handleLightCheck.bind(this);
    this.handleAdjustment = this.handleAdjustment.bind(this);
    this.sceneSelect = this.sceneSelect.bind(this);
    this.getRoomScenes = this.getRoomScenes.bind(this);
    this.handleScene = this.handleScene.bind(this);
  }

  componentDidMount() {
    if (this.props.scheduleId) {
      // edit mode
      this.setState({});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { rooms, roomScenes } = this.state;
    const { scenes } = this.props;
    if (
      scenes &&
      rooms.length > 0 &&
      (prevState.rooms !== rooms || prevState.roomScenes !== roomScenes)
    ) {
      this.sceneSelect();
    }
  }

  handleName(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleTime(e) {
    this.setState({
      time: e
    });
  }

  handleOffTime(e) {
    this.setState({
      timeOff: e
    });
  }

  handleFade(e) {
    this.setState({
      fadeSelect: e
    });
  }

  handleAdjustment(e) {
    this.setState({
      adjustmentSelect: e
    });
  }

  handleSubmit(e) {
    const { type, roomList, createRoutine } = this.props;
    const {
      name,
      days,
      rooms,
      home,
      time,
      timeOff,
      routineLights,
      fadeSelect
    } = this.state;
    let props = {
      type,
      roomList,
      createRoutine
    };
    let state = {
      name,
      days,
      rooms,
      home,
      time,
      timeOff,
      routineLights,
      fadeSelect
    };
    if (validator.isEmpty(name)) {
      toast.error("Please fill out the name field", {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    createRoutine({ props, state });
  }

  handleCheck(roomKey) {
    const { rooms, home, roomScenes } = this.state;
    let tempRooms = rooms.slice();
    let tempScenes = roomScenes;
    if (!roomKey) {
      this.setState({
        home: !home,
        rooms: []
      });
    } else {
      let keyIndex = tempRooms.indexOf(roomKey);
      if (keyIndex > -1) {
        tempRooms.splice(keyIndex, 1);
        delete tempScenes[roomKey];
      } else tempRooms.push(roomKey);
      this.setState({
        rooms: tempRooms,
        home: false,
        roomScenes: tempScenes
      });
    }
  }

  handleLightCheck(e, lightKey) {
    const { routineLights } = this.state;
    let tempLights = routineLights;
    let keyIndex = tempLights.indexOf(lightKey);
    if (keyIndex > -1) {
      tempLights.splice(keyIndex, 1);
    } else tempLights.push(lightKey);
    this.setState({
      routineLights: tempLights
    });
  }

  getDays(days) {
    this.setState({ days });
  }

  handleScene(e, roomKey) {
    const { roomScenes } = this.state;
    let tempScenes = roomScenes;
    tempScenes[roomKey] = e;
    this.setState({
      roomScenes: tempScenes
    });
  }

  sceneSelect() {
    const { roomList } = this.props;
    const { roomScenes, rooms } = this.state;
    let sceneSelects = {};
    rooms.forEach(roomKey => {
      let room = roomList[roomKey];
      let options = this.getRoomScenes(room);
      sceneSelects[roomKey] = (
        <Select
          placeholder={room.name + " scene"}
          value={roomScenes[roomKey]}
          onChange={e => {
            this.handleScene(e, roomKey);
          }}
          styles={selectStyle}
          options={options}
        />
      );
    });
    sceneSelects[0] = (
      <Select
        placeholder={"Home scene"}
        value={roomScenes[0]}
        onChange={e => {
          this.handleScene(e, 0);
        }}
        styles={selectStyle}
        options={this.getRoomScenes(false)}
      />
    );
    this.setState({
      sceneSelectors: sceneSelects
    });
  }

  getRoomScenes(room) {
    const { scenes } = this.props;
    return selectifyScenes(scenes, room);
  }

  render() {
    const {
      handleSubmit,
      handleName,
      getDays,
      handleFade,
      handleCheck,
      handleOffTime,
      handleTime,
      handleLightCheck,
      handleAdjustment
    } = this;
    const {
      name,
      fadeSelect,
      rooms,
      home,
      time,
      timeOff,
      routineLights,
      adjustmentSelect,
      sceneSelectors
    } = this.state;
    const { type, roomList, lightList, edit } = this.props;
    const adjustmentField = (
      <Fragment>
        <Select
          placeholder={"Random times"}
          value={adjustmentSelect}
          onChange={handleAdjustment}
          styles={selectStyle}
          options={adjustment}
        />
      </Fragment>
    );
    const wakeOnly = (
      <Fragment>
        <Row className="vertical-center center">
          <Col lg="12" sm="12" md="12" xl="12">
            {rooms.length > 0
              ? rooms.map(roomKey => {
                  const room = roomList[roomKey];
                  return room.lights.map(lightKey => {
                    const light = lightList[lightKey];

                    return (
                      <Checkbox
                        key={uuidv4()}
                        name={light.name}
                        onChange={e => {
                          handleLightCheck(e, lightKey);
                        }}
                        checked={routineLights.includes(lightKey)}
                      >
                        {light.name}
                      </Checkbox>
                    );
                  });
                })
              : null}
          </Col>
        </Row>
        <Row className="vertical-center last">
          <Col lg="3" sm="3" md="3" xl="3" />
          <Col lg="3" sm="3" md="3" xl="3">
            Turn light(s) off
          </Col>
          <Col lg="3" sm="3" md="3" xl="3">
            <TimePicker
              placeholder={"Pick time"}
              showSecond={false}
              use12Hours
              allowEmpty={true}
              value={timeOff}
              onChange={handleOffTime}
            />
          </Col>
          <Col lg="3" sm="3" md="3" xl="3" />
        </Row>
      </Fragment>
    );
    return (
      <div className="routine-details">
        <Row className="vertical-center">
          <Col lg="3" sm="3" md="3" xl="3" />
          <Col className="center" lg="6" sm="6" md="6" xl="6">
            <TextInput
              onChange={handleName}
              value={name}
              placeholder={"Name..."}
            />
          </Col>
          <Col lg="3" sm="3" md="3" xl="3" />
        </Row>
        <Row className="vertical-center">
          <Col lg="3" sm="3" md="3" xl="3" />
          <Col className="center" lg="3" sm="3" md="3" xl="3">
            <Select
              placeholder={"Fade"}
              value={fadeSelect}
              onChange={handleFade}
              styles={selectStyle}
              options={
                type === "wake"
                  ? wakeFade
                  : type === "sleep"
                  ? sleepFade
                  : otherFade
              }
            />
          </Col>
          <Col lg="3" sm="3" md="3" xl="3">
            <TimePicker
              placeholder={"Pick time"}
              showSecond={false}
              use12Hours
              allowEmpty={false}
              value={time}
              onChange={handleTime}
            />
          </Col>
          <Col lg="6" sm="6" md="6" xl="6" />
        </Row>
        <Row className="vertical-center">
          <Col lg="3" sm="3" md="3" xl="3" />
          <Col lg="6" sm="6" md="6" xl="6">
            {type === "routines" ? adjustmentField : null}
          </Col>
          <Col lg="3" sm="3" md="3" xl="3" />
        </Row>
        <Row className="vertical-center">
          <Col lg="3" sm="3" md="3" xl="3" />
          <Col className="day-picker-col" lg="6" sm="6" md="6" xl="6">
            <DayPicker days={getDays} />
          </Col>
          <Col lg="3" sm="3" md="3" xl="3" />
        </Row>
        <Row className="vertical-center center">
          <Col lg="12" sm="12" md="12" xl="12">
            <Checkbox
              name={"home"}
              onChange={() => {
                handleCheck();
              }}
              checked={home}
            >
              Home
            </Checkbox>
            {roomList
              ? Object.keys(roomList).map(roomKey => {
                  const room = roomList[roomKey];
                  return (
                    <Checkbox
                      key={uuidv4()}
                      name={room.name}
                      onChange={() => {
                        handleCheck(roomKey);
                      }}
                      checked={rooms.includes(roomKey)}
                    >
                      {room.name}
                    </Checkbox>
                  );
                })
              : null}
          </Col>
        </Row>
        {type === "routines" ? (
          <Row className="vertical-center last center">
            <Col lg="3" sm="3" md="3" xl="3" />
            <Col lg="3" sm="3" md="3" xl="3">
              Turn room(s) off
            </Col>
            <Col lg="3" sm="3" md="3" xl="3">
              <TimePicker
                placeholder={"Pick time"}
                showSecond={false}
                use12Hours
                allowEmpty={true}
                value={timeOff}
                onChange={handleOffTime}
              />
            </Col>
            <Col lg="3" sm="3" md="3" xl="3" />
          </Row>
        ) : null}
        {type === "wake" ? wakeOnly : null}
        {type === "routines" || type === "timers"
          ? rooms.map(roomKey => {
              return (
                <Row key={uuidv4()} className="vertical-center">
                  <Col lg="3" />
                  <Col lg="6">{sceneSelectors[roomKey]}</Col>
                  <Col lg="3" />
                </Row>
              );
            })
          : null}
        {(type === "routines" || type === "timers") &&
        rooms.length === 0 &&
        home ? (
          <Row className="vertical-center">
            <Col lg="3" />
            <Col lg="6">{sceneSelectors[0]}</Col>
            <Col lg="3" />
          </Row>
        ) : null}
        <Row className="vertical-center center">
          <Col lg="3" sm="3" md="3" xl="3" />
          <Col lg="6" sm="6" md="6" xl="6">
            <Button onClick={handleSubmit}>{edit ? "Submit" : "Create"}</Button>
          </Col>
          <Col lg="3" sm="3" md="3" xl="3" />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roomList: state.rooms.list,
  lightList: state.lights.list,
  createdSensor: state.sensors.createdSensor,
  createdScene: state.scenes.createdScene,
  createdSchedule: state.schedules.createdSchedule,
  scenes: state.scenes.list,
  createdRoom: state.rooms.createdRoom
});

const mapDispatchToProps = dispatch => ({
  createRoutine: bindActionCreators(createRoutine.request, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutineDetails);
