import { action } from "./";
import {
  SENSORS_GET,
  SENSOR_CREATE,
  SENSOR_PUT,
  SENSOR_DELETE
} from "../constants/actionTypes";

export const getSensors = {
  request: () => action(SENSORS_GET.REQUEST),
  success: response => action(SENSORS_GET.SUCCESS, { response }),
  failure: error => action(SENSORS_GET.FAILURE, { error })
};

export const createSensor = {
  request: body => action(SENSOR_CREATE.REQUEST, { body }),
  success: response => action(SENSOR_CREATE.SUCCESS, { response }),
  failure: error => action(SENSOR_CREATE.FAILURE, { error })
};

export const modifySensor = {
  request: (id, body) => action(SENSOR_PUT.REQUEST, { id, body }),
  success: response => action(SENSOR_PUT.SUCCESS, { response }),
  failure: error => action(SENSOR_PUT.FAILURE, { error })
};

export const deleteSensor = {
  request: (id) => action(SENSOR_DELETE.REQUEST, { id }),
  success: response => action(SENSOR_DELETE.SUCCESS, { response }),
  failure: error => action(SENSOR_DELETE.FAILURE, { error })
};
