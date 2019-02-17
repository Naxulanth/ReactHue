import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { setSchedule } from 'actions/schedules';
import { bindActionCreators } from 'redux';
import Toggle from 'components/Toggle'
import './style.css';


class Routine extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        const { setSchedule, id, schedules, type } = this.props;
        setSchedule(id, {
            "status": schedules[type][id].status === "enabled" ? "disabled" : "enabled",
        })
    }

    render() {
        const { handleToggle } = this;
        const { schedules, type, id } = this.props;
        if (schedules && schedules[type]) {
        return (
            <Row className="routine-single">
            <Col lg="1" />
            <Col sm="7" md="7" lg="7" xl="7">
                {schedules[type][id].name}
            </Col>
            <Col lg="3">
                <Toggle id={id} checked={schedules[type][id].status === "enabled" ? true : false} onChange={handleToggle} />
            </Col>
            <Col lg="1" />
        </Row>
        )
        }
        else return null;
    }
}

const mapStateToProps = state => ({
    schedules: state.schedules.list,
})

const mapDispatchToProps = dispatch => ({
    setSchedule: bindActionCreators(setSchedule.request, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Routine);