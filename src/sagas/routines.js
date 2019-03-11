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
import * as lightsActions from "../actions/lights";
import * as lightsApi from "../api/lights";
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
    if (state.home) {
      const allLights = yield call(lightsApi.getLights);
      lights = Object.keys(allLights);
    } else if (state.routineLights.length < 1) {
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
      const sensor = yield call(sensorsApi.createSensor, wakeSensor(shortId));
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
      // sleep
    } else if (props.type === "sleep") {
      // sensor
      const sensor = yield call(sensorsApi.createSensor, sleepSensor(shortId));
      yield put(sensorsActions.createSensor.success(sensor));
      const sensorId = sensor.data[0].success.id;
      // first schedule
      startSchedule.description = "Trigger go to sleep start";
      startSchedule.name = "Go to sleep start";
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
        const modifyEndScene = yield call(
          scenesApi.modifySceneLights,
          endSceneId,
          light,
          createLightstates(state.fadeSelect.value, props.type, false)
        );
        yield put(scenesActions.modifySceneLights.success(modifyEndScene));
      }
      const startScene = yield call(
        scenesApi.createScene,
        sceneObject(true, props.type, lights, false)
      );
      yield put(scenesActions.createScene.success(startScene));
      const startSceneId = startScene.data[0].success.id;
      for (let light of lights) {
        const modifyStartScene = yield call(
          scenesApi.modifySceneLights,
          startSceneId,
          light,
          createLightstates(state.fadeSelect.value, props.type, true)
        );
        yield put(scenesActions.modifySceneLights.success(modifyStartScene));
      }
      // rule
      const startRule = yield call(
        rulesApi.createRule,
        ruleObject(
          "Go to sleep start",
          sensorId,
          startSceneId,
          0,
          null,
          true,
          null,
          props.type
        )
      );
      yield put(rulesActions.createRule.success(startRule));
      const startRuleId = startRule.data[0].success.id;
      // end rule
      const endRule = yield call(
        rulesApi.createRule,
        ruleObject(
          "Go to sleep fade",
          sensorId,
          endSceneId,
          0,
          null,
          false,
          "PT00:01:00",
          props.type
        )
      );
      yield put(rulesActions.createRule.success(endRule));
      const endRuleId = endRule.data[0].success.id;
      let resource = resourceObject(state.name, props.type);
      resource.links.push("/sensors/" + sensorId);
      resource.links.push("/schedules/" + startScheduleId);
      resource.links.push("/rules/" + startRuleId);
      resource.links.push("/rules/" + endRuleId);
      resource.links.push("/scenes/" + endSceneId);
      resource.links.push("/scenes/" + startSceneId);
      if (state.rooms.length > 0) {
        state.rooms.forEach(room => {
          resource.links.push("/groups/" + room);
        });
      } else {
        resource.links.push("/groups/" + 0);
      }
      const resourceData = yield call(resourcesApi.createResource, resource);
      yield put(resourcesActions.createResource.success(resourceData));
    } else if (props.type === "routines") {
      let createdScenes = [];
      const sensor = yield call(sensorsApi.createSensor, otherSensor(shortId));
      yield put(sensorsActions.createSensor.success(sensor));
      const sensorId = sensor.data[0].success.id;
      // first schedule
      startSchedule.description = "MyRoutine";
      startSchedule.name = state.name;
      startSchedule.command = sensorObject(sensorId);
      if (state.adjustmentSelect) {
        startSchedule.localtime = randomize(
          startSchedule.localtime,
          state.adjustmentSelect.value
        );
      }
      const startScheduleData = yield call(
        schedulesApi.createSchedule,
        startSchedule
      );
      yield put(schedulesActions.createSchedule.success(startScheduleData));
      const startScheduleId = startScheduleData.data[0].success.id;
      let resource = resourceObject(state.name, props.type);
      if (state.home) {
        let scene = null;
        let sceneId = null;
        let sceneKey = state.roomScenes[0].key;
        scene = yield call(scenesApi.createScene, {
          name: sceneKey,
          group: "0",
          type: "GroupScene",
          recycle: true
        });
        yield put(scenesActions.createScene.success(scene));
        sceneId = scene.data[0].success.id;
        for (let light of lights) {
          const modifyScene = yield call(
            scenesApi.modifySceneLights,
            sceneId,
            light,
            createLightstates(state.fadeSelect.value, sceneKey)
          );
          yield put(scenesActions.modifySceneLights.success(modifyScene));
          resource.links.push("/scenes/" + sceneId);
        }
      } else {
        for (let room of state.rooms) {
          let sceneObj = state.roomScenes[room];
          const detailedScene = yield call(scenesApi.getScene, sceneObj.key);
          const lightStates = detailedScene.data.lightstates;
          const createdScene = yield call(scenesApi.createScene, {
            name: sceneObj.value.name,
            type: "GroupScene",
            group: room,
            recycle: true
          });
          yield put(scenesActions.createScene.success(createdScene));
          const sceneId = createdScene.data[0].success.id;
          createdScenes.push(sceneId);
          for (let light of sceneObj.value.lights) {
            const modifyScene = yield call(
              scenesApi.modifySceneLights,
              sceneId,
              light,
              createLightstates(state.fadeSelect.value, lightStates[room])
            );
            yield put(scenesActions.modifySceneLights.success(modifyScene));
          }
          resource.links.push("/scenes/" + sceneId);
        }
      }
      const startRule = yield call(
        rulesApi.createRule,
        ruleObject(
          state.name + '.start',
          sensorId,
          createdScenes,
          state.rooms,
          null,
          true,
          null,
          props.type
        )
      );
      yield put(rulesActions.createRule.success(startRule));
      const startRuleId = startRule.data[0].success.id;
      const endRule = yield call(
        rulesApi.createRule,
        ruleObject(
          state.name + '.end',
          sensorId,
          createdScenes,
          state.rooms,
          null,
          false,
          state.formattedTimeOff, 
          props.type
        )
      );
      yield put(rulesActions.createRule.success(endRule));
      const endRuleId = endRule.data[0].success.id;
      resource.links.push("/sensors/" + sensorId);
      resource.links.push("/schedules/" + startScheduleId);
      resource.links.push("/rules/" + startRuleId);
      resource.links.push("/rules/" + endRuleId);
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
    } else if (props.type === "timers") {
    }

    yield put(actions.createRoutine.success());
    yield put(schedulesActions.getSchedules.request());
    yield put(resourcesActions.getResources.request());
  } catch (e) {}
}
