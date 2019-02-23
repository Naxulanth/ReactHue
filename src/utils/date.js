export function absolute(localtime, time) {
  let today = new Date();
  let offset = today.getTimezoneOffset() / 60;
  if (!localtime) {
    localtime = new Date(unrecur(unrandomize(time)) + "Z");
    localtime.setUTCHours(localtime.getUTCHours() - offset);
  } else {
    localtime = new Date(unrecur(unrandomize(localtime)) + "Z");
  }
  localtime.setDate(today.getDate());
  localtime.setMonth(today.getMonth());
  localtime.setFullYear(today.getFullYear());
  if (today > localtime) {
    localtime.setDate(today.getUTCDate() + 1);
  }
  localtime.setHours(localtime.getHours() - offset);
  localtime = localtime.toISOString().split(".")[0];
  return localtime;
}

export function recurring(time, days) {}

export function randomized(time, interval) {
  if (interval == 60) return time + "A01:00:00";
  else return time + "A00:" + interval + ":00";
}

function unrandomize(time) {
  if (time.includes("A")) return time.split("A")[0];
  else return time;
}

function unrecur(time) {
  if (time.includes("W")) {
  let today = new Date();
  let t = time.split("T")[1]
  let split = t.split(":");
  today.setHours(split[0]);
  today.setMinutes(split[1]);
  return today.toISOString().split(".")[0];
  }
  else return time;
}
