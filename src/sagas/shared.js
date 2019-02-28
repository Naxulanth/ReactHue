import { call, put } from "redux-saga/effects";

import * as roomsActions from "../actions/rooms";
import * as roomsApi from "../api/rooms";
import * as lightsActions from "../actions/lights";
import * as lightsApi from "../api/lights";
import * as scenesActions from "../actions/scenes";
import * as scenesApi from "../api/scenes";

export function* renew() {
  try {
    const refreshLights = yield put(lightsActions.getLights.request());
    //yield put(lightsActions.getLights.success(refreshLights));
  } catch (e) {
    yield put(lightsActions.getLights.failure(e));
  }
  try {
    const refreshRooms = yield put(roomsActions.getRooms.request());
    //yield put(roomsActions.getRooms.success(refreshRooms));
  } catch (e) {
    yield put(roomsActions.getRooms.failure(e));
  }
  try {
    const refreshScenes = yield put(scenesActions.getScenes.request());
    //yield put(scenesActions.getScenes.success(refreshScenes));
  } catch (e) {
    yield put(scenesActions.getScenes.failure(e));
  }
}
