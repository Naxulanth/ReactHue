import { fork } from 'redux-saga/effects';

import { watchGetLights, watchModifyLight, watchModifyLightAttr } from './lights';
import { watchGetRooms, watchModifyRoom, watchModifyRoomAttr } from './rooms';
import { watchGetScene, watchGetScenes, watchModifyScene } from './scenes';

export default function* root() {
    yield fork(watchGetLights);
    yield fork(watchGetRooms);
    yield fork(watchModifyLight);
    yield fork(watchModifyRoom);
    yield fork(watchGetScene);
    yield fork(watchGetScenes);
    yield fork(watchModifyScene);
    yield fork(watchModifyRoomAttr);
    yield fork(watchModifyLightAttr);
}