import axios from 'axios'
import { SCENES } from 'constants/endpoints'

export function getScenes() {
    return axios.request({
        method: 'get',
        url: SCENES,
    })
}

export function modifyScene(id, body) {
    return axios.request({
        method: 'put',
        url: SCENES + '/' + id,
        data: JSON.stringify(body)
    })
}

export function getScene(id) {
    return axios.request({
        method: 'put',
        url: SCENES + '/' + id,
    })
}