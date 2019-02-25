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
    firstSchedule.autodelete = false;
    let lights = [];
    if (state.routineLights.length < 1) {
      Object.keys(props.roomList).forEach(roomKey => {
        if (Object.keys(state.rooms).includes(roomKey)) {
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
        sceneObject(false, type, lights)
      );
      yield put(scenesActions.createScene.success(firstScene));
      const modifyFirstScene = yield call(
        scenesActions.modifyScene,
        firstScene,
        createLightstates(lights, fadeSelect, type, false)
      );
      yield put(scenesActions.modifyScene.success(modifyFirstScene));
      const firstSceneId = firstScene.data[0].success.id;
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
      const secondScene = yield call(
        scenesApi.createScene,
        sceneObject(true, type, lights)
      );
      yield put(scenesActions.createScene.success(secondScene));
      // second scene
      const secondScene = secondScene.data[0].success.id;
      const modifySecondScene = yield call(
        scenesActions.modifyScene,
        secondScene,
        createLightstates(lights, fadeSelect, type, true)
      );
      yield put(scenesActions.modifyScene.success(modifySecondScene));
      // main rule
      const rule = yield call(
        rulesApi.createRule,
        ruleObject(
          name,
          createdSensor,
          createdScene,
          rooms,
          createdSchedule,
          true,
          timeOff,
          type
        )
      );
      yield put(rulesActions.createRule.success(rule));
      const ruleId = rule.data[0].success.id;
      // timeoff rule & group
      if (timeOff) {
        createRoom(roomObject(lights));
        createRule(
          ruleObject(
            name,
            createdSensor,
            createdScene,
            createdRoom,
            createdSchedule,
            false,
            timeOff,
            type
          )
        );
      }
      // resources
      let resource = resourceObject(state.name, props.type);
      resource.links.push("/sensors/" + sensorId);
      resource.links.push("/schedules/" + firstScheduleId);
      resource.links.push("/schedules/" + secondScheduleId);
      resource.links.push("/rules/" + ruleId);
      resource.links.push("/scenes/" + firstSceneId);
      resource.links.push("/scenes/" + secondSceneId);
      if (timeOff) {
        resource.links.push("/rules/" + timeoffRule);
        resource.links.push("/groups/" + createdRoom);
      }
      if (rooms.length > 0) {
        rooms.forEach(room => {
          resource.links.push("/groups/" + room);
        });
      } else resource.links.push("/groups/" + 0);
      const resourceData = yield call(resourcesApi.createResource, resource);
      yield put(resourcesActions.createResource, resourceData);
    } else if (type === "sleep") {
    } else if (type === "routines") {
      // clone scenes in roomScenes and pass
      // 1 scene for each group, group 0 for home
      // turn rooms off at @ rules routine end
    } else if (type === "timers") {
    }
  } catch (e) {}
}
