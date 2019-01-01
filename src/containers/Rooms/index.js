import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import Title from 'components/Title';
import RoomWidget from 'containers/RoomWidget'
import './index.css';
import uuidv4 from 'uuid/v4'

import { getRooms } from 'actions/rooms'
import { getLights } from 'actions/lights'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { isEmpty, objectToArray } from 'utils'

class Rooms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            roomAmount: '0',
        }
        this.populateWidgets = this.populateWidgets.bind(this);
    }

    componentDidMount() {
        this.props.getRooms();
        this.props.getLights();
    }

    componentDidUpdate(prevProps) {
        if (this.state.rooms.length === 0 && this.props.lights && this.props.rooms) {
            this.populateWidgets(this.props.rooms)
        }
    }

    populateWidgets(obj) {
        let rooms = objectToArray(obj);
        let rows = [];
        let acc = 0;
        let insert = [];
        while (rooms.length) rows.push(rooms.splice(0, 3));
        rows.forEach((row, i) => {
            let temp = [];
            let subInsert = <Row key={uuidv4()}><Col lg="1" />{temp}<Col lg="1" /></Row>;
            row.forEach((room, j) => {
                let roomId = (i * 3) + j + 1;
                temp.push(<Col key={uuidv4()} lg={{ size: 3 }}>
                    <RoomWidget roomId={roomId} />
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
    rooms: state.rooms.list,
    lights: state.lights.list,
})

const mapDispatchToProps = dispatch => ({
    getRooms: bindActionCreators(getRooms.request, dispatch),
    getLights: bindActionCreators(getLights.request, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);