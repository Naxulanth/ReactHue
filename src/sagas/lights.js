import { call, put, takeLatest } from 'redux-saga/effects';
import { LIGHTS_GET } from '../constants/actionTypes'

import * as actions from '../actions/lights'
import * as api from '../api/lights'

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

// function* setLight(values) {}
//yield call (api.setLight, values)