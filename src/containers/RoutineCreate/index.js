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
            <Col lg="2" sm="2" md="2" xl="2"/>
                <Col lg="8" sm="8" md="8" xl="8">
                <form onSubmit={handleSubmit}>
                <TextInput placeholder={'Name...'}></TextInput>
                    </form>
                </Col>
                <Col lg="2" sm="2" md="2" xl="2"/>
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