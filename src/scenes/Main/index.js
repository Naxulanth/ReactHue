import React, { Component, Fragment } from 'react';

import Config from 'containers/Config'
import MenuBar from 'containers/MenuBar'

import './index.css';

class Main extends Component {
  render() {
    return (
      <Fragment>
      <MenuBar/>
      <div className="main">
        <Config />
      </div>
      </Fragment>
    );
  }
}

export default Main;
