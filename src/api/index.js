import axios from 'axios'

import { GROUPS, LIGHTS } from 'constants/endpoints'

export function getRooms() {
    return axios.request({
        method: 'get',
        url: GROUPS,
    })
}

export function getLights() {
    return axios.request({
        method: 'get',
        url: LIGHTS,
    })
}