import { ROOMS_GET, ROOMS_PUT, ROOMS_PUT_ATTR } from '../constants/actionTypes';

const rooms = (state = [], action) => {
    switch (action.type) {
        case ROOMS_GET.REQUEST:
            return state;
        case ROOMS_GET.SUCCESS:
            return {
                ...state,
                list: action.response.data,
            }
        case ROOMS_GET.FAILURE:
            return state;
        case ROOMS_PUT.REQUEST:
            return state;
        case ROOMS_PUT.SUCCESS:
            return state;
        case ROOMS_PUT.FAILURE:
            return state;
        case ROOMS_PUT_ATTR.REQUEST:
            return state;
        case ROOMS_PUT_ATTR.SUCCESS:
            return state;
        case ROOMS_PUT_ATTR.FAILURE:
            return state;
        default:
            return state;
    }
}

export default rooms;