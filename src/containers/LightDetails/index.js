import React, { Component } from 'react';
import './index.css';
import { Row, Col } from 'reactstrap';

import Brightness from 'components/Brightness'
import ColorPicker from 'components/ColorPicker'

class LightDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 50,
            colorHex: '#fff',
            colorRgb: null,
        }
        this.changeBrightness = this.changeBrightness.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    changeBrightness(e) {
        this.setState({
            value: e
        })
    }

    changeColor(color, event) {
        this.setState({
            colorHex: color.hex,
            colorRgb: color.rgb
        })
    }   
    render() {
        const { value, colorHex } = this.state;
        const { changeBrightness, changeColor } = this;
        return (
            <div ref={(e) => this.main = e} className="light-widget-details">
                <Row>
                    <Col lg="1" />
                    <Col lg="10"><Brightness onChange={changeBrightness} value={value} /></Col>
                    <Col lg="1" />
                </Row>
                <Row>
                    <Col lg="1" />
                    <Col lg="10"><ColorPicker color={colorHex} onChange={changeColor} /></Col>
                    <Col lg="1" />
                </Row>
            </div>
        )
    }

}

export default LightDetails;