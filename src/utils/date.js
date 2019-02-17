export function calibrate(localtime, time) {
    let today = new Date();
    let offset = today.getTimezoneOffset()/60;
    if (!localtime) {
            localtime = new Date(time);
            localtime.setUTCHours(localtime.getUTCHours() - offset);
            console.log(localtime)
        }
    else { localtime = new Date(localtime) }
    localtime.setDate(today.getDate());
    localtime.setMonth(today.getMonth());
    localtime.setFullYear(today.getFullYear());
    localtime.setHours(localtime.getHours() - offset)
    console.log(today)
    console.log(localtime)
    if (today > localtime) {
        localtime.setDate(today.getUTCDate() + 1);
    }
    localtime = localtime.toISOString().split('.')[0]
    console.log(localtime)
    return localtime;
}