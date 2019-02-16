import React, { Component } from 'react';
import RoutineTitle from 'components/RoutineTitle';
import { connect } from 'react-redux';
import Routine from 'containers/Routine'
import uuidv4 from 'uuid/v4';
import './style.css';

class Routines extends Component {

    constructor(props) {
        super(props);
        this.state = {
            routines: [],
        }
        this.mapRoutines = this.mapRoutines.bind(this);
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
        this.setState({routines: r})
    }

    render() {
        const { routines } = this.state;
        const { type, schedules } = this.props;
        if (schedules && schedules[type]) {
            return (
                <div className={"routines-main " + type}>
                    <div>
                        <RoutineTitle> {type.charAt(0).toUpperCase() + type.slice(1)} </RoutineTitle>
                    </div>
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