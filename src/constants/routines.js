import shortid from "shortid";
import { SENSORS_RAW, GROUPS_RAW } from "constants/endpoints";

shortid
  .characters(
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
  )
  .substr(0, 16);

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
  uniqueid: shortid.generate(),
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
  uniqueid: shortid.generate(),
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
  uniqueid: shortid.generate(),
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
  uniqueid: shortid.generate(),
  recycle: true
};

export function sensorObject(createdSensor) {
  return {
    address: SENSORS_RAW + "/" + createdSensor + "/state",
    body: {
      flag: true
    },
    method: "PUT"
  };
}

export function groupObject(scene) {
  return {
    address: GROUPS_RAW + "/0/action",
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
    name = "Wake Up " + (init ? "init" : "end");
    sceneType = "LightScene";
  } else if (type === "sleep") {
    name = "Go to sleep " + (init ? "start" : "end");
    sceneType = "LightScene";
  } else if (type === "routines") {
  } else if (type === "timers") {
  }
  let obj = {
    name: name,
    type: sceneType,
    lights: lights,
    recycle: true,
    picture: ""
  };
  if (sceneType === "GroupScene") {
    obj["group"] = group;
  }

  return obj;
}

export function resourceObject(name, type) {
  let classid = null;
  if (type === "wake") classid = 1;
  else if (type === "sleep") classid = 2;
  else if (type === "routines") classid = 3;
  else classid = 4;
  let resource = {};
  resource.name = name;
  resource.description = name + " behavior";
  resource.recycle = false;
  resource.links = [];
  resource.classid = classid;

  return resource;
}

export function ruleObject(
  name,
  createdSensor,
  createdScene,
  groups,
  createdSchedule,
  init,
  timeOff,
  type
) {
  let fixedName = "";
  if (type === "wake") fixedName = name + "_Start";
  let dx = {
    address: "/sensors/" + createdSensor + "/state/flag",
    operator: "dx"
  };
  let actionSensor = {
    address: "/sensors/" + createdSensor + "/state",
    method: "PUT",
    body: {
      flag: false
    }
  };
  let actionTimeOff = {
    address: "/groups/" + groups + "/action",
    method: "PUT",
    body: {
      on: false
    }
  };
  let ddx = {
    address: "/sensors/" + createdSensor + "/state/flag",
    operator: "ddx",
    value: timeOff // fix this date format (PT time difference)
  };
  let wakeSchedule = {
    address: "/schedules/" + createdSchedule,
    method: "PUT",
    body: {
      status: "enabled"
    }
  };
  let obj = {
    name: fixedName,
    status: "enabled",
    recycle: true,
    conditions: [
      {
        address: "/sensors/" + createdSensor + "/state/flag",
        operator: "eq",
        value: "true"
      }
    ],
    actions: []
  };
  if (timeOff) {
    obj.actions.push(actionTimeOff);
  }
  if (type === "wake" && init) {
    obj.actions.push(wakeSchedule);
  }
  if (init && (type === "timers" || type === "routines")) {
    obj.conditions.push(dx);
  }
  if (!init) {
    obj.conditions.push(ddx);
  }
  if (!init || (type !== "sleep" && type !== "routines")) {
    obj.actions.push(actionSensor);
  }
  if (!(!init && type === "wake")) addScenes(obj, groups, createdScene);
  return obj;
}

export function createLightstates(fade, type, init) {
  let obj = {};
  let wakeEnd = {
    on: true,
    bri: 254,
    ct: 447,
    transitiontime: (parseInt(fade) - 1) * 600
  };
  let wakeInit = {
    on: true,
    bri: 1,
    ct: 447
  };
  let sleepInit = {
    bri: 144,
    ct: 447,
    transitiontime: 600
  };
  let sleepEnd = {
    on: false,
    bri: 1,
    ct: 447,
    transitiontime: (parseInt(fade) - 1) * 600
  };
  if (type === "wake") {
    if (init) obj = wakeInit;
    else obj = wakeEnd;
  } else if (type === "sleep") {
    if (init) obj = sleepInit;
    else obj = sleepEnd;
  } else if (type === "routines") {
  } else if (type === "timers") {
  }
  return obj;
}

function addScenes(obj, groups, createdScene) {
  if (typeof groups === "string" || typeof groups === "number") {
    obj.actions.push({
      address: "/groups/" + groups + "/action",
      method: "PUT",
      body: {
        scene: createdScene
      }
    });
  } else if (groups.length < 1) {
    obj.actions.push({
      address: "/groups/0/action",
      method: "PUT",
      body: {
        scene: createdScene
      }
    });
  } else
    groups.forEach(group => {
      let scene = {
        address: "/groups/" + group + "/action",
        method: "PUT",
        body: {
          scene: createdScene
        }
      };
      obj.actions.push(scene);
    });
}

export function roomObject(lights) {
  let obj = {
    name: "Group for wakeup",
    lights: lights,
    sensors: [],
    type: "LightGroup",
    recycle: true
  };
  return obj;
}
