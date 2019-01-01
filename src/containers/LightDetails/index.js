import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Brightness from 'components/Brightness'
import ColorPicker from 'components/ColorPicker'
import { modifyLight } from 'actions/lights'
import { getXYtoRGB, getRGBtoXY } from 'utils/colorConverter'
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
    }

    componentDidMount() {
        const { light, lightId } = this.props;
        if (lightId) {
            let activeColor = {};
            let convertColor = getXYtoRGB(light[lightId].state.xy[0], light[lightId].state.xy[1], light[lightId].state.bri);
            activeColor.r = convertColor[0];
            activeColor.g = convertColor[1];
            activeColor.b = convertColor[2];
            this.setState({
                brightness: Math.round(light[lightId].state.bri / 2.54),
                colorRgb: activeColor
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
        const { lightId, modifyLight } = this.props;
        let xy = getRGBtoXY(objectToArray(color.rgb).slice(0, 3));
        modifyLight(lightId, { "xy": xy })
        this.setState({
            colorRgb: color.rgb
        })
    }

    render() {
        const { brightness, colorRgb } = this.state;
        const { changeBrightness, changeColor } = this;
        return (
            <div ref={(e) => this.main = e} className="light-widget-details">
                <Row>
                    <Col lg="1" />
                    <Col lg="10"><Brightness onChange={changeBrightness} value={brightness} /></Col>
                    <Col lg="1" />
                </Row>
                <Row>
                    <Col lg="1" />
                    <Col lg="10"><ColorPicker color={colorRgb} onChange={changeColor} /></Col>
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