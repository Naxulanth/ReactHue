import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Title from 'components/Title';
import './index.css';

class Rooms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ip: '',
            username: '',
            text: '',
            redirect: false,
        }
    }

    render() {

        return (
            <Row>
                <Col className="title-text" lg={{ offset: 1, size: 11 }}>
                    <Title>Your Rooms</Title>
                </Col>
            </Row >
        )
    }

}

export default Rooms;