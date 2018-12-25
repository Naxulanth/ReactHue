import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import Title from 'components/Title';
import RoomWidget from 'containers/RoomWidget'
import './index.css';

class Rooms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomAmount: '0',
            redirect: false,
        }
    }

    render() {
        const { roomAmount } = this.state;
        return (
            <Fragment>
            <Row>
                <Col className="title-text" lg={{ offset: 1, size: 11 }}>
                    <Title>Your Rooms ({roomAmount})</Title>
                </Col>
            </Row>
            <Row>
                <Col/>
                <Col lg={{ size: 3 }}>
                <RoomWidget/>
                </Col>
                <Col lg={{ size: 3 }}>
                <RoomWidget/>
                </Col>
                <Col lg={{ size: 3 }}>
                <RoomWidget/>
                </Col>
                <Col/>
            </Row>
            </Fragment>
        )
    }

}

export default Rooms;