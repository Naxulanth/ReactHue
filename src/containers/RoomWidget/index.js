import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import uuidv4 from 'uuid/v4'

import LightWidget from 'containers/LightWidget'
import colorChanger from 'utils/colorChanger';

import './index.css';
import WidgetHeader from '../WidgetHeader';
import { isEmpty } from '../../utils';


class RoomWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lights: null
        }
    }

    shouldComponentUpdate(nextProps) { 
        const { lights } = this.props;
        if (lights.state === nextProps.state) console.log('ok')
        return true
    }

    populateLights(arr) {
        let insert = [];
        arr.forEach((light, i) => {
            insert.push(<Row key={uuidv4()}><Col lg="12"><LightWidget light={light} /></Col></Row>);
        })
        this.setState({
            lights: insert
        })
    }

    componentDidMount() {
        let { lights } = this.props
        if (lights && !isEmpty(lights)) {
            this.populateLights(lights);
        }
    }

    render() {
        const { roomName } = this.props;
        const { lights } = this.state;
        console.log(lights)
        return (
            <div ref={(e) => this.main = e} className="room-widget">
                <div className="child">
                    <Row>
                        <Col lg="12">
                            <WidgetHeader roomName={roomName} />
                        </Col>
                    </Row>
                    {lights}
                </div>
            </div>
        )
    }

}

export default RoomWidget;