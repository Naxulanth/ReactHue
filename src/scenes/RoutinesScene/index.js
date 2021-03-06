import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Routines from "containers/Routines";
import Title from "components/Title";
import { getSchedules } from "actions/schedules";
import { getResources } from "actions/resources";
import { getRules } from "actions/rules";
import { getSensors } from "actions/sensors";
import { getRooms } from "actions/rooms";
import { getScenes } from "actions/scenes";
import { getLights } from "actions/lights";
import "./style.css";

class RoutinesScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false
    };
  }

  componentDidMount() {
    const {
      getSchedules,
      getResources,
      getRules,
      getSensors,
      getRooms,
      getLights,
      getScenes
    } = this.props;
    getSchedules();
    getResources();
    getRules();
    getSensors();
    getRooms();
    getLights();
    getScenes();
  }

  render() {
    return (
      <Fragment>
      <Row>
      <Col lg="1" />
      <Col className="title-text" lg={{ size: 9 }}>
        <Title>Routines</Title>
      </Col>
      <Col lg="1" />
    </Row>
      <div>
        <Row>
          <Col lg={{ offset: 1, size: 5 }}>
            <Routines type="wake" />
          </Col>
          <Col lg="5">
            <Routines type="sleep" />
          </Col>
          <Col lg="1" />
        </Row>
        <Row>
          <Col lg={{ offset: 1, size: 5 }}>
            <Routines type="timers" />
          </Col>
          <Col lg="5">
            <Routines type="routines" />
          </Col>
          <Col lg="1" />
        </Row>
      </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  schedules: state.schedules.list,
  resources: state.resources.list
});

const mapDispatchToProps = dispatch => ({
  getSchedules: bindActionCreators(getSchedules.request, dispatch),
  getResources: bindActionCreators(getResources.request, dispatch),
  getRules: bindActionCreators(getRules.request, dispatch),
  getSensors: bindActionCreators(getSensors.request, dispatch),
  getRooms: bindActionCreators(getRooms.request, dispatch),
  getLights: bindActionCreators(getLights.request, dispatch),
  getScenes: bindActionCreators(getScenes.request, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutinesScene);
