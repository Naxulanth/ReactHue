import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
import uuidv4 from "uuid/v4";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import EditableLabel from "react-inline-editing";
import PropTypes from "prop-types";
import Select from "react-select";
import { modifyRoomAttr } from "actions/rooms";
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
    const { rooms, modifyRoomAttr, lightId } = this.props;
    this.setState({
      selected: e
    });
    let room = rooms[e.value];
    Object.keys(rooms).forEach(roomKey => {
      let r = rooms[roomKey];
      r.lights.filter(l => l !== lightId);
      modifyRoomAttr(roomKey, r);
    });
    room.lights.push(lightId);
    modifyRoomAttr(e.value, room);
  };

  render() {
    const { roomId, room, rooms, lights, lightId } = this.props;
    const { props, selected } = this.state;
    return (
      <Fragment>
        <Row className="vertical-center rsetup-single">
          <Col lg="6">{lights[lightId].name}</Col>
          <Col className="center" lg="6">
            <Select
              onChange={this.handleChange}
              value={selected}
              options={Object.keys(rooms)
                .map(roomKey => {
                  let room = rooms[roomKey];
                  return { label: room.name, value: roomKey };
                })
                .filter(e => e.label !== room.name)}
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
  rooms: PropTypes.object
};

const mapStateToProps = state => ({
  rooms: state.rooms.list,
  lights: state.lights.list
});

const mapDispatchToProps = dispatch => ({
  modifyRoomAttr: bindActionCreators(modifyRoomAttr.request, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomSetupSingle);
