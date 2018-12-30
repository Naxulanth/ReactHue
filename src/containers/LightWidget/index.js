import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Row, Col } from 'reactstrap';

import Toggle from 'components/Toggle'
import LightDetails from 'containers/LightDetails'

import colorChanger from 'utils/colorChanger';
import { getLights } from 'actions/lights'

import './index.css';

class LightWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lightName: 'Main',
            expanded: false,
        }
        this.expand = this.expand.bind(this);
    }

    expand() {
        this.props.getLights();
        this.setState({
            expanded: !this.state.expanded
        })
    }


    render() {
        const { expanded, lightName } = this.state;
        const { expand } = this;
        let details = expanded ? <LightDetails /> : null;
        return (
            <div ref={(e) => this.main = e} className="light-widget">
                <Row>
                    <Col lg="8">
                        {lightName}
                    </Col>
                    <Col lg="4">
                        <Toggle onChange={expand} />
                    </Col>
                </Row>
                {details}
            </div>
        )
    }

}

const mapStateToProps = state => ({
    id: state.lights.id,
})

const mapDispatchToProps = dispatch => ({
    getLights: bindActionCreators(getLights.request, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LightWidget);