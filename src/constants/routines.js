import shortid from "shortid";

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
