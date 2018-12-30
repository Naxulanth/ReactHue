import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import Title from 'components/Title';
import RoomWidget from 'containers/RoomWidget'
import './index.css';
import uuidv4 from 'uuid/v4'

import { getLights } from 'actions/lights'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class Rooms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomAmount: '0',
            redirect: false,
            rooms: []
        }
        this.populateWidgets = this.populateWidgets.bind(this);
    }

    componentDidMount() {
        this.props.getLights();
        this.populateWidgets([0, 0, 0, 0, 0, 0])
    }

    populateWidgets(arr) {
        let rows = [];
        let acc = 0;
        while (arr.length) rows.push(arr.splice(0, 3));
        let insert = [];
        rows.forEach((row, i) => {
            let temp = [];
            let subInsert = <Row key={uuidv4()}><Col lg="1" />{temp}<Col lg="1" /></Row>;
            row.forEach((j) => {
                temp.push(<Col key={uuidv4()} lg={{ size: 3 }}>
                    <RoomWidget />
                </Col>
                )
                acc++;
            })
            insert.push(subInsert)
        })
        this.setState({
            rooms: insert,
            roomAmount: acc
        })
    }

    render() {
        const { roomAmount, rooms } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col lg="1" />
                    <Col className="title-text" lg={{ size: 9 }}>
                        <Title>Your Rooms ({roomAmount})</Title>
                    </Col>
                    <Col lg="1" />
                </Row>
                {rooms}
            </Fragment>
        )
    }

}


const mapStateToProps = state => ({
    id: state.lights.id,
})

const mapDispatchToProps = dispatch => ({
    getLights: bindActionCreators(getLights.request, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);