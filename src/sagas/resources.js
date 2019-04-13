import { call, put, takeLatest } from "redux-saga/effects";
import { RESOURCES_GET, RESOURCE_DELETE } from "../constants/actionTypes";

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

export function* deleteResource() {
  try {
    const response = yield call(api.deleteResource);
    yield put(actions.deleteResource.success(response));
  } catch (e) {
    yield put(actions.getResources.failure(e));
  }
}

export function* watchDeleteResource() {
  yield takeLatest(RESOURCE_DELETE.REQUEST, deleteResource);
}
