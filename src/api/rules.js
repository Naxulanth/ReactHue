import axios from 'axios'
import { RULES } from 'constants/endpoints'

export function getRules() {
    return axios.request({
        method: 'get',
        url: RULES,
    })
}

export function createRule(body) {
    return axios.request({
        method: 'post',
        url: RULES,
        data: JSON.stringify(body)
    }) 
}

export function modifyRule(id, body) {
    return axios.request({
        method: 'put',
        url: RULES + '/' + id,
        data: JSON.stringify(body)
    }) 
}