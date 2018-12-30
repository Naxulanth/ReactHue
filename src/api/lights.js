import axios from 'axios'
import { LIGHTS } from 'constants/endpoints'

export function getLights() {
    return axios.request({
        method: 'get',
        url: LIGHTS,
    })
}