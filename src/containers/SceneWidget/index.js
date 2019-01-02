import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { modifyLight } from 'actions/lights'
import './index.css';
import { getXYtoRGB, getRGBtoXY } from 'utils/colorConverter'

import './index.css'

class SceneWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <div ref={(e) => this.main = e} className="scene-widget">
                <Row>
                    <Col lg="1"/>
                    <Col lg="10"> 
                    SceneWidget
                    </Col>
                    <Col lg="1"/>
                </Row>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    room: state.rooms.list,
    lights: state.lights.list
})


const mapDispatchToProps = dispatch => ({
    modifyLight: bindActionCreators(modifyLight.request, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(SceneWidget);