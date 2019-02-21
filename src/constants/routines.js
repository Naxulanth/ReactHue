import shortid from "shortid";
import { SENSORS, GROUPS } from "constants/endpoints";
import { user } from "constants/localStorage";

export const timerSensor = {
  state: {
    flag: false,
    lastupdated: "none"
  },
  config: {
    on: true,
    reachable: true
  },
  name: "Timer.companion",
  type: "CLIPGenericFlag",
  modelid: "PHA_TIMER",
  manufacturername: "Philips",
  swversion: "1.0",
  uniqueid: shortid
    .characters(
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
    )
    .substr(0, 16),
  recycle: true
};

export const sleepSensor = {
  state: {
    flag: false,
    lastupdated: "none"
  },
  config: {
    on: true,
    reachable: true
  },
  name: "Go to sleep",
  type: "CLIPGenericFlag",
  modelid: "PHA_CTRL_START",
  manufacturername: "Philips",
  swversion: "1.1",
  uniqueid: shortid
    .characters(
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
    )
    .substr(0, 16),
  recycle: true
};

export const wakeSensor = {
  state: {
    flag: false,
    lastupdated: "none"
  },
  config: {
    on: true,
    reachable: true
  },
  name: "Sensor for wakeup",
  type: "CLIPGenericFlag",
  modelid: "WAKEUP",
  manufacturername: "Philips",
  swversion: "A_1810251352",
  uniqueid: shortid
    .characters(
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
    )
    .substr(0, 16),
  recycle: true
};

export const otherSensor = {
  state: {
    flag: false,
    lastupdated: "none"
  },
  config: {
    on: true,
    reachable: true
  },
  name: "Routine.companion",
  type: "CLIPGenericFlag",
  modelid: "PHA_CTRL_START",
  manufacturername: "Philips",
  swversion: "1.0",
  uniqueid: shortid
    .characters(
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
    )
    .substr(0, 16),
  recycle: true
};

export function sensorObject(createdSensor) {
  return {
    address: SENSORS + "/" + createdSensor + "/state",
    body: {
      flag: true
    },
    method: "PUT"
  };
}

export function groupObject(scene) {
  return {
    address: GROUPS + "/0/action",
    body: {
      scene: scene
    },
    method: "PUT"
  };
}

export function sceneObject(init, type, lights, group) {
  let name = "";
  let sceneType = "";
  if (type === "wake") {
    name = "Wake Up " + init ? "init" : "end";
    sceneType = "LightScene";
  }
  else if (type === "sleep") {
    name = "Go to sleep " + init ? "start" : "end";
    sceneType = "LightScene";
  }
  else if (type === "routines") {

  }
  else if (type === "timers") {

  }
  let obj = {
    name: name,
    type: sceneType,
    lights: lights,
    owner: localStorage.getItem(user),
    recycle: true,
    locked: true,
    appdata: {},
    picture: "",
    lastupdated: new Date(),
    version: 2
  };
  if (sceneType === "GroupScene") {
    obj['group'] = group;
  }

  return obj
}


export function resourceObject(name, type) {
  let classid = null;
  if (type === "wake") classid = 1;
  else if (type === "sleep") classid = 2;
  else if (type === "routines") classid = 3;
  else classid = 4;
  let resource = {};
  resource.name = name;
  resource.description = name + ' behavior'
  resource.owner = localStorage.getItem(user)
  resource.recycle = false;
  resource.links = [];
  resource.classid = classid
}

export function ruleObject() {
  
}