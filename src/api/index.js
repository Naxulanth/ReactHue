import axios from 'axios'

import { GROUPS } from 'constants/endpoints'

async function getRooms() {
    let res = null;
    await axios.get(GROUPS).then((e) => {
        res = e.data;
    }).catch((e) => {
        console.error(e)
    })
    return res;
}

export default {
    getRooms: getRooms
}