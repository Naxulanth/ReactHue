import { call, put, takeLatest } from "redux-saga/effects";
import { SENSORS_GET } from "../constants/actionTypes";

import * as actions from "../actions/sensors";
import * as api from "../api/sensors";

import { renew } from "./shared";

export function* getSensors() {
  try {
    const response = yield call(api.getSensors);
    yield put(actions.getSensors.success(response));
    yield call(renew);
  } catch (e) {
    yield put(actions.getSensors.failure(e));
  }
}

export function* watchGetSensors() {
  yield takeLatest(SENSORS_GET.REQUEST, getSensors);
}
