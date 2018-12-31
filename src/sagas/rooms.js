import { call, put, takeLatest } from 'redux-saga/effects';
import { ROOMS_GET, ROOMS_PUT } from '../constants/actionTypes'

import * as actions from '../actions/rooms'
import * as api from '../api/rooms'
import * as lightsActions from '../actions/lights'
import * as lightsApi from '../api/lights'


export function* getRooms() {
    try {
        const response = yield call(api.getRooms)
        yield put(actions.getRooms.success(response));
    }
    catch (e) {
        yield put(actions.getRooms.failure(e));
    }
}

export function* watchGetRooms() {
    yield takeLatest(ROOMS_GET.REQUEST, getRooms)
}

export function* modifyRoom({ id, body }) {
    try {
        const response = yield call(api.modifyRoom, id, body);
        yield put(actions.modifyRoom.success(response))
        const refreshLights = yield call(lightsApi.getLights)
        yield put(lightsActions.getLights.success(refreshLights))
        const refreshRooms = yield call(api.getRooms)
        yield put(actions.getRooms.success(refreshRooms))
    }
    catch (e) {
        yield put(actions.modifyRoom.failure(e));
    }
}

export function* watchModifyRoom() {
    yield takeLatest(ROOMS_PUT.REQUEST, modifyRoom)
}