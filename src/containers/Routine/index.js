import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { setSchedule } from "actions/schedules";
import { bindActionCreators } from "redux";
import Toggle from "components/Toggle";
import { absolute } from "utils/date";
import { objectToArray } from "utils";
import "./style.css";
import RoutineDetails from "../RoutineDetails";

class Routine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.findName = this.findName.bind(this);
  }


  handleToggle() {
    const { setSchedule, id, schedules, type } = this.props;
    let { localtime, time } = schedules[type][id];
    let localTime = localtime;
    if (!localTime.includes("W") && !localTime.includes("PT")) {
      if (localTime.includes("A")) {
        localTime = localTime.split("A");
        let left = localTime[0];
        let right = localTime[1];
        left = absolute(left);
        localTime = left + right;
      } else localTime = absolute(localtime, time);
    }
    setSchedule(id, {
      status: schedules[type][id].status === "enabled" ? "disabled" : "enabled",
      localtime: localTime
    });
  }

  handleDetails() {
    const { details } = this.state;
    this.setState({
      details: !details
    });
  }

  // api doesn't save name in schedule endpoint for 'sleep' type for some reason, need to get it through resourcelinks endpoint
  // resource links dont work for other types, got to get the other names the regular way
  findName() {
    const { resources, id } = this.props;
    if (resources && id) {
      let name = "";
      let found = false;
      objectToArray(resources).forEach(resource => {
        found = resource.links.some(link => {
          return link === "/schedules/" + id;
        });
        if (found) {
          name = resource.name;
          return;
        }
      });
      return name;
    }
  }

  render() {
    const { handleToggle, findName, handleDetails } = this;
    const { schedules, type, id, deleting } = this.props;
    const { details } = this.state;
    if (schedules && schedules[type] && schedules[type][id]) {
      return (
        <div className="routine-single">
          <Row>
            <Col lg="1" />
            <Col sm="7" md="7" lg="7" xl="7">
              <span className="routine-edit" onClick={handleDetails}>
                {type === "sleep" ? findName() : schedules[type][id].name}
              </span>
            </Col>
            <Col lg="3">
              <Toggle
                id={id}
                checked={schedules[type][id].status === "enabled"}
                onChange={handleToggle}
              />
            </Col>
            <Col lg="1" />
          </Row>
          <Row>
            <Col sm="12" md="12" lg="12" xl="12">
              {details ? (
                <RoutineDetails details={details} type={type} edit={id} />
              ) : null}
            </Col>
          </Row>
        </div>
      );
    } else return null;
  }
}

const mapStateToProps = state => ({
  schedules: state.schedules.list,
  resources: state.resources.list
});

const mapDispatchToProps = dispatch => ({
  setSchedule: bindActionCreators(setSchedule.request, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routine);
