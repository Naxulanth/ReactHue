import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import RoutineTitle from 'components/RoutineTitle';
import { Button } from 'components/Button';
import { connect } from 'react-redux';
import Toggle from 'components/Toggle'
import uuidv4 from 'uuid/v4';
import './style.css';

class Routines extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.mapRoutines = this.mapRoutines.bind(this);
    }


    mapRoutines(routines) {
        return routines.map((timer) => {
            return (
                <Row key={uuidv4()}>
                    <Col lg="1" />
                    <Col sm="7" md="7" lg="7" xl="7">
                        {timer.name}
                    </Col>
                    <Col lg="3">
                        <Toggle />
                    </Col>
                    <Col lg="1" />
                </Row>
            )
        })
    }

    render() {
        const { mapRoutines } = this;
        const { schedules, type } = this.props;
        if (schedules && schedules[type]) {
            return (
                <div className={"routines-main " + type}>
                    <div>
                        <RoutineTitle> {type.charAt(0).toUpperCase() + type.slice(1)} </RoutineTitle>
                    </div>
                    {mapRoutines(schedules[type])}
                </div>
            );
        }
        else return null;
    }
}

const mapStateToProps = state => ({
    schedules: state.schedules.list,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Routines);