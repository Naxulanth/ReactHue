import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import MenuBarLink from "components/MenuBarLink";
import colorChanger from "utils/colorChanger";
import "./style.css";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.menuBar = React.createRef();
  }

  componentDidMount() {
    let c = colorChanger();
    c.start(this.menuBar.current.style, "borderBottomColor");
  }

  render() {
    return (
      <div ref={this.menuBar} className="menu-bar">
        <Row>
          <Col
            sm={{ offset: 1, size: 2 }}
            md={{ offset: 1, size: 2 }}
            lg={{ offset: 1, size: 2 }}
            xl={{ offset: 1, size: 2 }}
          >
            <MenuBarLink
              to={{
                pathname: process.env.PUBLIC_URL + "/",
                search: this.props.location.search
              }}
            >
              Home
            </MenuBarLink>
          </Col>
          <Col sm="9" md="9" lg="9" xl="9">
            <Row>
              <Col
                sm={{ size: 3 }}
                md={{ offset: 4, size: 2 }}
                lg={{ offset: 4, size: 2 }}
                xl={{ offset: 4, size: 2 }}
              >
                <MenuBarLink
                  to={{
                    pathname: process.env.PUBLIC_URL + "/routines",
                    search: this.props.location.search
                  }}
                >
                  Routines
                </MenuBarLink>
              </Col>
              <Col sm="3" md="2" lg="2" xl="2">
                <MenuBarLink
                  to={{
                    pathname: process.env.PUBLIC_URL + "/roomsetup",
                    search: this.props.location.search
                  }}
                >
                  Setup
                </MenuBarLink>
              </Col>
              <Col className="about" sm="3" md="2" lg="2" xl="2">
                <MenuBarLink
                  to={{
                    pathname: process.env.PUBLIC_URL + "/config",
                    search: this.props.location.search
                  }}
                >
                  Config
                </MenuBarLink>
              </Col>
              <Col className="about" sm="3" md="2" lg="2" xl="2">
                <MenuBarLink
                  to={{
                    pathname: process.env.PUBLIC_URL + "/faq",
                    search: this.props.location.search
                  }}
                >
                  FAQ
                </MenuBarLink>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MenuBar;
