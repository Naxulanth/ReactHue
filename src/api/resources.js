import axios from 'axios'
import { RESOURCES } from 'constants/endpoints'

export function getResources() {
    return axios.request({
        method: 'get',
        url: RESOURCES,
    })
}