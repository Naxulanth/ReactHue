import React, { Component, Fragment } from 'react';

import Rooms from 'containers/Rooms'

import './index.css';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <Rooms/>
      </div>
      );
    }
  }
  
  export default Main;
