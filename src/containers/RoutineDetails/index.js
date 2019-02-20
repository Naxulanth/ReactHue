import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
  otherSensor
} from "constants/routines";
import Checkbox from "components/Checkbox";
import Select from "react-select";
import { wakeFade, sleepFade, otherFade } from "constants/fade";
import { selectStyle } from "constants/selectStyle";
import "./style.css";
import moment from "moment";

moment().format();

class RoutineDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      days: {},
      rooms: {},
      fadeSelect: "",
      time: null,
      home: false,
      timeOff: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.getDays = this.getDays.bind(this);
    this.handleFade = this.handleFade.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleOffTime = this.handleOffTime.bind(this);
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
      createScene
    } = this.props;
    const { name, days, rooms, home, time, timeOff } = this.state;
    let obj = {};
    obj.description = type;
    obj.name = name;
    obj.status = "enabled";
    if (type === "wake") {
      obj.timeOff = timeOff;
      createSensor(wakeSensor);
    }
    else if (type === "sleep") {

    }
    else if (type === "routines") {

    }
    // scene
    // schedule
    // rule
    // resource
  }

  handleCheck(e) {
    const name = e.target.getAttribute("name");
    const { rooms, home } = this.state;
    let tempRooms = rooms;
    console.log(name);
    if (name === "home") {
      this.setState({
        home: !home,
        rooms: {}
      });
    } else {
      tempRooms[name] = !rooms[name];
      this.setState({
        rooms: tempRooms,
        home: false
      });
    }
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
      handleTime
    } = this;
    const { name, fadeSelect, days, rooms, home, time, timeOff } = this.state;
    const { type, roomList } = this.props;
    const wakeOnly = (
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
            <Checkbox name={"home"} onChange={handleCheck} checked={home}>
              Home
            </Checkbox>
            {roomList
              ? Object.keys(roomList).map(roomKey => {
                  const room = roomList[roomKey];
                  return (
                    <Checkbox
                      key={uuidv4()}
                      name={room.name}
                      onChange={handleCheck}
                      checked={!!rooms[room.name]}
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
  roomList: state.rooms.list
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
