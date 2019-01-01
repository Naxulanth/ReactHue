import { fork } from 'redux-saga/effects';

import { watchGetLights, watchModifyLight } from './lights';
import { watchGetRooms, watchModifyRoom, watchGetRoomById } from './rooms';

export default function* root() {
    yield fork(watchGetLights);
    yield fork(watchGetRooms);
    yield fork(watchModifyLight);
    yield fork(watchModifyRoom);
    yield fork(watchGetRoomById);
}