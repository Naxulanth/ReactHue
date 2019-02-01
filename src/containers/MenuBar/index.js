import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import MenuBarLink from 'components/MenuBarLink'
import colorChanger from 'utils/colorChanger';
import './style.css';

class MenuBar extends Component {

    componentDidMount() {
        let c = colorChanger();
        c.start(this.menuBar.style, 'borderBottomColor');
    }
    render() {
        return (
            <div ref={(e) => this.menuBar = e} className="menu-bar">
                <Row>
                    <Col md={{ offset: 1, size: 2 }} lg={{ offset: 1, size: 2 }} xl={{ offset: 1, size: 2 }}>
                        <MenuBarLink to={process.env.PUBLIC_URL + '/'}>Hue Console</MenuBarLink>
                    </Col>
                    <Col md="9" lg="9" xl="9">
                        <Row>
                            <Col md={{ offset: 6, size: 2 }} lg={{ offset: 6, size: 2 }} xl={{ offset: 6, size: 2 }}>
                                <MenuBarLink to={process.env.PUBLIC_URL + '/routines'}>Routines</MenuBarLink>
                            </Col>
                            <Col md="2" lg="2" xl="2">
                                <MenuBarLink to={process.env.PUBLIC_URL + '/config'}>Config</MenuBarLink>
                            </Col>
                            <Col className="about" md="2" lg="2" xl="2">
                                <MenuBarLink to={process.env.PUBLIC_URL + '/faq'}>FAQ</MenuBarLink>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MenuBar;
