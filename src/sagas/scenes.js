import { call, put, takeLatest } from "redux-saga/effects";
import {
  SCENES_GET,
  SCENES_PUT,
  SCENE_GET,
  SCENE_LIGHTS_PUT,
  SCENE_POST,
  SCENE_DELETE
} from "../constants/actionTypes";

import * as actions from "../actions/scenes";
import * as api from "../api/scenes";

import { renew } from "./shared";

export function* getScenes() {
  try {
    const response = yield call(api.getScenes);
    yield put(actions.getScenes.success(response));
  } catch (e) {
    yield put(actions.getScenes.failure(e));
  }
}

export function* watchGetScenes() {
  yield takeLatest(SCENES_GET.REQUEST, getScenes);
}

export function* deleteScene({ id }) {
  try {
    const response = yield call(api.deleteScene, id);
    yield put(actions.deleteScene.success(response));
    yield call(renew);
  } catch (e) {
    yield put(actions.deleteScene.failure(e));
  }
}

export function* watchDeleteScene() {
  yield takeLatest(SCENE_DELETE.REQUEST, deleteScene);
}

export function* modifyScene({ id, body }) {
  try {
    const response = yield call(api.modifyScene, id, body);
    yield put(actions.modifyScene.success(response));
    yield call(renew);
  } catch (e) {
    yield put(actions.modifyScene.failure(e));
  }
}

export function* watchModifyScene() {
  yield takeLatest(SCENES_PUT.REQUEST, modifyScene);
}

export function* getScene({ id }) {
  try {
    const response = yield call(api.getScene, id);
    yield put(actions.getScene.success(response));
    yield call(renew);
  } catch (e) {
    yield put(actions.getScene.failure(e));
  }
}

export function* watchGetScene() {
  yield takeLatest(SCENE_GET.REQUEST, getScene);
}

export function* createScene({ body }) {
  try {
    const response = yield call(api.createScene, body);
    yield put(actions.createScene.success(response));
    yield call(renew);
  } catch (e) {
    yield put(actions.createScene.failure(e));
  }
}

export function* watchCreateScene() {
  yield takeLatest(SCENE_POST.REQUEST, createScene);
}

export function* modifySceneLights({ id, lightId, body }) {
  try {
    const response = yield call(api.modifySceneLights, id, lightId, body);
    yield put(actions.modifySceneLights.success(response));
    yield call(renew);
  } catch (e) {
    yield put(actions.modifySceneLights.failure(e));
  }
}

export function* watchModifySceneLights() {
  yield takeLatest(SCENE_LIGHTS_PUT.REQUEST, modifySceneLights);
}
