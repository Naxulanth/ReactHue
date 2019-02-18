function absolute(localtime, time) {
    let today = new Date();
    let offset = today.getTimezoneOffset()/60;
    if (!localtime) {
            localtime = new Date(time);
            localtime.setUTCHours(localtime.getUTCHours() - offset);
        }
    else { localtime = new Date(localtime) }
    localtime.setDate(today.getDate());
    localtime.setMonth(today.getMonth());
    localtime.setFullYear(today.getFullYear());
    if (today > localtime) {
        localtime.setDate(today.getUTCDate() + 1);
    }
    localtime.setHours(localtime.getHours() - offset)
    localtime = localtime.toISOString().split('.')[0]
    console.log(localtime)
    return localtime;
}

export function calibrate(localtime, time, type) {
    if (type !== 'timers') return absolute(localtime,time);
    else return localtime;
}