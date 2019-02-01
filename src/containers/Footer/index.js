import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import colorChanger from 'utils/colorChanger';
import './style.css';

class Footer extends Component {

    componentDidMount() {
        let c = colorChanger();
        c.start(this.menuBar.style, 'borderTopColor');
        this.followLink = this.followLink.bind(this);
    }

    followLink() {
        window.open('https://www.github.com/Naxulanth', '_blank');
    }

    render() {
        const { followLink } = this;
        return (
            <div ref={(e) => this.menuBar = e} className="footer">
                <Row>
                    <Col lg="10" md="10"/>
                    <Col lg="2" md="2">
                        <div className="footer-link" onClick={followLink}>
                            @Naxulanth
                        </div>
                    </Col>
                </Row>
            </div >
        );
    }
}

export default Footer;
