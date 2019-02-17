import axios from 'axios'
import { SCHEDULES, RESOURCES } from 'constants/endpoints'

export function getSchedules() {
    return axios.request({
        method: 'get',
        url: SCHEDULES,
    })
}

export function getSchedule(id) {
    return axios.request({
        method: 'get',
        url: SCHEDULES + '/' + id,
    })
}

export function deleteSchedule(id) {
    return axios.request({
        method: 'delete',
        url: SCHEDULES + '/' + id,
    })
}

export function setSchedule(id, body) {
    return axios.request({
        method: 'put',
        url: SCHEDULES + '/' + id,
        data: JSON.stringify(body)
    })
}

export function createSchedule(body) {
    return axios.request({
        method: 'post',
        url: SCHEDULES,
        data: JSON.stringify(body)
    })
}

export function getResources() {
    return axios.request({
        method: 'get',
        url: RESOURCES,
    })
}