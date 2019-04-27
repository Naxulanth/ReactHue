import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
import uuidv4 from "uuid/v4";
import { connect } from "react-redux";
import EditableLabel from "react-inline-editing";
import PropTypes from "prop-types";
import Select from "react-select";
import { sceneSelectStyle } from "constants/selectStyle";
import { getXYtoRGB, getFormattedXYtoRGB } from "utils/colorConverter";
import "./style.css";
import colorChanger from "utils/colorChanger";
import { objectToArray } from "utils";

class RoomSetupSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  handleChange = e => {
    this.setState({
      selected: e
    });
  };

  render() {
    const { roomId, room, rooms, lights, lightId } = this.props;
    const { props, selected } = this.state;
    console.log(rooms);
    return (
      <Fragment>
        <Row className="vertical-center rsetup-single">
          <Col lg="6">{lights[lightId].name}</Col>
          <Col className="center" lg="6">
            <Select
              onChange={this.handleChange}
              value={selected}
              options={Object.keys(rooms).map(roomKey => {
                let room = rooms[roomKey];
                return { label: room.name, value: roomKey };
              })}
              styles={sceneSelectStyle}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

RoomSetupSingle.propTypes = {
  lights: PropTypes.object,
  room: PropTypes.object,
  roomId: PropTypes.string
};

const mapStateToProps = state => ({
  rooms: state.rooms.list,
  lights: state.lights.list
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomSetupSingle);
