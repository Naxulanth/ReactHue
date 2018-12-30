import { LIGHTS_GET, LIGHTS_PUT } from '../constants/actionTypes';

const lights = (state = [], action) => {
    switch (action.type) {
        case LIGHTS_GET.REQUEST:
            return state;
        case LIGHTS_GET.SUCCESS:
            return {
                ...state,
                list: action.response.data
            }
        case LIGHTS_GET.FAILURE:
            return state;
        case LIGHTS_PUT.REQUEST:
            return state;
        case LIGHTS_PUT.SUCCESS:
            return state;
        case LIGHTS_PUT.FAILURE:
            return state;
        default:
            return state;
    }
}

export default lights;