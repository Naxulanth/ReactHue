import { call, put, takeLatest } from 'redux-saga/effects';
import { LIGHTS_GET, LIGHTS_PUT } from '../constants/actionTypes'

import * as actions from '../actions/lights'
import * as api from '../api/lights'

import { renew } from './shared'


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
        yield call(renew);
    }
    catch (e) {
        yield put(actions.modifyLight.failure(e));
    }
}

export function* watchModifyLight() {
    yield takeLatest(LIGHTS_PUT.REQUEST, modifyLight)
}