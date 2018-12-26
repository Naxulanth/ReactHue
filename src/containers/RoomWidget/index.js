import React, { Component } from 'react';
import './index.css';

import WidgetTitle from 'components/WidgetTitle'
import Toggle from 'components/Toggle'

import colorChanger from 'utils/colorChanger';

class RoomWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomName: 'Living Room',
            lights: {},
        }
    }

    componentDidMount() {
        let c = colorChanger();
        c.start(this.main.style, 'borderColor');
    }

    render() {
        const { roomName } = this.state;
        return (
            <div ref={(e) => this.main = e} className="room-widget">
                <WidgetTitle>{roomName}</WidgetTitle>
                <Toggle>On</Toggle>
            </div>
        )
    }

}

export default RoomWidget;