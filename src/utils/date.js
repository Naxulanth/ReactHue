export function calibrate(localtime, time) {
    let today = new Date();
    let offset = today.getTimezoneOffset()/60;
    if (!localtime) {
            localtime = new Date(time);
            localtime.setUTCHours(localtime.getUTCHours() - offset);
        }
    else { localtime = new Date(localtime) }
    localtime.setUTCDate(today.getUTCDate());
    localtime.setUTCMonth(today.getUTCMonth());
    localtime.setUTCFullYear(today.getUTCFullYear());
    localtime.setUTCHours(localtime.getUTCHours() - offset)
    if (today > localtime) {
        localtime.setDate(today.getUTCDate() + 1);
    }
    localtime = localtime.toISOString().split('.')[0]
    return localtime;
}