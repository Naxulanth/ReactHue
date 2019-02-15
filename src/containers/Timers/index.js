import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Button } from 'components/Button';
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4';
import './style.css';

class Timers extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.mapTimers = this.mapTimers.bind(this);
    }


    mapTimers(timers) {
        return timers.map((timer) => {
            console.log(timer)
            return (
                <Row key={uuidv4()}>
                    <Col sm="8" md="8" lg="8" xl="8">
                        {timer.name}
                    </Col>
                </Row>
            )
        })
    }

    render() {
        const { mapTimers } = this;
        const { schedules } = this.props;
        if (schedules && schedules.timers) {
            console.log('ok')
            return (
                <div className="timers routines">
                    <div>
                        Timers
                    </div>
                    {mapTimers(schedules.timers)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Timers);