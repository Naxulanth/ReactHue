import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'
import Button from 'components/Button'
import TextInput from 'components/TextInput';
import { createSchedule } from 'actions/schedules';
import './style.css';

class RoutineDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
    }

    handleName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit(e) {
        const { type } = this.props;
        const { name } = this.state;
        let obj = {};
        obj.description = type;
        obj.name = name;
        obj.status = "enabled";
        
    }

    render() {
        const { handleSubmit, handleName } = this;
        const { name } = this.state;
        return (
            <div className="routine-create">
            <Row>
            <Col lg="3" sm="3" md="3" xl="3"/>
                <Col className="center" lg="6" sm="6" md="6" xl="6">
                <TextInput onChange={handleName} value={name} placeholder={'Name...'}></TextInput>
                <Button onClick={handleSubmit}> Create </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(RoutineDetails);