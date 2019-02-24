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
    let firstSchedule = {};
    let resource = resourceObject(state.name, props.type);
    shortid.characters(
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
    );
    let shortId = shortid.generate();
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
    firstSchedule.status = "disabled";
    firstSchedule.recycle = true;
    firstSchedule.autodelete = false;
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
      const sensor = yield call(sensorsApi.createSensor, wakeSensor);
      yield put(sensorsActions.createSensor.success(sensor));
      let sensorId = sensor.data[0].success.id;
      resource.links.push("/sensors/" + sensorId);
      firstSchedule.description = shortId + "_start wake up";
      firstSchedule.name = state.name;
      firstSchedule.command = sensorObject(sensorId);
      const firstScheduleData = yield call(schedulesApi.createSchedule, firstSchedule);
      yield put(schedulesActions.createSchedule.success(firstScheduleData));
      let firstScheduleId = firstScheduleData.data[0].success.id;
      resource.links.push("/schedules/" + firstScheduleId);
      let secondSchedule = Object.assign({}, firstSchedule);
      secondSchedule.description = shortId + "_trigger end scene";
      secondSchedule.name = shortId;
    }
  } catch (e) {}
}
