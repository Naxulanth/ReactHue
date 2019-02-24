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

export function* watchCreateRoutine() {
  yield takeLatest(ROUTINE_CREATE.REQUEST, createRoutine);
}

export function* createRoutine({ body }) {
  try {
    let state = body.state;
    let props = body.props;
    let obj = {};
    let resource = resourceObject(state.name, props.type);
    let shortId = shortid
      .characters(
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
      )
      .substr(0, 16);
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
    obj.status = "disabled";
    obj.recycle = true;
    obj.autodelete = false;
    if (
      // recurring time
      Object.keys(state.days).some(function(day) {
        return state.days[day];
      })
    ) {
      obj.localtime = recur(absolute(state.time, null, true), state.days);
    } else {
      // absolute time
      obj.localtime = absolute(state.time, null, true);
    }
    if (props.type === "wake") {
      const sensor = yield call(sensorsApi.createSensor, wakeSensor);
      yield put(sensorsActions.createSensor.success(sensor));
      let sensorId = sensor.data[0].success.id;
      resource.links.push("/sensors/" + sensorId);
      obj.description = shortId + "_start wake up";
      obj.name = state.name;
      obj.command = sensorObject(sensorId);
      const schedule = yield call(schedulesApi.createSchedule, obj);
      yield put(schedulesActions.createSchedule.success(schedule));
      let scheduleId = schedule.data[0].success.id;
      resource.links.push("/schedules/" + scheduleId);
      obj.description = shortId + "_trigger end scene";
      obj.name = shortId;
    }
  } catch (e) {}
}
