import { call, put, takeLatest } from "redux-saga/effects";
import { RESOURCES_GET } from "../constants/actionTypes";

import * as actions from "../actions/resources";
import * as api from "../api/resources";

export function* getResources() {
  try {
    const response = yield call(api.getResources);
    yield put(actions.getResources.success(response));
  } catch (e) {
    yield put(actions.getResources.failure(e));
  }
}

export function* watchGetResources() {
  yield takeLatest(RESOURCES_GET.REQUEST, getResources);
}
