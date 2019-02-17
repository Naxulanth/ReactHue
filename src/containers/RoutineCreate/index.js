import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'
import TextInput from 'components/TextInput';
import { createSchedule } from 'actions/schedules';
import './style.css';

class RoutineCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

    }

    render() {
        const { handleSubmit } = this;
        return (
            <div className="routine-create">
            <Row>
            <Col lg="3" sm="3" md="3" xl="3"/>
                <Col lg="6" sm="6" md="6" xl="6">
                <form onSubmit={handleSubmit}>
                <TextInput placeholder={'Name...'}></TextInput>
                    </form>
                </Col>
                <Col lg="3" sm="3" md="3" xl="3"/>
            </Row>
            </div>
        )
    }

}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    createSchedule: bindActionCreators(createSchedule.request, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RoutineCreate);