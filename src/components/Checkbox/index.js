import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import "./style.css";

class CheckboxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  render() {
    const { children, onChange, checked, name } = this.props;
    return (
      <div className="checkbox-main">
        <Row>
          <Col lg="12" sm="12" md="12">
            <label className="checkbox-container">
              <input
                className="checkbox"
                name={name}
                checked={checked}
                type="checkbox"
                onChange={onChange}
                disabled={this.state.disabled}
              />
              <span className="checkmark" />
            </label>
          </Col>
        </Row>
        <Row>
          <Col className="checkbox-text" lg="12" sm="12" md="12">
            {children}
          </Col>
        </Row>
      </div>
    );
  }
}

export default CheckboxComponent;
