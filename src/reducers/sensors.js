import { SENSORS_GET } from '../constants/actionTypes'; 

const sensors = (state = [], action) => {
    switch (action.type) {
        case SENSORS_GET.REQUEST:
            return state;
        case SENSORS_GET.SUCCESS:
            return {
                ...state,
                list: action.response.data
            }
        case SENSORS_GET.FAILURE:
            return state;
        default:
            return state;
    }
}

export default sensors;