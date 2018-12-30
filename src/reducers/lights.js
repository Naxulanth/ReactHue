import { LIGHTS_GET } from '../constants/actionTypes';

const lights = (state = [], action) => {
    switch (action.type) {
        case LIGHTS_GET.REQUEST:
            return {
                ...state,
                id: '333'
            }
        case LIGHTS_GET.SUCCESS:
        case LIGHTS_GET.FAILURE:
        default:
            return state;
    }
}

export default lights;