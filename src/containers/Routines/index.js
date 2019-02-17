import React, { Component } from 'react';
import RoutineTitle from 'components/RoutineTitle';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Button from 'components/Button'
import Routine from 'containers/Routine'
import RoutineCreator from 'containers/RoutineCreate'
import uuidv4 from 'uuid/v4';
import './style.css';

class Routines extends Component {

    constructor(props) {
        super(props);
        this.state = {
            routines: [],
            creator: false,
        }
        this.mapRoutines = this.mapRoutines.bind(this);
        this.handleCreator = this.handleCreator.bind(this);
    }

    componentDidMount() {
        const { schedules, type } = this.props;
        if (schedules) {
            this.mapRoutines(type)
        }
    }

    componentDidUpdate() {
        const { schedules, type } = this.props;
        const { routines } = this.state;
        if (schedules && routines.length === 0) {
            this.mapRoutines(type)
        }
    }

    mapRoutines(type) {
        const { schedules } = this.props;
        const keys = Object.keys(schedules[type]);
        let r = keys.map((routine) => {
            return <Routine key={uuidv4()} type={type} id={routine} />
        })
        this.setState({ routines: r })
    }

    handleCreator() {
        const { creator } = this.state;
        this.setState({
            creator: !creator
        })
    }

    render() {
        const { routines, creator } = this.state;
        const { type, schedules } = this.props;
        const { handleCreator } = this;
        const create = creator ? ( <Row>
        <Col sm="12" md="12" lg="12" xl="12">
        <RoutineCreator/> 
        </Col>
        </Row> ) : null;
        if (schedules && schedules[type]) {
            return (
                <div className={"routines-main " + type}>
                    <Row className="vertical-center">
                        <Col sm="8" md="8" lg="8" xl="8">
                            <RoutineTitle> {type.charAt(0).toUpperCase() + type.slice(1)} </RoutineTitle>
                        </Col>
                        <Col className="align-right" sm="4" md="4" lg="4" xl="4">
                        <Button onClick={handleCreator} fullWidth>{creator ? "Cancel" : "Create"}</Button>
                        </Col>
                    </Row>
                    {create}
                    {routines}
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