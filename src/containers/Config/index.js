import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import axios from "axios";
import validator from "validator";
import TextInput from "components/TextInput";
import Button from "components/Button";
import remoteQuery from "constants/remote";
import uuidv4 from "uuid/v4";
import "./style.css";
import queryString from "query-string";
import { user, bridge } from "constants/localStorage";

class Config extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: "",
      username: "",
      text: "",
      redirect: false,
      bridges: [],
      generator: "generate token",
      generatorConfirm: false
    };
    this.handleIPInput = this.handleIPInput.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getBridges = this.getBridges.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleToken = this.handleToken.bind(this);
    this.remoteAuth = this.remoteAuth.bind(this);
  }

  componentDidMount() {
    let localUser = localStorage.getItem(user);
    let localBridge = localStorage.getItem(bridge);
    this.getBridges();
    this.setState({
      username: localUser ? localUser : "",
      ip: localBridge ? localBridge : ""
    });
  }

  remoteAuth() {
    window.open("https://api.meethue.com/oauth2/auth?" + remoteQuery, "_blank");
  }

  getBridges() {
    let bridges = [];
    axios.get("https://discovery.meethue.com/").then(res => {
      res.data.forEach(bridge => {
        bridges.push(bridge.internalipaddress);
        this.setState({ bridges });
      });
    });
  }

  handleIPInput(e) {
    this.setState({ ip: e.target.value });
  }

  handleUsernameInput(e) {
    this.setState({ username: e.target.value });
  }

  handleClick(e) {
    this.setState({
      ip: e.target.textContent
    });
  }

  handleToken() {
    const { generatorConfirm, ip } = this.state;
    if (!generatorConfirm) {
      this.setState({
        generator:
          "Press the link button on your Hue bridge, then click this link",
        generatorConfirm: true
      });
    } else {
      this.setState({
        generator: "Connecting..."
      });
      axios
        .post("http://" + ip + "/api", { devicetype: "hue_console" })
        .then(res => {
          if (res.data[0].error) {
            this.setState({
              generator:
                res.data[0].error.description +
                ", click this link again to try again"
            });
          } else if (res.data[0].success) {
            this.setState({
              username: res.data[0].success.username,
              generator: "Success"
            });
          }
        })
        .catch(e => {
          this.setState({
            generator:
              "Bridge not found, make sure to enter the correct Bridge IP"
          });
        });
    }
  }

  handleSubmit() {
    const { ip, username } = this.state;
    if (!validator.isIP(ip)) {
      this.setState({
        text: "IP validation failed (don't use http/https)"
      });
    } else {
      this.setState({
        text: "Testing..."
      });
      axios
        .get(
          "http://" + this.state.ip + "/api/" + this.state.username + "/lights"
        )
        .then(res => {
          localStorage.setItem(user, username);
          localStorage.setItem(bridge, ip);
          if (res.data && res.data[0] && res.data[0].error) {
            this.setState({
              text: "Unauthorized user"
            });
          } else {
            this.setState({
              text: "Success, redirecting..."
            });
            setTimeout(() => {
              this.setState({
                redirect: true
              });
            }, 2000);
          }
        })
        .catch(e => {
          this.setState({
            text: "Unable to reach bridge"
          });
        });
    }
  }

  render() {
    const { ip, username, text, redirect, bridges, generator } = this.state;
    const {
      handleIPInput,
      handleUsernameInput,
      handleSubmit,
      handleClick,
      handleToken
    } = this;
    if (redirect) return (window.location.href = "/");
    return (
      <div className="config">
        {bridges.length > 0 ? (
          <Row>
            <Col lg="12" sm="12" md="12" xl="12">
              Bridges discovered in the network:
              {bridges.map(bridge => {
                return (
                  <Row key={uuidv4()}>
                    <Col>
                      <span className="pointer" onClick={handleClick}>
                        {bridge}
                      </span>
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        ) : null}
        <Row className="margin-10">
          <Col lg="12" sm="12" md="12" xl="12">
            Active Bridge:{" "}
            {queryString.parse(window.location.search)["bridge"]
              ? queryString.parse(window.location.search)["bridge"]
              : 1}
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="bridge-switch">
              Switch to Bridge:
              <a className="bridge-link" href="/">
                1
              </a>
              <a className="bridge-link" href="/?bridge=2">
                2
              </a>
              <a className="bridge-link" href="/?bridge=3">
                3
              </a>
              <a className="bridge-link" href="/?bridge=4">
                4
              </a>
              <a className="bridge-link" href="/?bridge=5">
                5
              </a>
            </div>
          </Col>
        </Row>
        <Row className="margin-10">
          <Col lg="12" sm="12" md="12" xl="12">
            Bridge IP
          </Col>
        </Row>
        <Row>
          <Col lg="12" sm="12" md="12" xl="12">
            <TextInput value={ip} onChange={handleIPInput} />
          </Col>
        </Row>
        <Row className="margin-10">
          <Col lg="12" sm="12" md="12" xl="12">
            <span>Token</span>
          </Col>
        </Row>
        <Row>
          <Col lg="12" sm="12" md="12" xl="12">
            <TextInput value={username} onChange={handleUsernameInput} />
          </Col>
        </Row>
        <Row className="align-right">
          <Col lg="12" sm="12" md="12" xl="12">
            <span className="smaller pointer" onClick={handleToken}>
              {generator}
            </span>
          </Col>
        </Row>
        <Row>
          <Col className="center" lg="12" sm="12" md="12" xl="12">
            <Button onClick={handleSubmit} className="submit">
              Submit
            </Button>
          </Col>
        </Row>
        <Row>
          <Col lg="12" sm="12" md="12" xl="12">
            <div>{text}</div>
          </Col>
        </Row>
        <Row>
          <Col lg="12" sm="12" md="12" xl="12">
            <div style={{ cursor: "pointer" }} onClick={this.remoteAuth}>
              Remote Auth
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Config;
