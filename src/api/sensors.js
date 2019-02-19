import axios from 'axios'
import { SENSORS } from 'constants/endpoints'

export function getSensors() {
    return axios.request({
        method: 'get',
        url: SENSORS,
    })
}