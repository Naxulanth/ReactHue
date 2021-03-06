import { call, put, takeLatest } from "redux-saga/effects";
import { ROUTINE_CREATE, ROUTINE_DELETE } from "../constants/actionTypes";
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

import { toast } from "react-toastify";

import * as roomsActions from "../actions/rooms";
import * as roomsApi from "../api/rooms";
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

export function* watchDeleteRoutine() {
  yield takeLatest(ROUTINE_DELETE.REQUEST, deleteRoutine);
}

export function* deleteRoutine({ id }) {
  let links = id.links;
  for (let link of links) {
    let id = link.split("/")[2];
    if (link.includes("resource")) {
      yield call(resourcesApi.deleteResource, id);
      yield put(resourcesActions.deleteResource.success());
    } else if (link.includes("schedule")) {
      let resp = yield call(schedulesApi.deleteSchedule, id);
      yield put(schedulesActions.deleteSchedule.success(resp));
    } else if (link.includes("scene")) {
      let resp = yield call(scenesApi.deleteScene, id);
      yield put(scenesActions.deleteScene.success(resp));
    } else if (link.includes("rule")) {
      yield call(rulesApi.deleteRule, id);
      yield put(rulesActions.deleteRule.success());
    } else if (link.includes("sensor")) {
      yield call(sensorsApi.deleteSensor, id);
      yield put(sensorsActions.deleteSensor.success());
    }
  }
  yield put(actions.deleteRoutine.success());
  yield put(schedulesActions.getSchedules.request());
  yield put(resourcesActions.getResources.request());
  yield put(rulesActions.getRules.request());
  if (id.toast)
    toast.success("Routine edited successfully", {
      position: toast.POSITION.TOP_RIGHT
    });
  else
    toast.success("Routine deleted successfully", {
      position: toast.POSITION.TOP_RIGHT
    });
}

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
      lights = Object.keys(allLights.data);
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
      startSchedule.autodelete = false;
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
      startSchedule.autodelete = false;
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
            createLightstates(state.fadeSelect.value, null, false, sceneKey)
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
              createLightstates(
                state.fadeSelect.value,
                props.type,
                false,
                lightStates[room]
              )
            );
            yield put(scenesActions.modifySceneLights.success(modifyScene));
          }
          resource.links.push("/scenes/" + sceneId);
        }
      }
      const startRule = yield call(
        rulesApi.createRule,
        ruleObject(
          state.name + ".start",
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
      if (state.formattedTimeOff) {
        const endRule = yield call(
          rulesApi.createRule,
          ruleObject(
            state.name + ".end",
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
        resource.links.push("/rules/" + endRuleId);
      }
      resource.links.push("/sensors/" + sensorId);
      resource.links.push("/schedules/" + startScheduleId);
      resource.links.push("/rules/" + startRuleId);
      if (state.rooms.length > 0) {
        state.rooms.forEach(room => {
          resource.links.push("/groups/" + room);
        });
      } else {
        resource.links.push("/groups/" + 0);
      }
      const resourceData = yield call(resourcesApi.createResource, resource);
      yield put(resourcesActions.createResource.success(resourceData));
    } else if (props.type === "timers") {
      let createdScenes = [];
      const sensor = yield call(sensorsApi.createSensor, timerSensor(shortId));
      yield put(sensorsActions.createSensor.success(sensor));
      const sensorId = sensor.data[0].success.id;
      startSchedule.description = "Timer";
      startSchedule.name = state.name;
      startSchedule.command = sensorObject(sensorId);
      let time = new Date(state.time);
      let hours = time.getHours();
      hours = ("00" + hours).slice(-2);
      let minutes = time.getMinutes();
      minutes = ("00" + minutes).slice(-2);
      startSchedule.localtime = "PT" + hours + ":" + minutes + ":00";
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
            createLightstates(11, null, null, sceneKey)
          );
          yield put(scenesActions.modifySceneLights.success(modifyScene));
        }
        resource.links.push("/scenes/" + sceneId);
      } else {
        for (let room of state.rooms) {
          let sceneObj = state.roomScenes[room];
          const detailedScene = yield call(scenesApi.getScene, sceneObj.key);
          yield put(scenesActions.getScene.success(detailedScene));
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
              createLightstates(null, lightStates[room])
            );
            yield put(scenesActions.modifySceneLights.success(modifyScene));
          }
          resource.links.push("/scenes/" + sceneId);
        }
      }
      const startRule = yield call(
        rulesApi.createRule,
        ruleObject(
          state.name + ".action",
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
      resource.links.push("/sensors/" + sensorId);
      resource.links.push("/schedules/" + startScheduleId);
      resource.links.push("/rules/" + startRuleId);
      if (state.rooms.length > 0) {
        state.rooms.forEach(room => {
          resource.links.push("/groups/" + room);
        });
      } else {
        resource.links.push("/groups/" + 0);
      }
      const resourceData = yield call(resourcesApi.createResource, resource);
      yield put(resourcesActions.createResource.success(resourceData));
    }
    yield put(actions.createRoutine.success());
    if (body.resource) {
      body.resource["toast"] = true;
      yield put(actions.deleteRoutine.request(body.resource));
    } else {
      toast.success("Routine created successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
      yield put(schedulesActions.getSchedules.request());
      yield put(resourcesActions.getResources.request());
      yield put(rulesActions.getRules.request());
    }
  } catch (e) {}
}
