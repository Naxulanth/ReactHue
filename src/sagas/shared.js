import { put } from "redux-saga/effects";

import * as roomsActions from "../actions/rooms";
import * as lightsActions from "../actions/lights";
import * as scenesActions from "../actions/scenes";

export function* renew() {
  try {
    yield put(lightsActions.getLights.request());
    //yield put(lightsActions.getLights.success(refreshLights));
  } catch (e) {
    yield put(lightsActions.getLights.failure(e));
  }
  try {
    yield put(roomsActions.getRooms.request());
    //yield put(roomsActions.getRooms.success(refreshRooms));
  } catch (e) {
    yield put(roomsActions.getRooms.failure(e));
  }
  try {
    yield put(scenesActions.getScenes.request());
    //yield put(scenesActions.getScenes.success(refreshScenes));
  } catch (e) {
    yield put(scenesActions.getScenes.failure(e));
  }
}
