import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import uuidv4 from "uuid/v4";
import Button from "components/Button";
import TextInput from "components/TextInput";
import TimePicker from "components/TimePicker";
import DayPicker from "containers/DayPicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { createRoutine, deleteRoutine } from "actions/routines";
import { clearEdits } from "actions/scenes";
import { getScene } from "actions/scenes";
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
      fadeSelect: null,
      time: null,
      home: false,
      timeOff: null,
      routineLights: [],
      adjustmentSelect: null,
      roomScenes: {},
      sceneSelectors: [],
      loaded: false,
      editScenes: [],
      resource: null
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
    this.formatTimeOff = this.formatTimeOff.bind(this);
    this.revertTimeOff = this.revertTimeOff.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { resources, edit, schedules, type, getScene, rules } = this.props;
    let resourceKey = "";
    let schedule = "";
    if (edit) {
      resourceKey = Object.keys(resources).find(key => {
        let resource = resources[key];
        return resource["links"].includes("/schedules/" + edit);
      });
      let resourceLinks = resources[resourceKey]["links"];
      schedule = schedules[type][edit];
      let localTime = schedule.localtime;
      let time = moment();
      let offTime = null;
      let adjustmentSelect = null;
      if (localTime.includes("PT")) {
        let split = localTime.split("PT")[1].split(":");
        time.hours(split[0]);
        time.minutes(split[1]);
      } else if (localTime.includes("W") || localTime.includes("A")) {
        if (localTime.includes("W")) {
          let s = localTime.split("/T");
          let split = s[0].substr(1);
          let timeSplit = s[1].split(":");
          time.hours(timeSplit[0]);
          time.minutes(timeSplit[1]);
          let days = parseInt(split);
          let dayCounter = 64;
          let i = 0;
          let dayValues = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
          let dayState = {};
          while (days > 0) {
            if (days - dayCounter >= 0) {
              days -= dayCounter;
              dayState[dayValues[i]] = true;
            }
            dayCounter /= 2;
            i++;
          }
          this.setState({
            days: dayState
          });
        }
        if (localTime.includes("A")) {
          let s = localTime.split("A");
          let split = s[1].split(":");
          let timeSplit = s[0].split(":");
          time.hours(timeSplit[0]);
          time.minutes(timeSplit[1]);
          adjustmentSelect = adjustment.find(adj => {
            return adj.value === split[1];
          });
        }
      } else {
        let split = localTime.split("T")[1].split(":");
        time.hours(split[0]);
        time.minutes(split[1]);
      }
      let scenes = [];
      let tempRules = [];
      resourceLinks.forEach((link, i) => {
        if (link.includes("scenes")) {
          scenes.push(link.split("/")[2]);
        }
        if (link.includes("rules")) {
          tempRules.push(link.split("/")[2]);
        }
      });
      scenes.forEach((scene, i) => {
        if (i === scenes.length - 1) {
          getScene(scene, edit, true);
        } else getScene(scene, edit);
      });
      Object.keys(rules).forEach(key => {
        if (tempRules.includes(key)) {
          let c = rules[key].conditions.find(c => c.operator === "ddx");
          if (c) {
            offTime = c.value;
            offTime = this.revertTimeOff(time, offTime);
          }
        }
      });
      let tempResource = resources[resourceKey];
      tempResource.links.push("/resource/" + resourceKey);
      this.setState({
        name:
          type === "sleep"
            ? resources[resourceKey].name
            : schedules[type][edit].name,
        time: time,
        adjustmentSelect,
        editScenes: scenes,
        resource: tempResource,
        timeOff: offTime
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { rooms, roomScenes, home, loaded, editScenes } = this.state;
    const { scenes, editData, edit, type } = this.props;
    if (
      scenes &&
      (rooms.length > 0 || home) &&
      (prevState.rooms !== rooms ||
        JSON.stringify(prevState.roomScenes) !== JSON.stringify(roomScenes))
    ) {
      this.sceneSelect();
    }
    if (
      editData &&
      editData[edit] &&
      Object.keys(editData[edit]).length === editScenes.length &&
      !loaded
    ) {
      let tempTime = this.state.time;
      let tempOffTime = this.state.timeOff;
      let tempFade = null;
      let tempRooms = [];
      let tempRoomScenes = {};
      Object.keys(editData[edit]).forEach(key => {
        let data = editData[edit][key];
        tempRoomScenes[data.group] = {
          key: key,
          label: data.name,
          value: data
        };
        if (
          data &&
          data["lightstates"] &&
          data["lightstates"][data["lights"][0]] &&
          data["lightstates"][data["lights"][0]]["transitiontime"] &&
          data["lightstates"][data["lights"][0]]["transitiontime"] > 600
        ) {
          tempFade =
            data["lightstates"][data["lights"][0]]["transitiontime"] / 600 + 1;
          tempFade = { label: tempFade + " minutes", value: tempFade };
        }
        if (data["type"] === "GroupScene") {
          if (data["group"] === "0") {
            this.setState({
              home: true
            });
          } else {
            tempRooms.push(data["group"]);
          }
        } else {
          data["lights"].forEach(light => {
            tempRooms = Array.from(
              new Set(
                tempRooms.concat(
                  Object.keys(this.props.roomList).filter(roomKey => {
                    let room = this.props.roomList[roomKey];
                    return room.lights.includes(light);
                  })
                )
              )
            );
          });
          if (type === "wake") {
            this.setState({
              routineLights: data["lights"]
            });
          }
        }
      });
      if (type === "wake") {
        tempTime.minutes(tempTime.minutes() + tempFade.value);
        tempOffTime.minutes(tempOffTime.minutes() + tempFade.value);
      }
      this.setState({
        rooms: tempRooms,
        fadeSelect: tempFade,
        loaded: true,
        roomScenes: tempRoomScenes,
        time: tempTime,
        timeOff: tempOffTime
      });
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

  handleDelete() {
    const { deleteRoutine, edit, clearEdits } = this.props;
    const { resource } = this.state;
    deleteRoutine(resource);
    clearEdits(edit);
  }

  formatTimeOff(time, timeOff) {
    let start = new Date(time);
    let end = new Date(timeOff);
    var res = Math.abs(end - start) / 1000;
    let hours = Math.floor(res / 3600) % 24;
    let minutes = Math.floor(res / 60) % 60;
    if (start > end) {
      hours = 24 - hours;
    }
    if (start.getMinutes() > end.getMinutes()) {
      minutes = 60 - minutes;
      hours -= 1;
    }
    hours = ("00" + hours).slice(-2);
    minutes = ("00" + minutes).slice(-2);
    let formatted = "PT" + hours + ":" + minutes + ":00";
    return formatted;
  }

  revertTimeOff(time, timeOff) {
    let t = moment(time);
    let split = timeOff.split("PT")[1].split(":");
    let h = time.hours();
    let m = time.minutes();
    m += parseInt(split[1]);
    if (m >= 60) {
      m -= 60;
      h++;
    }
    h += parseInt(split[0]);
    if (h >= 24) h -= 24;
    t.hours(h);
    t.minutes(m);
    return t;
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
    let formattedTimeOff = null;
    let time = moment(this.state.time);
    const { type, roomList, createRoutine, edit, clearEdits } = this.props;
    const {
      name,
      days,
      rooms,
      home,
      timeOff,
      routineLights,
      fadeSelect,
      roomScenes,
      adjustmentSelect,
      resource
    } = this.state;
    if (timeOff)
      formattedTimeOff = this.formatTimeOff(this.state.time, timeOff);
    if (type === "wake") {
      time.minutes(time.minutes() - fadeSelect.value);
    }
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
      formattedTimeOff,
      routineLights,
      fadeSelect,
      roomScenes,
      adjustmentSelect
    };
    if (validator.isEmpty(name)) {
      toast.error("Please fill out the name field", {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    if (!this.state.time) {
      toast.error("Please fill out the time field", {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    if (!home && routineLights.length < 1 && type === "wake") {
      toast.error("Please fill out lights", {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    if (!home && rooms.length < 1) {
      toast.error("Please select room(s)", {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    if (!fadeSelect && (type === "wake" || type === "routines")) {
      toast.error("Please choose fade amount", {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    if (
      (type === "routines" || type === "timers") &&
      (Object.keys(roomScenes).length < 1 ||
        !rooms.every(key => Object.keys(roomScenes).includes(key)) ||
        (home && !Object.keys(roomScenes).some(key => key === "0")))
    ) {
      toast.error("Please choose scenes", {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    if (type === "routines" && !adjustmentSelect) {
      toast.error("Please choose random times", {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    if (edit) {
      createRoutine({ props, state, resource });
      clearEdits(edit);
    } else createRoutine({ props, state });
  }

  handleCheck(roomKey) {
    const { rooms, home, roomScenes, routineLights } = this.state;
    const { roomList } = this.props;
    let tempRooms = rooms.slice();
    let tempScenes = Object.assign({}, roomScenes);
    let tempLights = routineLights;
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
        let index = null;
        roomList[roomKey]["lights"].forEach(roomLight => {
          index = tempLights.findIndex(light => {
            return roomLight === light;
          });
          if (index !== undefined) {
            tempLights.splice(index, 1);
          }
        });
      } else tempRooms.push(roomKey);
      this.setState({
        rooms: tempRooms,
        home: false,
        roomScenes: tempScenes,
        routineLights: tempLights
      });
    }
  }

  handleLightCheck(e, lightKey) {
    const { routineLights } = this.state;
    let tempLights = Array.from(routineLights);
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
    let tempScenes = Object.assign({}, roomScenes);
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
          options={options.filter(scene => {
            return (
              !scene.label.includes("Wake Up init") &&
              !scene.label.includes("Wake Up end") &&
              !scene.label.includes("Go to sleep start") &&
              !scene.label.includes("Go to sleep end")
            );
          })}
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
      handleAdjustment,
      handleDelete
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
    const {
      type,
      roomList,
      lightList,
      edit,
      isDeleting,
      isCreating
    } = this.props;
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
            {rooms.length > 0 && roomList
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
      <Fragment>
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
            <Col lg="3" sm="3" md="3" xl="3">
              {type === "timers" ? (
                <TimePicker
                  placeholder={"Pick time"}
                  showSecond={false}
                  allowEmpty={false}
                  value={time}
                  onChange={handleTime}
                />
              ) : (
                <TimePicker
                  placeholder={"Pick time"}
                  showSecond={false}
                  use12Hours
                  allowEmpty={false}
                  value={time}
                  onChange={handleTime}
                />
              )}
            </Col>
            <Col className="center" lg="3" sm="3" md="3" xl="3">
              {type === "timers" ? null : (
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
              )}
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
              {type === "timers" ? null : (
                <DayPicker initial={this.state.days} days={getDays} />
              )}
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
            <Col className="vertical-align" lg="6" sm="6" md="6" xl="6">
              <Button
                disabled={isCreating || isDeleting}
                onClick={handleSubmit}
              >
                {isCreating || isDeleting
                  ? "Loading..."
                  : edit
                  ? "Submit"
                  : "Create"}
              </Button>
            </Col>
            <Col lg="2" sm="2" md="2" xl="2" />
            {edit ? (
              <Col lg="1" sm="1" md="1" xl="1">
                <FontAwesomeIcon
                  onClick={handleDelete}
                  className="trash"
                  icon={faTrashAlt}
                />
              </Col>
            ) : (
              ""
            )}
          </Row>
        </div>
      </Fragment>
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
  createdRoom: state.rooms.createdRoom,
  resources: state.resources.list,
  schedules: state.schedules.list,
  editData: state.scenes.editData,
  rules: state.rules.list,
  isCreating: state.routines.isCreating,
  isDeleting: state.routines.isDeleting
});

const mapDispatchToProps = dispatch => ({
  createRoutine: bindActionCreators(createRoutine.request, dispatch),
  getScene: bindActionCreators(getScene.request, dispatch),
  deleteRoutine: bindActionCreators(deleteRoutine.request, dispatch),
  clearEdits: bindActionCreators(clearEdits.request, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutineDetails);
