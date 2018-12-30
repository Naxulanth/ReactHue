import { call, put, takeLatest } from 'redux-saga/effects';
import { ROOMS_GET } from '../constants/actionTypes'

import * as actions from '../actions/rooms'
import * as api from '../api/rooms'

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

// function* setLight(values) {}
//yield call (api.setLight, values)