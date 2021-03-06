import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import Toggle from "components/Toggle";
import Animate from "components/Animate";
import LightDetails from "containers/LightDetails";
import { modifyLight, modifyLightAttr } from "actions/lights";
import { getXYtoRGB } from "utils/colorConverter";

import EditableLabel from "react-inline-editing";

import "./style.css";

class LightWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightName: ""
    };
    this.expand = this.expand.bind(this);
    this.changeName = this.changeName.bind(this);
    this.main = React.createRef();
  }

  expand() {
    let { modifyLight, light, lightId } = this.props;
    modifyLight(lightId, { on: !light[lightId].state.on });
  }

  changeName(e) {
    let { lightId, modifyLightAttr } = this.props;
    this.setState({
      lightName: e
    });
    modifyLightAttr(lightId, { name: e });
  }

  render() {
    const { expand } = this;
    const { light, lightId } = this.props;
    let toggleColor = getXYtoRGB(
      light[lightId].state.xy[0],
      light[lightId].state.xy[1],
      light[lightId].state.bri
    ).join(",");
    return (
      <div ref={this.main} className="light-widget">
        <Row>
          <Col lg="1" />
          <Col lg="7">
            <span
              className="color-preview"
              style={{ background: "rgb(" + toggleColor + ")" }}
            />
            <div className="wrap">
              <EditableLabel
                text={light[lightId].name}
                onFocusOut={this.changeName}
                inputWidth="120px"
              />
            </div>
          </Col>
          <Col lg="3">
            <Toggle checked={light[lightId].state.on} onChange={expand} />
          </Col>
          <Col lg="1" />
        </Row>
        <div
          style={{ pointerEvents: light[lightId].state.on ? "auto" : "none" }}
        >
          <Animate pose={light[lightId].state.on ? "visible" : "hidden"}>
            <LightDetails lightId={lightId.toString()} />
          </Animate>
        </div>
      </div>
    );
  }
}

LightWidget.propTypes = {
  modifyLight: PropTypes.func,
  modifyLightAttr: PropTypes.func,
  lightId: PropTypes.string,
  light: PropTypes.object
};

const mapStateToProps = state => ({
  light: state.lights.list
});

const mapDispatchToProps = dispatch => ({
  modifyLight: bindActionCreators(modifyLight.request, dispatch),
  modifyLightAttr: bindActionCreators(modifyLightAttr.request, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LightWidget);
