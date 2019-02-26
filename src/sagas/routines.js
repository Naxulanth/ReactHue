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
    let startSchedule = {};
    let shortId = shortid.generate();
    startSchedule.status = "disabled";
    startSchedule.recycle = true;
    let lights = [];
    if (state.routineLights.length < 1) {
      Object.keys(props.roomList).forEach(roomKey => {
        if (state.rooms.includes(roomKey)) {
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
      startSchedule.localtime = recur(
        absolute(state.time, null, true),
        state.days
      );
    } else {
      // absolute time
      startSchedule.localtime = absolute(state.time, null, true);
    }
    if (props.type === "wake") {
      // sensor
      const sensor = yield call(sensorsApi.createSensor, wakeSensor);
      yield put(sensorsActions.createSensor.success(sensor));
      const sensorId = sensor.data[0].success.id;
      // first schedule
      startSchedule.description = shortId + "_start wake up";
      startSchedule.name = state.name;
      startSchedule.command = sensorObject(sensorId);
      const startScheduleData = yield call(
        schedulesApi.createSchedule,
        startSchedule
      );
      yield put(schedulesActions.createSchedule.success(startScheduleData));
      const startScheduleId = startScheduleData.data[0].success.id;
      // first scene
      const endScene = yield call(
        scenesApi.createScene,
        sceneObject(false, props.type, lights, false)
      );
      yield put(scenesActions.createScene.success(endScene));
      const endSceneId = endScene.data[0].success.id;
      for (let light of lights) {
        const modifyendScene = yield call(
          scenesApi.modifySceneLights,
          endSceneId,
          light,
          createLightstates(state.fadeSelect.value, props.type, false)
        );
        yield put(scenesActions.modifySceneLights.success(modifyendScene));
      }
      // second schedule
      const endSchedule = Object.assign({}, startSchedule);
      endSchedule.description = shortId + "_trigger end scene";
      endSchedule.name = shortId;
      endSchedule.command = groupObject(endSceneId);
      endSchedule.localtime = "PT00:01:00";
      const endScheduleData = yield call(
        schedulesApi.createSchedule,
        endSchedule
      );
      yield put(schedulesActions.createSchedule.success(endScheduleData));
      const endScheduleId = endScheduleData.data[0].success.id;
      // second scene
      const startScene = yield call(
        scenesApi.createScene,
        sceneObject(true, props.type, lights, true)
      );
      yield put(scenesActions.createScene.success(startScene));
      const startSceneId = startScene.data[0].success.id;
      for (let light of lights) {
        const modifystartScene = yield call(
          scenesApi.modifySceneLights,
          startSceneId,
          light,
          createLightstates(state.fadeSelect.value, props.type, true)
        );
        yield put(scenesActions.modifySceneLights.success(modifystartScene));
      }
      // main rule
      const rule = yield call(
        rulesApi.createRule,
        ruleObject(
          shortId,
          sensorId,
          startSceneId,
          state.rooms,
          endScheduleId,
          true,
          state.formattedTimeOff,
          props.type
        )
      );
      yield put(rulesActions.createRule.success(rule));
      const ruleId = rule.data[0].success.id;
      // timeoff rule & group - needs checking
      let timeoffRuleId = null;
      let roomId = null;
      if (state.formattedTimeOff) {
        const room = yield call(roomsApi.createRoom, roomObject(lights));
        roomId = room.data[0].success.id;
        yield put(roomsActions.createRoom.success(room));
        const timeoffRule = yield call(
          rulesApi.createRule,
          ruleObject(
            state.name,
            sensorId,
            startSceneId,
            roomId,
            endScheduleId,
            false,
            state.formattedTimeOff,
            props.type
          )
        );
        timeoffRuleId = timeoffRule.data[0].success.id;
        yield put(rulesActions.createRule.success(rule));
      }
      // resources
      let resource = resourceObject(state.name, props.type);
      resource.links.push("/sensors/" + sensorId);
      resource.links.push("/schedules/" + startScheduleId);
      resource.links.push("/schedules/" + endScheduleId);
      resource.links.push("/rules/" + ruleId);
      resource.links.push("/scenes/" + endSceneId);
      resource.links.push("/scenes/" + startSceneId);
      if (state.formattedTimeOff) {
        resource.links.push("/rules/" + timeoffRuleId);
        resource.links.push("/groups/" + roomId);
      }
      if (state.rooms.length > 0) {
        state.rooms.forEach(room => {
          resource.links.push("/groups/" + room);
        });
      } else {
        resource.links.push("/groups/" + 0);
      }
      const resourceData = yield call(resourcesApi.createResource, resource);
      yield put(resourcesActions.createResource.success(resourceData));
      yield put(actions.createRoutine.success());
      yield put(schedulesActions.getSchedules.request());
    }
  } catch (e) {}
}
