import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';

import Toggle from 'components/Toggle'
import LightDetails from 'containers/LightDetails'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
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
        let { modifyLight, light } = this.props;
        modifyLight(light.id, {"on": !light.state.on})
    }


    render() {
        const { expand } = this;
        const { light } = this.props;
        console.log(light)
        let details = light.state.on ? <LightDetails /> : null;
        return (
            <div ref={(e) => this.main = e} className="light-widget">
                <Row>
                    <Col lg="8">
                        {light.name}
                    </Col>
                    <Col lg="4">
                        <Toggle checked={light.state.on} onChange={expand} />
                    </Col>
                </Row>
                {details}
            </div>
        )
    }

}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    modifyLight: bindActionCreators(modifyLight.request, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(LightWidget);