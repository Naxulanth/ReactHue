import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Brightness from "components/Brightness";
import ColorPicker from "components/ColorPickerExpanded";
import { modifyLight } from "actions/lights";
import Toggle from "components/Toggle";
import { modifyRoom } from "actions/rooms";
import { getRGBtoXY, getFormattedXYtoRGB } from "utils/colorConverter";
import { objectToArray } from "utils";
import "./style.css";

class LightDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brightness: 0,
      colorRgb: {},
      colorLoop: false
    };
    this.changeBrightness = this.changeBrightness.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.changeColorConfirm = this.changeColorConfirm.bind(this);
    this.changeBrightnessConfirm = this.changeBrightnessConfirm.bind(this);
    this.colorLoop = this.colorLoop.bind(this);
    this.main = React.createRef();
  }

  componentDidMount() {
    const { light, lightId, room, rooms } = this.props;
    if (lightId) {
      let converted = getFormattedXYtoRGB(light, lightId);
      this.setState({
        brightness: Math.round(light[lightId].state.bri / 2.54),
        colorRgb: converted,
        colorLoop: room
          ? rooms[lightId].action.effect === "none"
            ? false
            : true
          : light[lightId].state.effect === "none"
          ? false
          : true
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { room, lightId, light } = this.props;
    if (
      !room &&
      prevProps.light[lightId].state.xy !== light[lightId].state.xy
    ) {
      let converted = getFormattedXYtoRGB(light, lightId);
      this.setState({
        colorRgb: converted
      });
    }
    if (
      !room &&
      prevProps.light[lightId].state.bri !== light[lightId].state.bri
    ) {
      this.setState({
        brightness: Math.round(light[lightId].state.bri / 2.54)
      });
    }
    if (
      !room &&
      prevProps.light[lightId].state.effect !== light[lightId].state.effect
    ) {
      this.setState({
        colorLoop: !this.state.colorLoop
      });
    }
  }

  changeBrightness(e) {
    this.setState({
      brightness: e
    });
  }

  changeBrightnessConfirm(e) {
    const { lightId, modifyLight, modifyRoom, room } = this.props;
    if (room) modifyRoom(lightId, { bri: Math.round(e * 2.54) });
    else modifyLight(lightId, { bri: Math.round(e * 2.54) });
  }

  changeColor(color, event) {
    this.setState({
      colorRgb: color.rgb
    });
  }

  changeColorConfirm(color, event) {
    const { lightId, modifyLight, modifyRoom, room } = this.props;
    let xy = getRGBtoXY(objectToArray(color.rgb).slice(0, 3));
    if (room) modifyRoom(lightId, { xy: xy });
    else modifyLight(lightId, { xy: xy });
  }

  colorLoop() {
    const { lightId, modifyLight, modifyRoom, room, rooms, light } = this.props;
    if (room) {
      if (rooms[lightId].action.effect === "none")
        modifyRoom(lightId, { effect: "colorloop" });
      else modifyRoom(lightId, { effect: "none" });
    } else {
      if (light[lightId].state.effect === "none")
        modifyLight(lightId, { effect: "colorloop" });
      else modifyLight(lightId, { effect: "none" });
    }
    if (room) {
      this.setState({
        colorLoop: !this.state.colorLoop
      });
    }
  }

  render() {
    const { brightness, colorRgb } = this.state;
    const {
      changeBrightness,
      changeColor,
      changeColorConfirm,
      changeBrightnessConfirm,
      colorLoop
    } = this;
    return (
      <div ref={this.main} className="light-widget-details">
        <Row>
          <Col lg="1" />
          <Col lg="10">
            <Brightness
              onChange={changeBrightness}
              onAfterChange={changeBrightnessConfirm}
              value={brightness}
            />
          </Col>
          <Col lg="1" />
        </Row>
        <Row>
          <Col lg="1" />
          <Col lg="10">
            <ColorPicker
              color={colorRgb}
              onChange={changeColor}
              onChangeComplete={changeColorConfirm}
            />
          </Col>
          <Col lg="1" />
        </Row>
        <Row>
          <Col lg="1" />
          <Col className="pad" lg="8">
            Colorloop
          </Col>
          <Col className="pad" lg="2">
            <Toggle checked={this.state.colorLoop} onChange={colorLoop} />
          </Col>
          <Col lg="1" />
        </Row>
      </div>
    );
  }
}

LightDetails.propTypes = {
  modifyLight: PropTypes.func,
  modifyRoom: PropTypes.func,
  lightId: PropTypes.string,
  light: PropTypes.object,
  rooms: PropTypes.object,
  room: PropTypes.bool
};

const mapStateToProps = state => ({
  light: state.lights.list,
  rooms: state.rooms.list
});

const mapDispatchToProps = dispatch => ({
  modifyLight: bindActionCreators(modifyLight.request, dispatch),
  modifyRoom: bindActionCreators(modifyRoom.request, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LightDetails);
