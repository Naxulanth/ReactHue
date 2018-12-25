import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';

import Config from 'containers/Config'
import colorChanger from 'utils/colorChanger';

import './index.css';

class MenuBar extends Component {

    componentDidMount() {
        let c = colorChanger();
        c.start('border', this.menuBar.style, 'borderBottomColor');
    }
    render() {
        return (
            <div ref={(e) => this.menuBar = e} className="menu-bar">
                <div className="menu-inner">
                    <Row>
                        <Col lg={{ offset: 1, size: 2 }}>
                            Hue Console
            </Col>
                        <Col lg="7">
                            Home | Config
            </Col>
                        <Col lg="2">
                            About | Contact
            </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default MenuBar;
