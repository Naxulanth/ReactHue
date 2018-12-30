
export function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function objectToArray(obj) {
    return Object.keys(obj).map(key => {
        return obj[key]
    })
}

export function filterLights(lights, room) {
    let result = [];
    room.lights.forEach(key => {
        lights[key].id = key;
        result.push(lights[key])
    })
    return result;
}
