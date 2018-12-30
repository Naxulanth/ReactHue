import axios from 'axios'
import { GROUPS } from 'constants/endpoints'

export function getRooms() {
    return axios.request({
        method: 'get',
        url: GROUPS,
    })
}