import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Wake from 'containers/Wake'
import Sleep from 'containers/Sleep'
import Timers from 'containers/Timers'
import { getSchedules } from 'actions/schedules';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import OtherRoutines from 'containers/OtherRoutines'
import './style.css';

class RoutinesScene extends Component {

    componentDidMount() {
        const { getSchedules } = this.props;
        getSchedules();
    }

    render() {
        return (
            <div className="routines-scene pad">
                <Row>
                    <Col lg={{ offset: 1, size: 5 }}>
                        <Wake />
                    </Col>
                    <Col lg="5">
                        <Sleep />
                    </Col>
                    <Col lg="1" />
                </Row>
                <Row>
                    <Col lg={{ offset: 1, size: 5 }}>
                        <Timers />
                    </Col>
                    <Col lg="5">
                        <OtherRoutines />
                    </Col>
                    <Col lg="1" />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    getSchedules: bindActionCreators(getSchedules.request, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RoutinesScene);
