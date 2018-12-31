import { call, put, takeLatest } from 'redux-saga/effects';
import { LIGHTS_GET, LIGHTS_PUT } from '../constants/actionTypes'

import * as actions from '../actions/lights'
import * as api from '../api/lights'
import * as roomsApi from '../api/rooms'
import * as roomsActions from '../actions/rooms'

export function* getLights() {
    try {
        const response = yield call(api.getLights)
        yield put(actions.getLights.success(response));
    }
    catch (e) {
        yield put(actions.getLights.failure(e));
    }
}

export function* watchGetLights() {
    yield takeLatest(LIGHTS_GET.REQUEST, getLights)
}

export function* modifyLight({ id, body }) {
    try {
        const response = yield call(api.modifyLight, id, body);
        yield put(actions.modifyLight.success(response))
        const refreshLights = yield call(api.getLights)
        yield put(actions.getLights.success(refreshLights))
        const refreshRooms = yield call(roomsApi.getRooms)
        yield put (roomsActions.getRooms.success(refreshRooms))
    }
    catch (e) {
        yield put(actions.modifyLight.failure(e));
    }
}

export function* watchModifyLight() {
    yield takeLatest(LIGHTS_PUT.REQUEST, modifyLight)
}