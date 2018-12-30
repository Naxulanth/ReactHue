import { ROOMS_GET } from '../constants/actionTypes';

const rooms = (state = [], action) => {
    switch (action.type) {
        case ROOMS_GET.REQUEST:
        return state;
        case ROOMS_GET.SUCCESS:
        return {
            ...state,
            list: action.response.data
        }
        case ROOMS_GET.FAILURE:
        default:
            return state;
    }
}

export default rooms;