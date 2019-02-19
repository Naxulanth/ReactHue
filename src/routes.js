import React, { Fragment } from "react";
import { Router, Route } from "react-router-dom";

// Scenes
import Main from "scenes/Main";
import ConfigScene from "scenes/ConfigScene";
import RoutinesScene from "scenes/RoutinesScene";
import RoomSetupScene from "scenes/RoomSetupScene";

import MenuBar from "containers/MenuBar";
import Footer from "containers/Footer";

import { user } from "constants/localStorage";

export default ({ history }) => (
  <Router history={history}>
    <Fragment>
      <Route
        path={process.env.PUBLIC_URL + "/"}
        component={localStorage.getItem(user) ? MenuBar : null}
      />
      <Route
        path={process.env.PUBLIC_URL + "/"}
        exact
        component={localStorage.getItem(user) ? Main : ConfigScene}
      />
      <Route
        path={process.env.PUBLIC_URL + "/config"}
        component={ConfigScene}
      />
      <Route
        path={process.env.PUBLIC_URL + "/routines"}
        component={RoutinesScene}
      />
      <Route
        path={process.env.PUBLIC_URL + "/roomsetup"}
        component={RoomSetupScene}
      />
      <Route path={process.env.PUBLIC_URL + "/"} component={Footer} />
    </Fragment>
  </Router>
);
