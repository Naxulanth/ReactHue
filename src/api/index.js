import axios from 'axios'

import { GROUPS } from 'constants/endpoints'

function getRooms() {
    return axios.request({
        method: 'get',
        url: GROUPS,
    })
}

export default {
    getRooms: getRooms
}