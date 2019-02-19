import axios from 'axios'
import { SENSORS } from 'constants/endpoints'

export function getSensors() {
    return axios.request({
        method: 'get',
        url: SENSORS,
    })
}

export function createSensor(body) {
    return axios.request({
        method: 'post',
        url: SENSORS,
        data: JSON.stringify(body)
    }) 
}

export function modifySensor(id, body) {
    return axios.request({
        method: 'put',
        url: SENSORS + '/' + id,
        data: JSON.stringify(body)
    }) 
}