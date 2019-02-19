import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'
import Button from 'components/Button'
import TextInput from 'components/TextInput';
import TimePicker from 'components/TimePicker';
import DayPicker from 'containers/DayPicker'
import { createSchedule } from 'actions/schedules';
import Select from 'react-select'
import { wakeFade, sleepFade, otherFade } from 'constants/fade';
import { selectStyle } from 'constants/selectStyle'
import './style.css';
import moment from 'moment';

moment().format();

class RoutineDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            days: {},
            fadeSelect: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.getDays = this.getDays.bind(this);
        this.handleFade = this.handleFade.bind(this);
    }

    handleName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleFade(e) {
        this.setState({
            fadeSelect: e
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

    getDays(days) {
        this.setState({
            days
        })
    }

    render() {
        const { handleSubmit, handleName, getDays, handleFade } = this;
        const { name, fadeSelect } = this.state;
        const { type } = this.props;
        return (
            <div className="routine-details">
            <Row>
            <Col lg="3" sm="3" md="3" xl="3"/>
                <Col className="center" lg="6" sm="6" md="6" xl="6">
                <TextInput onChange={handleName} value={name} placeholder={'Name...'}></TextInput>
                </Col>
                <Col lg="3" sm="3" md="3" xl="3"/>
            </Row>
            <Row className="vertical-center">
            <Col lg="3" sm="3" md="3" xl="3"/>
            <Col className="center" lg="3" sm="3" md="3" xl="3">
            <Select
            placeholder={"Fade"}
            value={fadeSelect}
            onChange={handleFade}
            styles={selectStyle}
            options={type === "wake" ? wakeFade : type === "sleep" ? sleepFade : otherFade}
            />
            </Col>
            <Col lg="2" sm="2" md="2" xl="2">
            <TimePicker placeholder={'Pick time'} showSecond={false} use12Hours allowEmpty={false}/>
            </Col>
                <Col lg="6" sm="6" md="6" xl="6"/>
            </Row>
            <Row  className="vertical-center">
            <Col lg="3" sm="3" md="3" xl="3"/>
            <Col className="day-picker-col" lg="6" sm="6" md="6" xl="6">
            <DayPicker days={getDays}/>
            </Col>
            <Col lg="3" sm="3" md="3" xl="3"/>
            </Row>
            <Row>
            <Col lg="3" sm="3" md="3" xl="3"/>
                <Col className="center" lg="6" sm="6" md="6" xl="6">
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