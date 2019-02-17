import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { setSchedule } from 'actions/schedules';
import { bindActionCreators } from 'redux';
import Toggle from 'components/Toggle'
import { calibrate } from 'utils/date'
import {objectToArray} from 'utils'
import './style.css';

class Routine extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.findName = this.findName.bind(this);
    }

    handleToggle() {
        const { setSchedule, id, schedules, type } = this.props;
        let { localtime, time} = schedules[type][id];
        let localTime = calibrate(localtime, time)
        setSchedule(id, {
            "status": schedules[type][id].status === "enabled" ? "disabled" : "enabled",
            "localtime": localTime
        }) 
    }

    // api doesn't save name for 'sleep' type for some reason, need to get it through resource links
    // resource links dont work for other types, got to get the other names the regular way
    findName() {
        const { resources, id } = this.props;
        if (resources && id) {
        let name = '';
        let found = false;
        objectToArray(resources).forEach( (resource) => {
            found = resource.links.some( (link) => {
                return link === '/schedules/' + id
            })
            if (found) {
                name = resource.name
                return;
            }
        })
        return name;
    }
    }

    render() {
        const { handleToggle, findName } = this;
        const { schedules, type, id } = this.props;
        if (schedules && schedules[type]) {
        return (
            <Row className="routine-single">
            <Col lg="1" />
            <Col sm="7" md="7" lg="7" xl="7">
                {type === 'sleep' ? findName() : schedules[type][id].name}
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
    resources: state.schedules.resources
})

const mapDispatchToProps = dispatch => ({
    setSchedule: bindActionCreators(setSchedule.request, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Routine);