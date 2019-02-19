import { call, put, takeLatest } from "redux-saga/effects";
import { RULES_GET } from "../constants/actionTypes";

import * as actions from "../actions/rules";
import * as api from "../api/rules";

export function* getRules() {
  try {
    const response = yield call(api.getRules);
    yield put(actions.getRules.success(response));
  } catch (e) {
    yield put(actions.getRules.failure(e));
  }
}

export function* watchGetRules() {
  yield takeLatest(RULES_GET.REQUEST, getRules);
}
