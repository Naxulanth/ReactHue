import { call, put, takeLatest } from "redux-saga/effects";
import {
  SENSORS_GET,
  SENSOR_CREATE,
  SENSOR_DELETE
} from "../constants/actionTypes";

import * as actions from "../actions/sensors";
import * as api from "../api/sensors";

export function* getSensors() {
  try {
    const response = yield call(api.getSensors);
    yield put(actions.getSensors.success(response));
  } catch (e) {
    yield put(actions.getSensors.failure(e));
  }
}

export function* watchGetSensors() {
  yield takeLatest(SENSORS_GET.REQUEST, getSensors);
}

export function* createSensor({ body }) {
  try {
    const response = yield call(api.createSensor, body);
    yield put(actions.createSensor.success(response));
  } catch (e) {
    yield put(actions.createSensor.failure(e));
  }
}

export function* watchCreateSensor() {
  yield takeLatest(SENSOR_CREATE.REQUEST, createSensor);
}

export function* deleteSensor({ id }) {
  try {
    const response = yield call(api.deleteSensor, id);
    yield put(actions.deleteSensor.success(response));
  } catch (e) {
    yield put(actions.deleteSensor.failure(e));
  }
}

export function* watchDeleteSensor() {
  yield takeLatest(SENSOR_DELETE.REQUEST, deleteSensor);
}
