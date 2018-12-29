import React, { Component } from 'react';
import './index.css';
import { Row, Col } from 'reactstrap';

import Brightness from 'components/Brightness'

class LightDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 50
        }
        this.change = this.change.bind(this);
    }

    change(e) {
        this.setState({
            value: e
        })
    }


    render() {
        const { value, defaultValue } = this.state;
        const { change } = this;
        return (
            <div ref={(e) => this.main = e} className="light-widget-details">
                <Row>
                    <Col lg ="1"/>
                    <Col lg="10"><Brightness onChange={change} value={value}/></Col>
                    <Col lg ="1"/>
                </Row>
                <Row>
                    <Col lg="12"><div>color picker</div></Col>
                </Row>
            </div>
        )
    }

}

export default LightDetails;