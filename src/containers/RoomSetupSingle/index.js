import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import EditableLabel from "react-inline-editing";
import Select from "react-select";
import { modifyRoomAttr } from "actions/rooms";
import { modifyLightAttr } from "actions/lights";
import { sceneSelectStyle } from "constants/selectStyle";
import "./style.css";

class RoomSetupSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      loading: false
    };
    this.changeName = this.changeName.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    const { rooms, modifyRoomAttr, lightId } = this.props;
    this.setState({
      selected: e,
      loading: true
    });
    let room = rooms[e.value];
    Object.keys(rooms).forEach(roomKey => {
      let r = rooms[roomKey];
      r.lights = r.lights.filter(l => {
        return parseInt(l) !== parseInt(lightId);
      });
      modifyRoomAttr(roomKey, { lights: r.lights });
    });
    room.lights.push(lightId);
    modifyRoomAttr(e.value, { lights: room.lights });
  };

  changeName(e) {
    let { lightId, modifyLightAttr } = this.props;
    this.setState({
      lightName: e
    });
    modifyLightAttr(lightId, { name: e });
  }

  render() {
    const { room, rooms, lights, lightId } = this.props;
    const { selected, loading } = this.state;
    let opts = Object.keys(rooms).map(roomKey => {
      let room = rooms[roomKey];
      return { label: room.name, value: roomKey };
    });
    return (
      <Fragment>
        <Row className="vertical-center rsetup-single">
          <Col lg="6">
            <EditableLabel
              text={lights[lightId].name}
              onFocusOut={this.changeName}
              inputWidth="120px"
            />
          </Col>
          <Col className="center" lg="6">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Select
                onChange={this.handleChange}
                value={selected}
                options={room ? opts.filter(e => e.label !== room.name) : opts}
                styles={sceneSelectStyle}
              />
            )}
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
  modifyRoomAttr: bindActionCreators(modifyRoomAttr.request, dispatch),
  modifyLightAttr: bindActionCreators(modifyLightAttr.request, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomSetupSingle);
