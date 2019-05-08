import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash/core";
import PropTypes from "prop-types";
import uuidv4 from "uuid/v4";
import Title from "components/Title";
import RoomSetupWidget from "containers/RoomSetupWidget";
import RoomSetupSingle from "containers/RoomSetupSingle";
import { getRooms } from "actions/rooms";
import { getLights } from "actions/lights";
import "./style.css";

import { objectToArray } from "utils";

class RoomSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      roomAmount: "0"
    };
    this.populateWidgets = this.populateWidgets.bind(this);
  }

  componentDidMount() {
    const { getRooms, getLights } = this.props;
    getRooms();
    getLights();
  }

  componentDidUpdate(prevProps) {
    const { lights, rooms } = this.props;
    if (
      lights &&
      rooms &&
      (this.state.rooms.length === 0 || !_.isEqual(prevProps.rooms, rooms))
    ) {
      this.populateWidgets(rooms);
    }
  }

  populateWidgets(obj) {
    let rooms = objectToArray(obj);
    let rows = [];
    let acc = 0;
    let insert = [];
    while (rooms.length) rows.push(rooms.splice(0, 3));
    rows.forEach((row, i) => {
      let temp = [];
      let subInsert = (
        <Row key={uuidv4()}>
          <Col lg="1" />
          {temp}
          <Col lg="1" />
        </Row>
      );
      row.forEach((room, j) => {
        let roomId = i * 3 + j + 1;
        temp.push(
          <Col key={uuidv4()} lg={{ size: 3 }}>
            <RoomSetupWidget roomId={roomId.toString()} />
          </Col>
        );
        acc++;
      });
      insert.push(subInsert);
    });
    this.setState({
      rooms: insert,
      roomAmount: acc
    });
  }

  findUnassigned() {
    const { lights, rooms } = this.props;
    let allRooms = [];
    Object.keys(rooms).forEach(
      r => (allRooms = allRooms.concat(rooms[r].lights))
    );
    let unassigned = Object.keys(lights)
      .filter(l => !allRooms.includes(l))
      .map(u => {
        lights[u].key = u;
        return lights[u];
      });
    console.log(unassigned);
    return unassigned;
  }

  render() {
    const { rooms } = this.state;
    const { lights } = this.props;
    let unassigned =
      rooms &&
      lights &&
      this.findUnassigned().map(u => <RoomSetupSingle lightId={u.key} />);
    return (
      <Fragment>
        <Row>
          <Col lg="1" />
          <Col className="title-text" lg={{ size: 9 }}>
            <Title>Room Setup</Title>
          </Col>
          <Col lg="1" />
        </Row>
        {unassigned ? (
          <Fragment>
            <Row style={{ marginBottom: "50px" }}>
              <Col lg="1" />
              <Col lg="3">Unassigned Lights</Col>
              <Col lg="1" />
            </Row>
            <Row style={{ marginBottom: "50px" }}>
              <Col lg="1" />
              <Col lg="3">{unassigned}</Col>
              <Col lg="1" />
            </Row>
          </Fragment>
        ) : null}
        {rooms}
      </Fragment>
    );
  }
}

RoomSetup.propTypes = {
  getRooms: PropTypes.func,
  getLights: PropTypes.func,
  lights: PropTypes.object,
  rooms: PropTypes.object,
  scenes: PropTypes.object
};

const mapStateToProps = state => ({
  rooms: state.rooms.list,
  lights: state.lights.list
});

const mapDispatchToProps = dispatch => ({
  getRooms: bindActionCreators(getRooms.request, dispatch),
  getLights: bindActionCreators(getLights.request, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomSetup);
