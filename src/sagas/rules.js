import { call, put, takeLatest } from "redux-saga/effects";
import { RULES_GET, RULE_CREATE, RULE_DELETE } from "../constants/actionTypes";

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

export function* createRule(body) {
  try {
    const response = yield call(api.getRules, body);
    yield put(actions.getRules.success(response));
  } catch (e) {
    yield put(actions.getRules.failure(e));
  }
}

export function* watchCreateRule() {
  yield takeLatest(RULE_CREATE.REQUEST, createRule);
}

export function* deleteRule({id}) {
  try {
    const response = yield call(api.deleteRule, id);
    yield put(actions.deleteRule.success(response));
  } catch (e) {
    yield put(actions.deleteRule.failure(e));
  }
}

export function* watchDeleteRule() {
  yield takeLatest(RULE_DELETE.REQUEST, deleteRule);
}
