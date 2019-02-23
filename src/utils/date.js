export function absolute(localtime, time) {
  let today = new Date();
  let offset = today.getTimezoneOffset() / 60;
  if (!localtime) {
    localtime = new Date(time.split("A")[0] + "Z");
    localtime.setUTCHours(localtime.getUTCHours() - offset);
  } else {
    console.log('h')
    localtime = new Date(time.split("A")[0] + "Z");
  }
  console.log(localtime)
  localtime.setDate(today.getDate());
  localtime.setMonth(today.getMonth());
  localtime.setFullYear(today.getFullYear());
  if (today > localtime) {
    localtime.setDate(today.getUTCDate() + 1);
  }
  console.log(localtime)
  localtime.setHours(localtime.getHours() - offset);
  console.log(localtime)
  localtime = localtime.toISOString().split(".")[0];
  console.log(localtime);
  return localtime;
}

export function recurring(time) {

}

export function randomized(time) {

}