import React, { Component } from 'react';
import './index.css';
import { Row, Col } from 'reactstrap';

class LightDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div ref={(e) => this.main = e} className="light-widget-details">
                <Row>
                    <Col lg="12"><div>slider</div></Col>
                </Row>
                <Row>
                    <Col lg="12"><div>color picker</div></Col>
                </Row>
            </div>
        )
    }

}

export default LightDetails;