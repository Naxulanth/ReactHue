import { ROOMS_GET } from '../constants/actionTypes';

const rooms = (state = [], action) => {
    switch (action.type) {
        case ROOMS_GET.REQUEST:
        case ROOMS_GET.SUCCESS:
        case ROOMS_GET.FAILURE:
        default:
            return state;
    }
}

export default rooms;