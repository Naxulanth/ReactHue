import React, { Component } from 'react';

import Rooms from 'containers/Rooms'

import * as rooms from 'api/rooms'

import './index.css';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
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
