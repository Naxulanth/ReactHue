import { combineReducers } from "redux";

import lights from "./lights";
import rooms from "./rooms";
import scenes from "./scenes";
import schedules from "./schedules";
import resources from "./resources";
import rules from "./rules";
import sensors from "./sensors";

const reducers = {
  lights,
  rooms,
  scenes,
  schedules,
  resources,
  rules,
  sensors
};

export default combineReducers(reducers);
