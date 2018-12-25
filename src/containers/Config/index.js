import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import './index.css'

class Config extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ip: '',
            username: ''
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
        
    }

    render() {
        const { ip, username } = this.state;
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
            </div >
        );
    }
}

export default Config;
