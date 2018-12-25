import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import './index.css'

class Config extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ip: 'http://192.168.2.100',
            username: '1SLcIETR1tmnP-rFuasBumGdku1MYn4GxscoSI57',
            text: ''
        }
        this.handleIPInput = this.handleIPInput.bind(this)
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleIPInput(e) {
        this.setState({ ip: e.target.value })
    }

    handleUsernameInput(e) {
        this.setState({ username: e.target.value })
    }

    handleSubmit() {
        this.setState({
            text: 'Testing...'
        })
        axios.get(this.state.ip + '/api/' + this.state.username + '/lights').then((res) => {
            this.setState({
                text: 'Success'
            })
        }).catch((e) => {
            this.setState({
                text: 'Failed'
            })
        })
    }

    render() {
        const { ip, username, text } = this.state;
        const { handleIPInput, handleUsernameInput, handleSubmit } = this;
        return (
            <div className="config">
                <Row>
                    <Col lg="12" sm="12" md="12" xl="12">
                        Bridge IP
                    </Col>
                </Row>
                <Row>
                    <Col className="scan" lg="12" sm="12" md="12" xl="12">
                        <TextInput value={ip} onChange={handleIPInput} />
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" sm="12" md="12" xl="12">
                        Username
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" sm="12" md="12" xl="12">
                        <TextInput value={username} onChange={handleUsernameInput} />
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" sm="12" md="12" xl="12">
                        <Button onClick={handleSubmit} className="submit">Submit</Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" sm="12" md="12" xl="12">
                        <div>{text}</div>
                    </Col>
                </Row>
            </div >
        );
    }
}

export default Config;
