import { fork } from "redux-saga/effects";

import {
  watchGetLights,
  watchModifyLight,
  watchModifyLightAttr
} from "./lights";
import {
  watchGetRooms,
  watchModifyRoom,
  watchModifyRoomAttr,
  watchCreateRoom
} from "./rooms";
import {
  watchGetScene,
  watchGetScenes,
  watchModifyScene,
  watchModifySceneLights,
  watchCreateScene,
  watchDeleteScene
} from "./scenes";
import {
  watchCreateSchedule,
  watchGetSchedule,
  watchGetSchedules,
  watchDeleteSchedule,
  watchSetSchedule
} from "./schedules";
import { watchGetResources, watchDeleteResource } from "./resources";
import { watchGetRules, watchDeleteRule } from "./rules";
import { watchGetSensors, watchDeleteSensor } from "./sensors";
import { watchCreateRoutine, watchDeleteRoutine } from "./routines";

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
  yield fork(watchModifySceneLights);
  yield fork(watchCreateScene);
  yield fork(watchDeleteScene);
  yield fork(watchCreateSchedule);
  yield fork(watchGetSchedule);
  yield fork(watchGetSchedules);
  yield fork(watchDeleteSchedule);
  yield fork(watchSetSchedule);
  yield fork(watchGetResources);
  yield fork(watchGetRules);
  yield fork(watchGetSensors);
  yield fork(watchCreateRoom);
  yield fork(watchCreateRoutine);
  yield fork(watchDeleteRoutine);
  yield fork(watchDeleteResource);
  yield fork(watchDeleteRule);
  yield fork(watchDeleteSensor);
}
