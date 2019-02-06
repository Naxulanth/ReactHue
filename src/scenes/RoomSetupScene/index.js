import React, { Component } from 'react';
import RoomSetup from 'containers/Wake'
import './style.css';

class RoomSetupScene extends Component {
    render() {
        return (
            <div className="room-setup-scene"> 
                <RoomSetup/>
            </div>
        );
    }
}

export default RoomSetupScene;

