import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import uuidv4 from 'uuid/v4'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class RoutineWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="routine-widget">
            </div>
        )
    }

}

RoutineWidget.propTypes = {
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(RoutineWidget);