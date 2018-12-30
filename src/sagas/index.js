import { fork } from 'redux-saga/effects';

import { watchGetLights } from './lights';

export default function* root() {
    yield fork(watchGetLights);
}