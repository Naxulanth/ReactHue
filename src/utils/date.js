export function absolute(localtime, time, raw) {
  console.log(localtime);
  let today = new Date();
  let offset = today.getTimezoneOffset() / 60;
  if (!raw) {
    if (!localtime) {
      localtime = new Date(unrecur(unrandomize(time)) + "Z");
    } else {
      localtime = new Date(unrecur(unrandomize(localtime)) + "Z");
    }
  } else {
    localtime = new Date(localtime);
    console.log(localtime)
    localtime.setUTCHours(localtime.getUTCHours() - offset);
  }
  localtime.setDate(today.getDate());
  localtime.setMonth(today.getMonth());
  localtime.setFullYear(today.getFullYear());
  if (today > localtime) {
    localtime.setDate(today.getUTCDate() + 1);
  }
  localtime = localtime.toISOString().split(".")[0];
  return localtime;
}

export function recur(time, days) {
  let acc = 0;
  let dayValues = {
    sun: 1,
    sat: 2,
    fri: 4,
    thu: 8,
    wed: 16,
    tue: 32,
    mon: 64
  };
  Object.keys(days).forEach(day => {
    if (days[day]) acc += dayValues[day];
  });
  acc = ("000" + acc).slice(-3);
  let prefix = "W" + acc + "/";
  return prefix + "T" + time.split("T")[1];
}
export function randomize(time, interval) {
  if (interval == 60) return time + "A01:00:00";
  else return time + "A00:" + interval + ":00";
}

function unrandomize(time) {
  if (time.includes("A")) return time.split("A")[0];
  else return time;
}

function unrecur(time) {
  let today = new Date();
  let offset = today.getTimezoneOffset() / 60;
  if (time.includes("W")) {
    let today = new Date();
    let t = time.split("T")[1];
    let split = t.split(":");
    today.setUTCHours(split[0]);
    today.setMinutes(split[1]);
    return today.toISOString().split(".")[0];
  } else return time;
}
