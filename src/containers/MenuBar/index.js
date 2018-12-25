import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import colorChanger from 'utils/colorChanger';
import MenuBarLink from 'components/MenuBarLink'

import './index.css';

class MenuBar extends Component {

    componentDidMount() {
        let c = colorChanger();
        c.start(this.menuBar.style, 'borderBottomColor');
    }
    render() {
        return (
            <div ref={(e) => this.menuBar = e} className="menu-bar">
                    <Row>
                        <Col lg={{ offset: 1, size: 2 }}>
                        <MenuBarLink to={process.env.PUBLIC_URL + '/'}>Hue Console</MenuBarLink>
                        </Col>
                        <Col lg="6">
                            <MenuBarLink to={process.env.PUBLIC_URL + '/'}>Home</MenuBarLink>
                            <MenuBarLink to={process.env.PUBLIC_URL + '/config'}>Config</MenuBarLink> 
                        </Col>
                        <Col className="about" lg="2">
                            <MenuBarLink to={process.env.PUBLIC_URL + '/faq'}>FAQ</MenuBarLink>
                        </Col>
                        <Col lg="1" />
                    </Row>
            </div>
        );
    }
}

export default MenuBar;
