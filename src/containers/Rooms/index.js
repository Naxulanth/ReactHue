import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import Title from 'components/Title';
import RoomWidget from 'containers/RoomWidget'
import './index.css';
import uuidv4 from 'uuid/v4'


class Rooms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomAmount: '0',
            redirect: false,
        }
        this.populateWidgets = this.populateWidgets.bind(this);
    }

    populateWidgets(arr) {
        let rows = [];
        while (arr.length) rows.push(arr.splice(0, 3));
        let insert = [];
        rows.forEach((row, i) => {
            let temp = [];
            let subInsert = <Row key={uuidv4()}><Col />{temp}<Col /></Row>;
            row.forEach((j) => {
                temp.push(<Col key={uuidv4()} lg={{ size: 3 }}>
                    <RoomWidget />
                </Col>
                )
            })
            insert.push(subInsert)
        })
        return insert.map((e) => { return e; });
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
                {this.populateWidgets([0, 0, 0, 0, 0, 0])}
            </Fragment>
        )
    }

}

export default Rooms;