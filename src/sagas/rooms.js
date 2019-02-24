import { call, put, takeLatest } from "redux-saga/effects";
import {
  ROOMS_GET,
  ROOMS_PUT,
  ROOMS_PUT_ATTR,
  ROOMS_CREATE
} from "../constants/actionTypes";

import * as actions from "../actions/rooms";
import * as api from "../api/rooms";

import { renew } from "./shared";

export function* getRooms() {
  try {
    const response = yield call(api.getRooms);
    yield put(actions.getRooms.success(response));
  } catch (e) {
    yield put(actions.getRooms.failure(e));
  }
}

export function* watchGetRooms() {
  yield takeLatest(ROOMS_GET.REQUEST, getRooms);
}

export function* modifyRoom({ id, body }) {
  try {
    const response = yield call(api.modifyRoom, id, body);
    yield put(actions.modifyRoom.success(response));
    yield call(renew);
  } catch (e) {
    yield put(actions.modifyRoom.failure(e));
  }
}

export function* watchModifyRoom() {
  yield takeLatest(ROOMS_PUT.REQUEST, modifyRoom);
}

export function* modifyRoomAttr({ id, body }) {
  try {
    const response = yield call(api.modifyRoomAttr, id, body);
    yield put(actions.modifyRoomAttr.success(response));
    yield call(renew);
  } catch (e) {
    yield put(actions.modifyRoomAttr.failure(e));
  }
}

export function* watchModifyRoomAttr() {
  yield takeLatest(ROOMS_PUT_ATTR.REQUEST, modifyRoomAttr);
}

export function* createRoom({ body }) {
  try {
    const response = yield call(api.createRoom, body);
    yield put(actions.createRoom.success(response));
    yield call(renew);
  } catch (e) {
    yield put(actions.createRoom.failure(e));
  }
}

export function* watchCreateRoom() {
  yield takeLatest(ROOMS_CREATE.REQUEST, createRoom);
}
