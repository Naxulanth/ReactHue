import React, { Component } from 'react';

import Rooms from 'containers/Rooms'
import axios from 'axios';


import { getRooms } from 'api'

import './index.css';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    getRooms().then(e => console.log(e));
  }



  render() {
    return (
      <div className="main pad">
        <Rooms />
      </div>
    );
  }
}

export default Main;
