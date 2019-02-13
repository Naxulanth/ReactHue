import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import colorChanger from 'utils/colorChanger';
import './style.css';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.followLink = this.followLink.bind(this);
        this.footer = React.createRef();
    }

    componentDidMount() {
        let c = colorChanger();
        c.start(this.footer.current.style, 'borderTopColor');
    }

    followLink() {
        window.open('https://www.github.com/Naxulanth', '_blank');
    }

    render() {
        const { followLink } = this;
        return (
            <div ref={this.footer} className="footer">
                <Row>
                    <Col lg="10" md="10" />
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
