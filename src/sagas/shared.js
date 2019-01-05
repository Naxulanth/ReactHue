import { call, put } from 'redux-saga/effects';

import * as roomsActions from '../actions/rooms'
import * as roomsApi from '../api/rooms'
import * as lightsActions from '../actions/lights'
import * as lightsApi from '../api/lights'
import * as scenesActions from '../actions/scenes'
import * as scenesApi from '../api/scenes'

export function* renew() {
    const refreshLights = yield call(lightsApi.getLights)
    yield put(lightsActions.getLights.success(refreshLights))
    const refreshRooms = yield call(roomsApi.getRooms)
    yield put(roomsActions.getRooms.success(refreshRooms))
    const refreshScenes = yield call(scenesApi.getScenes);
    yield put(scenesActions.getScenes.success(refreshScenes))
}