import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
import uuidv4 from "uuid/v4";
import { connect } from "react-redux";
import EditableLabel from "react-inline-editing";
import PropTypes from "prop-types";
import SceneSelect from "components/SceneSelect";
import { getXYtoRGB, getFormattedXYtoRGB } from "utils/colorConverter";
import "./style.css";
import colorChanger from "utils/colorChanger";
import { objectToArray } from "utils";

class RoomSetupSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { roomId, room } = this.props;
    const { lights } = this.state;
    return (
      <Fragment>
        <Row>
          <Col lg="6">test</Col>
          <Col className="right" lg="6">selector</Col>
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
  room: state.rooms.list,
  lights: state.lights.list
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomSetupSingle);
