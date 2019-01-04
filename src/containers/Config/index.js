import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import './style.css'

import { user, bridge } from 'constants/localStorage';

class Config extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ip: '',
            username: '',
            text: '',
            redirect: false,
        }
        this.handleIPInput = this.handleIPInput.bind(this)
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        let localUser = localStorage.getItem(user);
        let localBridge = localStorage.getItem(bridge);
        this.setState({
            username: localUser ? localUser : '',
            ip: localBridge ? localBridge : '',
        })
    }

    handleIPInput(e) {
        this.setState({ ip: e.target.value })
    }

    handleUsernameInput(e) {
        this.setState({ username: e.target.value })
    }

    handleSubmit() {
        const { ip, username } = this.state;
        if (!validator.isIP(ip)) {
            this.setState({
                text: "IP validation failed (don't use http/https)"
            })
        }
        else {
        this.setState({
            text: 'Testing...'
        })
        axios.get('http://' + this.state.ip + '/api/' + this.state.username + '/lights').then((res) => {
            localStorage.setItem(user, username);
            localStorage.setItem(bridge, ip);
            if (res.data && res.data[0] && res.data[0].error) {
                this.setState({
                    text: 'Unauthorized user'
                })
            }
            else {
            this.setState({
                text: 'Success, redirecting...',
            })
            setTimeout(() => {
                this.setState({
                    redirect: true,
                })
            }, 2000);
        }}).catch((e) => {
            this.setState({
                text: 'Unable to reach bridge'
            })
        })
    }
    }

    render() {
        const { ip, username, text, redirect } = this.state;
        const { handleIPInput, handleUsernameInput, handleSubmit } = this;
        if (redirect) return (<Redirect to='/' />)
        return (
            <div className="config">
                <Row>
                    <Col lg="12" sm="12" md="12" xl="12">
                        Bridge IP
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" sm="12" md="12" xl="12">
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
