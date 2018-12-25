import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import colorChanger from 'utils/colorChanger';

import './index.css';

class MenuBar extends Component {

    componentDidMount() {
        let c = colorChanger();
        c.start(this.menuBar.style, 'borderBottomColor');
        c.start(this.menuBar.style, 'borderTopColor', 'reverse');
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
