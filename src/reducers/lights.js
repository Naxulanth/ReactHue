import { LIGHTS_GET } from '../constants/actionTypes';

const lights = (state = [], action) => {
    switch (action.type) {
        case LIGHTS_GET.REQUEST:
        return state;
        case LIGHTS_GET.SUCCESS:
        return {
            ...state,
            lights: action.response
        }
        case LIGHTS_GET.FAILURE:
        default:
            return state;
    }
}

export default lights;