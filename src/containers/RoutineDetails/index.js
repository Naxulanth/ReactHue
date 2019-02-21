import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import shortid from "shortid";
import uuidv4 from "uuid/v4";
import PropTypes from "prop-types";
import Button from "components/Button";
import TextInput from "components/TextInput";
import TimePicker from "components/TimePicker";
import DayPicker from "containers/DayPicker";
import { createSchedule } from "actions/schedules";
import { createResource } from "actions/resources";
import { createRule } from "actions/rules";
import { createSensor } from "actions/sensors";
import { createScene } from "actions/scenes";
import {
  wakeSensor,
  sleepSensor,
  timerSensor,
  otherSensor,
  sensorObject,
  groupObject,
  sceneObject,
  resourceObject
} from "constants/routines";
import Checkbox from "components/Checkbox";
import Select from "react-select";
import { wakeFade, sleepFade, otherFade } from "constants/fade";
import { selectStyle } from "constants/selectStyle";
import { calibrate } from "utils/date";
import "./style.css";
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
      routineLights: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.getDays = this.getDays.bind(this);
    this.handleFade = this.handleFade.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleOffTime = this.handleOffTime.bind(this);
    this.handleLightCheck = this.handleLightCheck.bind(this);
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

  handleSubmit(e) {
    const {
      type,
      createSchedule,
      createRule,
      createResource,
      createSensor,
      createScene,
      createdSensor,
      createdScene
    } = this.props;
    const {
      name,
      days,
      rooms,
      home,
      time,
      timeOff,
      routineLights
    } = this.state;
    const { roomList } = this.props;
    let obj = {};
    let resource = resourceObject(name);
    let shortId = shortid
      .characters(
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
      )
      .substr(0, 16);
    let lights = [];
    if (routineLights.length < 1) {
      Object.keys(roomList).forEach(roomKey => {
        if (Object.keys(rooms).includes(roomKey)) {
          lights = lights.concat(roomList[roomKey].lights);
        }
      });
    }
    else {
      lights = routineLights;
    }
    obj.status = "disabled";
    obj.recycle = "true";
    obj.autodelete = "false";
    obj.created = calibrate(new Date(), null, type);
    if (
      Object.keys(days).some(function(day) {
        return days[day];
      })
    ) {
      obj.localtime = null; // fix this
    } else {
      obj.localtime = calibrate(time, null, type);
    }
    if (type === "wake") {
      createSensor(wakeSensor);
      resource.links.push("/sensors/" + createdSensor);
      obj.description = shortId + "_start wake up";
      obj.name = name;
      obj.command = sensorObject(createdSensor);
      createSchedule(obj);
      // resource push sched
      obj.description = shortId + "_trigger end scene";
      obj.name = shortId;
      createScene(sceneObject(true, type, lights));
      // fix scene lightstates
      // resource push scene
      createScene(sceneObject(false, type, lights));
      // fix scene lightstates
      // resource push scene
      obj.command = groupObject(createdScene);
      createSchedule(obj);
      // resource push sched
      // create rule
      // resource push rule
    } else if (type === "sleep") {
    } else if (type === "routines") {
      // 1 scene for each group, group 0 for home
    }
  }

  handleCheck(roomKey) {
    const { rooms, home } = this.state;
    let tempRooms = rooms;
    if (!roomKey) {
      this.setState({
        home: !home,
        rooms: []
      });
    } else {
      let keyIndex = tempRooms.indexOf(roomKey);
      if (keyIndex > -1) {
        tempRooms.splice(keyIndex, 1);
      } else tempRooms.push(roomKey);
      this.setState({
        rooms: tempRooms,
        home: false
      });
    }
  }

  handleLightCheck(lightKey) {
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

  render() {
    const {
      handleSubmit,
      handleName,
      getDays,
      handleFade,
      handleCheck,
      handleOffTime,
      handleTime,
      handleLightCheck
    } = this;
    const {
      name,
      fadeSelect,
      days,
      rooms,
      home,
      time,
      timeOff,
      routineLights
    } = this.state;
    const { type, roomList, lightList } = this.props;
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
                        onChange={() => {
                          handleLightCheck(lightKey);
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
        <Row className="vertical-center">
          <Col lg="3" sm="3" md="3" xl="3" />
          <Col lg="3" sm="3" md="3" xl="3">
            Turn light(s) off
          </Col>
          <Col lg="3" sm="3" md="3" xl="3">
            <TimePicker
              placeholder={"Pick time"}
              showSecond={false}
              use12Hours
              allowEmpty={false}
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
        <Row>
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
          <Col className="center" lg="3" sm="3" md="3" xl="3" />
          <Col lg="3" sm="3" md="3" xl="3" />
          <Col lg="6" sm="6" md="6" xl="6" />
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
        {type === "wake" ? wakeOnly : null}
        <Row>
          <Col lg="3" sm="3" md="3" xl="3" />
          <Col className="center" lg="6" sm="6" md="6" xl="6">
            <Button onClick={handleSubmit}> Create </Button>
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
  createdScene: state.scenes.createdScene
});

const mapDispatchToProps = dispatch => ({
  createSchedule: bindActionCreators(createSchedule.request, dispatch),
  createResource: bindActionCreators(createResource.request, dispatch),
  createRule: bindActionCreators(createRule.request, dispatch),
  createSensor: bindActionCreators(createSensor.request, dispatch),
  createScene: bindActionCreators(createScene.request, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutineDetails);
