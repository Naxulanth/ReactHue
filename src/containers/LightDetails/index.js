import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Brightness from 'components/Brightness'
import ColorPicker from 'components/ColorPicker'
import { modifyLight } from 'actions/lights'
import { getRGBtoXY, getFormattedXYtoRGB } from 'utils/colorConverter'
import { objectToArray } from 'utils'
import './index.css';

class LightDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brightness: 0,
            colorRgb: {}
        }
        this.changeBrightness = this.changeBrightness.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.changeColorConfirm = this.changeColorConfirm.bind(this);
    }

    componentDidMount() {
        const { light, lightId } = this.props;
        if (lightId) {
            let converted = getFormattedXYtoRGB(light, lightId)
            this.setState({
                brightness: Math.round(light[lightId].state.bri / 2.54),
                colorRgb: converted
            })
        }
    }

    componentDidUpdate(prevProps) {
        const { lightId, light } = this.props;
        if (prevProps.light[lightId].state.xy !== light[lightId].state.xy) {
            let converted = getFormattedXYtoRGB(light, lightId)
            this.setState({
                colorRgb: converted
            })
        }

    }

    changeBrightness(e) {
        this.setState({
            brightness: e
        })
        const { lightId, modifyLight } = this.props;
        modifyLight(lightId, { "bri": Math.round(e * 2.54) })
    }

    changeColor(color, event) {
        this.setState({
            colorRgb: color.rgb
        })
    }

    changeColorConfirm(color, event) {
        const { lightId, modifyLight } = this.props;
        let xy = getRGBtoXY(objectToArray(color.rgb).slice(0, 3));
        modifyLight(lightId, { "xy": xy })
    }

    render() {
        const { brightness, colorRgb } = this.state;
        const { changeBrightness, changeColor, changeColorConfirm } = this;
        return (
            <div ref={(e) => this.main = e} className="light-widget-details">
                <Row>
                    <Col lg="1" />
                    <Col lg="10"><Brightness onChange={changeBrightness} value={brightness} /></Col>
                    <Col lg="1" />
                </Row>
                <Row>
                    <Col lg="1" />
                    <Col lg="10"><ColorPicker color={colorRgb} onChange={changeColor} onChangeComplete={changeColorConfirm} /></Col>
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