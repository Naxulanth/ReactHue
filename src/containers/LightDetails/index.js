import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Brightness from 'components/Brightness'
import ColorPicker from 'components/ColorPicker'
import { modifyLight } from 'actions/lights'
import './index.css';

class LightDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            colorHex: '#fff',
            colorRgb: null,
        }
        this.changeBrightness = this.changeBrightness.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    componentDidMount() {
        const { light, lightId } = this.props;
        if (lightId) {
            this.setState({
                value: Math.round(light[lightId].state.bri / 2.54),
            })
        }
    }

    changeBrightness(e) {
        this.setState({
            value: e
        })
        const { lightId, modifyLight } = this.props;
        modifyLight(lightId, { "bri": Math.round(e * 2.54) })
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

const mapStateToProps = state => ({
    light: state.lights.list
})

const mapDispatchToProps = dispatch => ({
    modifyLight: bindActionCreators(modifyLight.request, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(LightDetails);