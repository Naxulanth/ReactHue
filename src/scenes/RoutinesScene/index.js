import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Routines from "containers/Routines";
import { getSchedules } from "actions/schedules";
import { getResources } from "actions/resources";
import { getRules } from "actions/rules";
import { getSensors } from "actions/sensors";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./style.css";

class RoutinesScene extends Component {
  componentDidMount() {
    const { getSchedules, getResources, getRules, getSensors } = this.props;
    getSchedules();
    getResources();
    getRules();
    getSensors();
  }

  render() {
    return (
      <div className="routines-scene pad">
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
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getSchedules: bindActionCreators(getSchedules.request, dispatch),
  getResources: bindActionCreators(getResources.request, dispatch),
  getRules: bindActionCreators(getRules.request, dispatch),
  getSensors: bindActionCreators(getSensors.request, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutinesScene);
