import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Toggle from 'components/Toggle'
import Animate from 'components/Animate'
import LightDetails from 'containers/LightDetails'
import { modifyLight } from 'actions/lights'
import './index.css';


class LightWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.expand = this.expand.bind(this);
    }

    expand() {
        let { modifyLight, light, lightId } = this.props;
        modifyLight(lightId, { "on": !light[lightId].state.on })
    }


    render() {
        const { expand } = this;
        const { light, lightId } = this.props;
        return (
            <div ref={(e) => this.main = e} className="light-widget">
                <Row>
                    <Col lg="8">
                        {light[lightId].name}
                    </Col>
                    <Col lg="4">
                        <Toggle checked={light[lightId].state.on} onChange={expand} />
                    </Col>
                </Row>
                <Animate pose={light[lightId].state.on ? 'visible' : 'hidden'}><LightDetails lightId={lightId} /></Animate>
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


export default connect(mapStateToProps, mapDispatchToProps)(LightWidget);