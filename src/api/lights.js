import axios from 'axios'
import { LIGHTS } from 'constants/endpoints'

export function getLights() {
    return axios.request({
        method: 'get',
        url: LIGHTS,
    })
}

export function modifyLight(id, body) {
    console.log(body)
    console.log(LIGHTS + '/' + id + '/state')
    return axios.request({
        method: 'put',
        url: LIGHTS + '/' + id + '/state',
        data: JSON.stringify(body)
    })
}