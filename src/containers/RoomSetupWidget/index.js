import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import uuidv4 from "uuid/v4";
import { connect } from "react-redux";
import EditableLabel from "react-inline-editing";
import PropTypes from "prop-types";
import { getXYtoRGB, getFormattedXYtoRGB } from "utils/colorConverter";
import "./style.css";
import colorChanger from "utils/colorChanger";
import { objectToArray } from "utils";

class RoomSetupWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lights: []
    };
    this.c = null;
    this.id = "RoomSetupWidget" + props.roomId;
    this.main = React.createRef();
  }

  componentDidMount() {
    const { room, roomId } = this.props;
    const lightIds = room[roomId].lights;
    if (lightIds) {
      this.populateLights(lightIds);
    }
  }

  populateLights(arr) {
    let insert = [];
    arr.forEach((lightId, i) => {
      insert.push(
        <Row key={uuidv4()}>
          <Col lg="12" sm="12" md="12" xl="12">
            test
          </Col>
        </Row>
      );
    });
    this.setState({
      lights: insert
    });
  }

  render() {
    const { roomId, room } = this.props;
    const { lights } = this.state;
    return (
      <div ref={this.main} className="room-setup-widget">
        <div className="child">
          <Row>
            <Col lg="1" sm="1" md="1" xl="1" />
            <Col lg="10" sm="10" md="10" xl="10">
              <EditableLabel
                text={room[roomId].name}
                onFocusOut={this.changeName}
                labelFontSize="22px"
                inputFontSize="22px"
                inputHeight="40px"
                inputWidth="200px"
              />
              {lights}
            </Col>
            <Col lg="1" sm="1" md="1" xl="1" />
          </Row>
        </div>
      </div>
    );
  }
}

RoomSetupWidget.propTypes = {
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
)(RoomSetupWidget);
