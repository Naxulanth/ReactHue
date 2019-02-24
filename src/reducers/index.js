import { combineReducers } from "redux";

import lights from "./lights";
import rooms from "./rooms";
import scenes from "./scenes";
import schedules from "./schedules";
import resources from "./resources";
import rules from "./rules";
import sensors from "./sensors";
import routines from "./routines";

const reducers = {
  lights,
  rooms,
  scenes,
  schedules,
  resources,
  rules,
  sensors,
  routines
};

export default combineReducers(reducers);
