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
        sceneObject(false, props.type, lights)
      );
      yield put(scenesActions.createScene.success(firstScene));
      const firstSceneId = firstScene.data[0].success.id;
      console.log(firstSceneId)
      console.log(createLightstates(lights, state.fadeSelect.value, props.type, false))
      const modifyFirstScene = yield call(
        scenesApi.modifyScene,
        firstSceneId,
        createLightstates(lights, state.fadeSelect.value, props.type, false)
      );
      yield put(scenesActions.modifyScene.success(modifyFirstScene));
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
        sceneObject(true, props.type, lights)
      );
      yield put(scenesActions.createScene.success(secondScene));
      const secondSceneId = secondScene.data[0].success.id;
      const modifySecondScene = yield call(
        scenesApi.modifyScene,
        secondSceneId,
        createLightstates(lights, state.fadeSelect.value, props.type, true)
      );
      yield put(scenesActions.modifyScene.success(modifySecondScene));
      // main rule
      const rule = yield call(
        rulesApi.createRule,
        ruleObject(
          state.name,
          sensorId,
          secondSceneId,
          state.rooms,
          secondScheduleId,
          true,
          state.timeOff,
          props.type
        )
      );
      yield put(rulesActions.createRule.success(rule));
      const ruleId = rule.data[0].success.id;
      // timeoff rule & group
      let timeoffRuleId = null;
      let roomId = null;
      if (state.timeOff) {
        const room = yield call(roomsApi.createRoom, roomObject(lights));
        roomId = room.data[0].success.id;
        yield put(roomsActions.createRoom.success(room));
        const timeoffRule = yield call(
          rulesApi.createRule,
          ruleObject(
            state.name,
            sensorId,
            secondSceneId,
            roomId,
            secondScheduleId,
            false,
            state.timeOff,
            props.type
          )
        );
        yield put(rulesActions.createRule.success(rule));
        timeoffRuleId = timeoffRule.data[0].success.id;
      }
      // resources
      let resource = resourceObject(state.name, props.type);
      resource.links.push("/sensors/" + sensorId);
      resource.links.push("/schedules/" + firstScheduleId);
      resource.links.push("/schedules/" + secondScheduleId);
      resource.links.push("/rules/" + ruleId);
      resource.links.push("/scenes/" + firstSceneId);
      resource.links.push("/scenes/" + secondSceneId);
      if (state.timeOff) {
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
      console.log(resource)
      const resourceData = yield call(resourcesApi.createResource, resource);
      yield put(resourcesActions.createResource.success(resourceData));
      yield put(actions.createRoutine.success());
    } else if (props.type === "sleep") {
    } else if (props.type === "routines") {
      // clone scenes in roomScenes and pass
      // 1 scene for each group, group 0 for home
      // turn rooms off at @ rules routine end
    } else if (props.type === "timers") {
    }
  } catch (e) {}
}
