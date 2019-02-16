import { call, put, takeLatest } from 'redux-saga/effects';
import { SCHEDULES_GET, SCHEDULE_CREATE, SCHEDULE_DELETE, SCHEDULE_GET, SCHEDULE_PUT } from '../constants/actionTypes';

import * as actions from '../actions/schedules'
import * as api from '../api/schedules'

import { renew } from './shared'

export function* setSchedule({ id, body }) {
    try {
        const response = yield call(api.setSchedule, id, body);
        yield put(actions.setSchedule.success(response))
        yield call(getSchedules);
        yield call(renew);
    }
    catch (e) {
        yield put(actions.setSchedule.failure(e));
    }
}

export function* watchSetSchedule() {
    yield takeLatest(SCHEDULE_PUT.REQUEST, setSchedule)
}

export function* deleteSchedule({ id }) {
    try {
        const response = yield call(api.deleteSchedule, id);
        yield put(actions.deleteSchedule.success(response))
        yield call(renew);
    }
    catch (e) {
        yield put(actions.deleteSchedule.failure(e));
    }
}

export function* watchDeleteSchedule() {
    yield takeLatest(SCHEDULE_DELETE.REQUEST, deleteSchedule)
}

export function* createSchedule({ body }) {
    try {
        const response = yield call(api.createSchedule, body);
        yield put(actions.createSchedule.success(response))
        yield call(renew);
    }
    catch (e) {
        yield put(actions.createSchedule.failure(e));
    }
}

export function* watchCreateSchedule() {
    yield takeLatest(SCHEDULE_CREATE.REQUEST, createSchedule)
}

export function* getSchedule({ id }) {
    try {
        const response = yield call(api.getSchedule, id);
        yield put(actions.getSchedule.success(response))
        yield call(renew);
    }
    catch (e) {
        yield put(actions.getSchedule.failure(e));
    }
}

export function* watchGetSchedule() {
    yield takeLatest(SCHEDULE_GET.REQUEST, getSchedule)
}

export function* getSchedules() {
    try {
        let timers = {};
        let routines = {};
        let wake = {};
        let sleep = {};
        let schedules = {};
        const response = yield call(api.getSchedules)
        const keys = Object.keys(response.data)
        yield keys.forEach((schedule) => {
            if (response.data[schedule].description.includes("Timer")) {
                timers[schedule] = response.data[schedule]
            }
            else if (response.data[schedule].description.includes("wake up")) {
                wake[schedule] = response.data[schedule]
            }
            else if (response.data[schedule].description.includes("go to sleep")) {
                sleep[schedule] = response.data[schedule]
            }
            else if (response.data[schedule].description.includes("Routine")) {
                routines[schedule] = response.data[schedule]
            }
        })
        yield schedules['timers'] = timers;
        yield schedules['routines'] = routines;
        yield schedules['wake'] = wake;
        yield schedules['sleep'] = sleep;
        yield put(actions.getSchedules.success(schedules))
        yield call(renew);
    }
    catch (e) {
        yield put(actions.getSchedules.failure(e));
    }
}

export function* watchGetSchedules() {
    yield takeLatest(SCHEDULES_GET.REQUEST, getSchedules)
}