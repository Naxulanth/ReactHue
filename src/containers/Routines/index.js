import React, { Component } from "react";
import RoutineTitle from "components/RoutineTitle";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import Button from "components/Button";
import Routine from "containers/Routine";
import RoutineDetails from "containers/RoutineDetails";
import TimerDetails from "containers/TimerDetails";
import Animate from "components/Animate";
import uuidv4 from "uuid/v4";
import "./style.css";

class Routines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routines: [],
      creator: false
    };
    this.mapRoutines = this.mapRoutines.bind(this);
    this.handleCreator = this.handleCreator.bind(this);
  }

  componentDidMount() {
    const { schedules, type } = this.props;
    if (schedules) {
      this.mapRoutines(type);
    }
  }

  componentDidUpdate() {
    const { schedules, type } = this.props;
    const { routines } = this.state;
    if (schedules && routines.length === 0) {
      this.mapRoutines(type);
    }
  }

  mapRoutines(type) {
    const { schedules } = this.props;
    const keys = Object.keys(schedules[type]);
    if (keys.length > 0) {
      let r = keys.map(routine => {
        return <Routine key={uuidv4()} type={type} id={routine} />;
      });
      this.setState({ routines: r });
    }
  }

  handleCreator() {
    const { creator } = this.state;
    this.setState({
      creator: !creator
    });
  }

  render() {
    const { routines, creator } = this.state;
    const { type, schedules } = this.props;
    const { handleCreator } = this;
    const details =
      type === "timers" ? (
        <Animate pose={creator ? "visible" : "hidden"}>
          <TimerDetails />
        </Animate>
      ) : (
        <Animate pose={creator ? "visible" : "hidden"}>
          <RoutineDetails type={type} />
        </Animate>
      );
    if (schedules && schedules[type]) {
      return (
        <div className={"routines-main " + type}>
        <div className="child">
          <Row className="vertical-center push-bottom">
            <Col sm="8" md="8" lg="8" xl="8">
              <RoutineTitle>
                {" "}
                {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
              </RoutineTitle>
            </Col>
            <Col className="align-right" sm="4" md="4" lg="4" xl="4">
              <Button onClick={handleCreator} width="true">
                {creator ? "Cancel" : "Create"}
              </Button>
            </Col>
          </Row>
          <div style={{ pointerEvents: creator ? "auto" : "none" }}>
            {details}
          </div>
          {routines}
        </div>
        </div>
      );
    } else return null;
  }
}

const mapStateToProps = state => ({
  schedules: state.schedules.list
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routines);
