import axios from 'axios'
import { RULES } from 'constants/endpoints'

export function getRules() {
    return axios.request({
        method: 'get',
        url: RULES,
    })
}