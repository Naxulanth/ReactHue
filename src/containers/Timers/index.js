import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Button } from 'components/Button';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import './style.css';

class Timers extends Component {

    render() {
        return (
            <div className="timers routines">
                Timers
            </div>
        );
    }
}

const mapStateToProps = state => ({
    schedules: state.schedules.list,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Timers);