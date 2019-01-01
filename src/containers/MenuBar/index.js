import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import MenuBarLink from 'components/MenuBarLink'
import colorChanger from 'utils/colorChanger';
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
                    <Col lg="9">
                        <Row>
                            <Col lg={{ offset: 8, size: 1 }}>
                                <MenuBarLink to={process.env.PUBLIC_URL + '/'}>Home</MenuBarLink>
                            </Col>
                            <Col lg="1">
                                <MenuBarLink to={process.env.PUBLIC_URL + '/config'}>Config</MenuBarLink>
                            </Col>
                            <Col className="about" lg="1">
                                <MenuBarLink to={process.env.PUBLIC_URL + '/faq'}>FAQ</MenuBarLink>
                            </Col>
                            <Col lg="1" />
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MenuBar;
