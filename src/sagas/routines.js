import { call, put, takeLatest } from "redux-saga/effects";
import { ROUTINE_CREATE } from "../constants/actionTypes";
import shortid from "shortid";
import {
  wakeSensor,
  sleepSensor,
  timerSensor,
  otherSensor,
  sensorObject,
  groupObject,
  sceneObject,
  resourceObject,
  ruleObject,
  roomObject,
  createLightstates
} from "constants/routines";

import { absolute, recur, randomize } from "utils/date";

import * as roomsActions from "../actions/rooms";
import * as roomsApi from "../api/rooms";
import * as sensorsActions from "../actions/sensors";
import * as sensorsApi from "../api/sensors";
import * as scenesActions from "../actions/scenes";
import * as scenesApi from "../api/scenes";
import * as rulesActions from "../actions/rules";
import * as rulesApi from "../api/rules";
import * as schedulesActions from "../actions/schedules";
import * as schedulesApi from "../api/schedules";
import * as resourcesActions from "../actions/resources";
import * as resourcesApi from "../api/resources";
import * as actions from "../actions/routines";

shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);

export function* watchCreateRoutine() {
  yield takeLatest(ROUTINE_CREATE.REQUEST, createRoutine);
}

export function* createRoutine({ body }) {
  try {
    let state = body.state;
    let props = body.props;
    let firstSchedule = {};
    let shortId = shortid.generate();
    firstSchedule.status = "disabled";
    firstSchedule.recycle = true;
    let lights = [];
    if (state.routineLights.length < 1) {
      Object.keys(props.roomList).forEach(roomKey => {
        if (state.rooms.includes(roomKey)) {
          console.log("test");
          lights = lights.concat(props.roomList[roomKey].lights);
        }
      });
    } else {
      lights = state.routineLights;
    }
    if (
      // recurring time
      Object.keys(state.days).some(function(day) {
        return state.days[day];
      })
    ) {
      firstSchedule.localtime = recur(
        absolute(state.time, null, true),
        state.days
      );
    } else {
      // absolute time
      firstSchedule.localtime = absolute(state.time, null, true);
    }
    if (props.type === "wake") {
      // sensor
      const sensor = yield call(sensorsApi.createSensor, wakeSensor);
      yield put(sensorsActions.createSensor.success(sensor));
      const sensorId = sensor.data[0].success.id;
      // first schedule
      firstSchedule.description = shortId + "_start wake up";
      firstSchedule.name = state.name;
      firstSchedule.command = sensorObject(sensorId);
      const firstScheduleData = yield call(
        schedulesApi.createSchedule,
        firstSchedule
      );
      yield put(schedulesActions.createSchedule.success(firstScheduleData));
      const firstScheduleId = firstScheduleData.data[0].success.id;
      // first scene
      const firstScene = yield call(
        scenesApi.createScene,
        sceneObject(false, props.type, lights, false)
      );
      yield put(scenesActions.createScene.success(firstScene));
      const firstSceneId = firstScene.data[0].success.id;
      for (let light of lights) {
        const modifyFirstScene = yield call(
          scenesApi.modifySceneLights,
          firstSceneId,
          light,
          createLightstates(state.fadeSelect.value, props.type, false)
        );
        yield put(scenesActions.modifySceneLights.success(modifyFirstScene));
      }
      // second schedule
      const secondSchedule = Object.assign({}, firstSchedule);
      secondSchedule.description = shortId + "_trigger end scene";
      secondSchedule.name = shortId;
      secondSchedule.command = groupObject(firstSceneId);
      const secondScheduleData = yield call(
        schedulesApi.createSchedule,
        secondSchedule
      );
      yield put(schedulesActions.createSchedule.success(secondScheduleData));
      const secondScheduleId = secondScheduleData.data[0].success.id;
      // second scene
      const secondScene = yield call(
        scenesApi.createScene,
        sceneObject(true, props.type, lights, true)
      );
      yield put(scenesActions.createScene.success(secondScene));
      const secondSceneId = secondScene.data[0].success.id;
      for (let light of lights) {
        const modifySecondScene = yield call(
          scenesApi.modifySceneLights,
          secondSceneId,
          light,
          createLightstates(state.fadeSelect.value, props.type, true)
        );
        yield put(scenesActions.modifySceneLights.success(modifySecondScene));
      }
    }
  } catch (e) {}
}
